require('dotenv').config();
const neo4j = require('neo4j-driver');
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const http = require('http');

// Set up Neo4j driver
const driver = neo4j.driver(
  '',
  neo4j.auth.basic('', '')
);

const app = express();

app.use(express.static(path.join(__dirname, '../client/build')));
const upload = multer({ dest: 'uploads/' });
app.use(express.json());

// Existing endpoints (e.g., /upload) remain unchanged
app.post('/upload', upload.single('clinicalNote'), async (req, res) => {
  try {
    const patientData = JSON.parse(req.body.patientData);
    const clinicalNote = fs.readFileSync(req.file.path, 'utf8');
    const fhirBundle = createFhirBundleUsingFhirJs(patientData, clinicalNote);

    const accessToken = await getAzureFHIRToken();

    const fhirResponse = await sendFhirToAzure(fhirBundle, accessToken);

    fs.unlinkSync(req.file.path);

    res.json({ message: 'FHIR data uploaded successfully!', fhirResponse });
  } catch (error) {
    console.error('Error uploading FHIR data:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error uploading FHIR data' });
  }
});

// Create FHIR Bundle using patient data
function createFhirBundleUsingFhirJs(patientData, clinicalNote) {
  return {
    resourceType: 'Bundle',
    type: 'transaction',
    entry: [
      {
        fullUrl: "urn:uuid:" + generateUUID(),
        resource: {
          resourceType: 'Patient',
          name: [{ use: 'official', family: patientData.name }],
          gender: patientData.gender,
          birthDate: patientData.birthDate,
        },
        request: {
          method: 'POST',
          url: 'Patient',
        },
      },
      {
        fullUrl: "urn:uuid:" + generateUUID(),
        resource: {
          resourceType: 'Observation',
          status: 'final',
          category: [
            {
              coding: [
                {
                  system: 'http://terminology.hl7.org/CodeSystem/observation-category',
                  code: 'clinical',
                },
              ],
            },
          ],
          code: {
            coding: [
              {
                system: 'http://loinc.org',
                code: '8716-3',
                display: 'Summary of clinical note',
              },
            ],
          },
          subject: { reference: 'Patient/1' },
          effectiveDateTime: new Date().toISOString(),
          valueString: clinicalNote,
        },
        request: {
          method: 'POST',
          url: 'Observation',
        },
      },
    ],
  };
}

// Fetch Azure FHIR Token
async function getAzureFHIRToken() {
  try {
    const response = await axios.post(
      `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}/oauth2/v2.0/token`,
      new URLSearchParams({
        client_id: process.env.AZURE_CLIENT_ID,
        client_secret: process.env.AZURE_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: `${process.env.FHIR_SERVICE_URL}/.default`,
      }),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );

    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching Azure FHIR token:', error.response ? error.response.data : error.message);
    throw new Error('Unable to fetch FHIR token from Azure');
  }
}

// Send FHIR Bundle to Azure
async function sendFhirToAzure(fhirBundle, accessToken) {
  try {
    const response = await axios.post(`${process.env.FHIR_SERVICE_URL}`, fhirBundle, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/fhir+json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error sending FHIR bundle to Azure:', error.response ? error.response.data : error.message);
    throw new Error('Failed to send FHIR bundle to Azure');
  }
}

// Generate UUID for resources
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Create a new HTTP endpoint for getting patient data
app.post('/getPatientData', async (req, res) => {
  const { name } = req.body;

  try {
    const patientData = await getPatientDataFromNeo4j(name);

    if (!patientData) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const mockedData = getMockedData(name);
    const fullData = { ...patientData, ...mockedData };

    res.json({ data: fullData });
  } catch (error) {
    console.error('Error fetching patient data:', error);
    res.status(500).json({ error: 'Error fetching patient data' });
  }
});

// Functions to interact with Neo4j and get data
async function getPatientDataFromNeo4j(patientName) {
  const session = driver.session();
  try {
    const query = `
      MATCH (p:Patient {name: $name})-[:HAS_ENCOUNTER]->(e:Encounter)
      RETURN p.name AS name, p.age AS age, p.conditions AS conditions, 
             e.diagnosis AS diagnosis, e.radiologyFindings AS radiologyFindings, 
             e.recommendations AS recommendations, e.priorConsultations AS priorConsultations,
             e.secondaryDiagnosisCategory AS secondaryDiagnosisCategory, e.lengthOfStay AS lengthOfStay, 
             e.drg AS drg, e.ccMcc AS ccMcc
    `;
    const result = await session.run(query, { name: patientName });
    if (result.records.length > 0) {
      const record = result.records[0];

      return {
        name: record.get('name'),
        age: record.get('age'),
        diagnosis: record.get('diagnosis'),
        conditions: record.get('conditions'),
        radiology: {
          summary: record.get('radiologyFindings'),
          recommendations: record.get('recommendations'),
        },
        priorConsultations: record.get('priorConsultations'),
        riskFactors: {
          lengthOfStay: record.get('lengthOfStay'),
          drg: record.get('drg'),
          ccMcc: record.get('ccMcc'),
        },
      };
    } else {
      return null;
    }
  } finally {
    await session.close();
  }
}

// Mocked Data function for test patients
function getMockedData(patientName) {
  if (patientName === "John Doe") {
    return {
      socialDeterminants: {
        housing: "Stable",
        transportation: "Has own vehicle",
        income: "Middle income",
        education: "High school"
      },
      priorNotes: [
        "Patient has reported joint pain worsening over the past 3 months.",
        "Previous treatment included ibuprofen and physical therapy."
      ],
      allergies: ["None"],
      medications: ["Losartan", "Ibuprofen"],
      clinicalInsights: {
        missedDiagnoses: ["Potential Diabetes"],
        clinicalValidationFlags: ["Possible malnutrition due to weight loss"],
        cdiOpportunities: [
          {
            issue: "Hypertension not captured accurately in the documentation.",
            suggestion: "Consider adding more detail about the patient's current hypertensive condition for better specificity."
          },
          {
            issue: "Osteoarthritis progression not tracked well.",
            suggestion: "Include further details on the progression of the condition based on radiology findings for a better DRG score."
          }
        ]
      }
    };
  } else if (patientName === "Jane Smith") {
    return {
      socialDeterminants: {
        housing: "Living in a high-pollution area",
        transportation: "Public transport",
        income: "Low income",
        education: "College graduate"
      },
      priorNotes: [
        "Patient's asthma has been managed with inhalers, with increasing difficulty during the pollen season.",
        "Last visit included prescription of a stronger antihistamine."
      ],
      allergies: ["Pollen"],
      medications: ["Inhaler", "Antihistamines"],
      clinicalInsights: {
        missedDiagnoses: ["Undiagnosed COPD"],
        clinicalValidationFlags: ["High risk of pneumonia due to prolonged asthma medication use"],
        cdiOpportunities: [
          {
            issue: "Asthma exacerbation severity is not clear.",
            suggestion: "Document the severity of asthma exacerbations more accurately for proper reimbursement and coding."
          },
          {
            issue: "Potential risk of pneumonia unaddressed.",
            suggestion: "Given the high risk of pneumonia, add more documentation to validate preventive measures or treatments considered."
          }
        ]
      }
    };
  } else {
    return {};
  }
}

// Convert Neo4j integers
function convertNeo4jInt(neo4jInt) {
  if (typeof neo4jInt === 'object' && neo4jInt !== null && 'low' in neo4jInt) {
    return neo4jInt.low;
  }
  return neo4jInt;
}

// Start the HTTP server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
