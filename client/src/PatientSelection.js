import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from './PatientSelection.module.css'; // Assuming CSS is used

function PatientSelection({ patients, setSelectedPatient }) {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());

  const handlePatientClick = (patientId) => {
    setSelectedPatient(patientId);
    navigate('/dashboard'); // Navigate to the dashboard when a patient is selected
  };

  const selectedDate = date.toISOString().split('T')[0];
  const patientsForDate = patients.filter((patient) => {
    return patient.appointmentDate === selectedDate;
  });

  return (
    <div className={styles.patientSelection}>
      <h2>My Appointments</h2>
      <Calendar value={date} onChange={setDate} />
      <ul className={styles.patientList}>
        {patientsForDate.length > 0 ? (
          patientsForDate.map((patient) => (
            <li
              key={patient.id}
              onClick={() => handlePatientClick(patient.id)}
              className={styles.patientListItem}
            >
              {patient.name}
            </li>
          ))
        ) : (
          <li>No patients scheduled for this date.</li>
        )}
      </ul>
    </div>
  );
}

export default PatientSelection;
