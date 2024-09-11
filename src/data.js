export const patients = {
  arthritis: {
    name: "John Doe",
    age: 58,
    diagnosis: "Osteoarthritis",
    socialDeterminants: {
      housing: "Stable",
      transportation: "Has own vehicle",
      income: "Middle income",
      education: "High school",
    },
    priorConsultations: ["Joint Pain, Feb 2023", "Knee Swelling, March 2023"],
    priorNotes: [
      "Patient has reported joint pain worsening over the past 3 months.",
      "Previous treatment included ibuprofen and physical therapy."
    ], 
    radiology: {
      summary: "Moderate degeneration of the knee joint.",
      findings: "Osteophyte formation, joint space narrowing.",
      recommendations: "Continue with physiotherapy, consider surgical consultation if symptoms persist.",
    },
    allergies: ["None"],
    conditions: ["Hypertension", "Obesity"],
    medications: ["Losartan", "Ibuprofen"],
    riskFactors: {
      lengthOfStay: "3 days",
      drg: "470 - Major Joint Replacement",
      ccMcc: "CC: Hypertension",
      hospitalAcquiredConditions: [],
    },
  },
  asthma: {
    name: "Jane Smith",
    age: 32,
    diagnosis: "Chronic Asthma",
    socialDeterminants: {
      housing: "Living in a high-pollution area",
      transportation: "Public transport",
      income: "Low income",
      education: "College graduate",
    },
    priorConsultations: ["Asthma attack, March 2023", "Breathing difficulties, May 2023"],
    priorNotes: [
      "Patient's asthma has been managed with inhalers, with increasing difficulty during the pollen season.",
      "Last visit included prescription of a stronger antihistamine."
    ], 
    radiology: {
      summary: "Normal chest X-ray.",
      findings: "No acute infection. Mild bronchial thickening.",
      recommendations: "Continue inhaler use, consider pulmonary function test for long-term management.",
    },
    allergies: ["Pollen"],
    conditions: ["Allergic Rhinitis"],
    medications: ["Inhaler", "Antihistamines"],
    riskFactors: {
      lengthOfStay: "2 days",
      drg: "203 - Bronchitis & Asthma",
      ccMcc: "MCC: Asthma with Exacerbation",
      hospitalAcquiredConditions: ["At risk for Pneumonia"],
    },
  },
};

export const clinicalInsights = {
  arthritis: {
    missedDiagnoses: ["Potential Diabetes"],
    clinicalValidationFlags: ["Possible malnutrition due to weight loss"],
    cdiOpportunities: [
      {
        issue: "Hypertension not captured accurately in the documentation.",
        suggestion: "Consider adding more detail about the patient's current hypertensive condition for better specificity.",
      },
      {
        issue: "Osteoarthritis progression not tracked well.",
        suggestion: "Include further details on the progression of the condition based on radiology findings for a better DRG score.",
      },
    ],
  },
  asthma: {
    missedDiagnoses: ["Undiagnosed COPD"],
    clinicalValidationFlags: ["High risk of pneumonia due to prolonged asthma medication use"],
    cdiOpportunities: [
      {
        issue: "Asthma exacerbation severity is not clear.",
        suggestion: "Document the severity of asthma exacerbations more accurately for proper reimbursement and coding.",
      },
      {
        issue: "Potential risk of pneumonia unaddressed.",
        suggestion: "Given the high risk of pneumonia, add more documentation to validate preventive measures or treatments considered.",
      },
    ],
  },
};

export const referenceData = {
  diagnosis: "This diagnosis is based on the patient's history, physical examination, and radiology findings from February 2023.",
  radiologySummary: "Radiology report based on MRI imaging performed in March 2023 at XYZ Hospital.",
  medications: "Medication information is retrieved from the EHR system, last updated on April 2023.",
  consultations: "Consultations data is based on visits from February and March 2023.",
};
