import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import done from '../assets/pngtree-green-check-mark-png-image_6525691.png'


export default function Patientslistd() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const [Patients, setPatients] = useState(null);

  const handlePatientClick = (patientID) => {
    navigate(`/patientd/${patientID}`);
  };

  useEffect(() => {
    const fetchPatients = async () => {
      try {

        const response =  await axios.get("/en/getpatients") // Ensure the correct URL
        console.log(response.data);
        setPatients(response.data);
      } catch (err) {
        console.log('Error fetching the patients list', err);
      }
    };

    fetchPatients();
  }, []);
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Patient Id</th>
            <th scope="col">Name</th>
            <th scope="col">DOB</th>
            <th scope="col">Gender</th>
            
          </tr>
        </thead>
        <tbody>
          {Patients && Patients.map((patient) => (
            <tr key={patient._id} onClick={() => handlePatientClick(patient._id)}>
              <th scope="row">{patient._id}
              
                {patient.doctorName && patient.medications && patient.suggestedTreatment && (
                  <img src={done} alt="Done" style={{ marginLeft: '10px', width: '20px', height: '20px' }} />
                )}
              
              </th>
              <td>{patient.name.toUpperCase()}</td>
              <td>{formatDate(patient.DOB)}</td>
              <td>{patient.gender.toUpperCase()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
