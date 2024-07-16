import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navigationvar from './Navigationvar';
import female from '../assets/pngtree-female-user-avatars-flat-style-women-profession-vector-png-image_1529171.jpg';
import male from '../assets/pngtree-user-vector-avatar-png-image_1541962.jpg';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';

export default function Patient() {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };
  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get(`/en/patientdetail?id=${id}`);
        setPatientDetails(res.data[0]);

        if (res.data[0].gender === "female") {
          setImg(female);
        } else if (res.data[0].gender === "male") {
          setImg(male);
        }
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  const handleFileClick = async (file) => {
    navigate(`/reportdoctor/${file}`)
  };

  

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8' }}>
      <Navigationvar />
      <div style={{ padding: '20px' }}>
        

        {patientDetails && (
          <div style={{ display: 'flex', backgroundColor: 'white', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ flex: 1, marginRight: '20px' }}>
              <h3>Patient Profile</h3>
              <img src={img} style={{ width: '100px', borderRadius: '50%', marginBottom: '20px' }} alt="Patient" />
              <p><strong>Contact Details:</strong></p>
              <p>{patientDetails.name}</p>
              <p>{patientDetails.gender}</p>
              <p>DOB: {formatDate(patientDetails.DOB)}</p>
              <p>Chronics: {patientDetails.chronics.join(', ')}</p>
            </div>
            <div style={{ flex: 2 }}>
              <h3>Latest Lab Results</h3>
              <div>
                {patientDetails.reportsList && patientDetails.reportsList.map((file, index) => (
                  <div key={index} className="file-item" style={{
                    backgroundColor: '#e9ecef',
                    color: '#495057',
                    padding: '8px',
                    borderRadius: '5px',
                    margin: '8px 0',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }} onClick={() => handleFileClick(file)}>
                    <i className="fas fa-file-alt" style={{ fontSize: '20px', color: '#e74c3c', marginRight: '10px' }} />
                    <p>File ID: {file}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
}
