import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navigationvar from './Navigationvar';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';

export default function Doctoranalysis() {
  const [patient, setPatient] = useState(null);
  const [doctorNotes, setDoctorNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };


  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const response = await axios.get(`/en/getreportdetails?id=${id}`);
        setPatient(response.data);
        setDoctorNotes(response.data.doctorNotes || ''); // Assuming doctorNotes is part of the response
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    getReportDetails();
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // Update doctorNotes in the backend
      await axios.post(`/en/updateDoctorNotes/${id}`, { doctorNotes });
      setIsEditing(false);
      alert("Doctor notes updated successfully.")
      console.log('Doctor notes updated successfully.');
    } catch (error) {
      console.error('Error updating doctor notes:', error);
    }
  };

  const handleCancel = () => {
    // Reset doctorNotes to its original value
    setDoctorNotes(patient.doctorNotes || '');
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setDoctorNotes(e.target.value);
  };

  return (
    <div>
      <Navigationvar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {patient ? (
          <div style={{
            padding: '10px',
            marginTop: '6%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '70%',
            minHeight: '70vh',
          }}>
            <h3 style={{ textAlign: 'center' }}>REPORT DETAILS</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p><strong>ID:</strong> {patient._id}</p>
              <p><strong>Date of Report:</strong> {patient.dateOfReport ? new Date(patient.dateOfReport).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p><strong>Patient:</strong> {patient.patient}</p>
              <p><strong>Severity:</strong> {patient.severity}</p>
            </div>
            <p><strong>Summary:</strong> {patient.summary}</p>
            <p><strong>Specialist Required:</strong> {patient.specialistReq}</p>
            <p><strong>Precautions</strong></p> {patient.precautions.map((condition, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      <li>{condition}</li>
                    </span>
                  ))}
            <p><strong>Possible Diseases</strong></p> {patient.possibleDiseases.map((condition, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      <li>{condition}</li>
                    </span>
                  ))}


            <div style={{ marginBottom: '20px' }}>
              {isEditing ? (
                <textarea
                  value={doctorNotes}
                  onChange={handleChange}
                  style={{ width: '100%', minHeight: '100px', borderRadius: '5px', padding: '5px' }}
                />
              ) : (
                <p><strong>Doctor's Notes:</strong> {doctorNotes}</p>
              )}
            </div>

            {isEditing ? (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={handleSave}
                  style={{ padding: '10px 20px', backgroundColor: '#990011FF', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  style={{ padding: '10px 20px', backgroundColor: '#6C757D', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button
                  onClick={handleEdit}
                  style={{ padding: '10px 20px', backgroundColor: '#990011FF', color: 'white', border: 'none', borderRadius: '5px' }}
                >
                  Edit Doctor's Notes
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>Loading report details...</p>
        )}
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
}
