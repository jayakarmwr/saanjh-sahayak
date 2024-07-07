import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import Navigationvar from './Navigationvar';
import Pnav from './Pnav';
import Patientcard from './Patientcard';
import Suggestion from './Suggestion';
import Dietplanexec from './Dietplanexec';
import Showpdf from './Showpdf';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import Predictions from './Predictions';

const Patient = () => {
  const [display, setDisplay] = useState(0);
  const { id } = useParams();
  const navigate=useNavigate()
  const [patientDetails, setPatientDetails] = useState({});
  const handleChatbotClick = async () => {
      navigate('/chatbot');
  };

  const handleoptionclick = (input) => {
    setDisplay(input);
  };

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const res = await axios.get(`/en/patientdetail?id=${id}`);
        setPatientDetails(res.data[0]); // Assuming res.data is an array, take the first element
        console.log("done", res.data);
      } catch (error) {
        console.error("Error occurred:", error);
      }
    };

    fetchPatientDetails();
  }, [id]);

  return (
    <div>
      <Navigationvar />
      <Pnav handleoptionclick={handleoptionclick} />
      <div className='container'>
        {display === 0 && <Patientcard patientDetails={patientDetails}/>}
        {display === 1 && <Showpdf  patientId={patientDetails._id}/>}
        {display === 2 && <Predictions  prediction={patientDetails.prediction} />}
        {display === 3 && <Suggestion  patientDetails={patientDetails}/>}
        {display === 4 && <Dietplanexec />}
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};

export default Patient;
