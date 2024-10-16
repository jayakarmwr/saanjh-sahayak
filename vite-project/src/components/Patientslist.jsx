import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Patientslist() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const navigate = useNavigate();
  const [Patients, setPatients] = useState([]);

  const handlePatientClick = (patientID) => {
    navigate(`/viewpatient/${patientID}`);
  };
  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

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

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Patient Id</th>
            <th scope="col">Name</th>
            <th scope="col">Blood Group</th>
            <th scope="col">Gender</th>
            
          </tr>
        </thead>
        <tbody>
          {Patients.map((patient) => (
            <tr key={patient._id} onClick={() => handlePatientClick(patient._id)}>
              <th scope="row">{patient._id}</th>
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
