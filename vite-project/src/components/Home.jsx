import React from 'react';
import Navigationvar from './Navigationvar';
import home1 from '../assets/istockphoto-1399124556-612x612.jpg';
import home2 from '../assets/1200x600-Role-as-we-get-older.jpg';
import home3 from '../assets/360_F_500421924_xiKAppXahQViusMncRq1jb192I2kBRsW.jpg';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleDoctorsClick = async () => {
    navigate('/doctors');
  };

  const handleCaretakersClick = async () => {
    navigate('/caretaker');
  };

  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };
  const handlesignup=async()=>
  {
    navigate('/signup')
  }

  return (
    <div>
      <Navigationvar />

      <div className="container">
        <div className="row" style={{ height: '100vh' }}>
          <div className="col">
            <p style={{ fontSize: '35px', marginTop: '17%' }}>SAANJH SAHAYAK:</p>
            <p style={{ fontSize: '23px', marginTop: '9%' }}>
              At Sanjay Sahayak, we empower caregivers with actionable insights through our user-friendly platform and advanced technology like the LLM framework, ensuring proactive care for seniors and enhancing their quality of life.
            </p>
            <button style={{ fontSize: '20px', marginTop: '7%', backgroundColor: '#990011FF', color: 'white', marginBottom: '7%', borderRadius: '2%' }} onClick={handlesignup}>
              JOIN OUR SERVICES NOW
            </button>
          </div>
          <div className="col">
            <img src={home1} style={{ height: '90%', width: '90%' }} alt="home1" />
          </div>
        </div>
      </div>

      <div className="container1" style={{ backgroundColor: '#f5f4f2' }}>
        <div className="row">
          <div className="col">
            <p style={{ fontSize: '23px', marginLeft: '3%', marginTop: '7%' }}>
              Enriching Lives Through Compassionate At Sanjay Sahayak, we specialize in both in-home healthcare and long-term facility senior care. Our services are tailored to ensure comfort, safety, and independence for seniors. With a dedicated team, we prioritize personalized and compassionate support for our clients. Whether at home or in a facility, we strive to enhance quality of life and promote holistic wellness. Trust us to be your reliable partner in providing exceptional care for your loved ones.
            </p>
            <button style={{ fontSize: '20px', marginLeft: '15%', marginTop: '7%', backgroundColor: '#990011FF', color: 'white', marginBottom: '7%', borderRadius: '2%' }} onClick={handlesignup}>
              JOIN OUR SERVICES NOW
            </button>
          </div>
          <div className="col">
            <p style={{ fontSize: '23px', marginLeft: '15%', marginTop: '7%' }}>
              At Sanjay Sahayak, we recognize the challenges of manual health record tracking and risk identification. Our mission is to alleviate these burdens by providing efficient solutions and timely preventive measures, ensuring peace of mind for caregivers and optimal well-being for seniors.
            </p>
          </div>
        </div>
      </div>

      <div className="container2">
        <div className="row">
          <div className="col" style={{ marginLeft: '3%' }}>
            <img src={home2} style={{ height: '100%', width: '80%', borderRadius: '6%' }} alt="home2" />
          </div>
          <div className="col">
            <button style={{ fontSize: '20px', marginLeft: '30%', marginTop: '10%', backgroundColor: '#990011FF', color: 'white', marginBottom: '7%', borderRadius: '2%' }} onClick={handleCaretakersClick}>
              CARE TAKERS
            </button>
            <p style={{ fontSize: '23px', marginLeft: '7%' }}>
              For caregivers tasked with manual health record tracking, we provide a lifeline by offering intuitive solutions to identify risks and implement timely preventive measures, easing the burden and ensuring proactive care management.
            </p>
          </div>
        </div>
      </div>

      <div className="container3">
        <div className="row">
          <div className="col" style={{ marginLeft: '3%' }}>
            <button style={{ fontSize: '20px', marginLeft: '30%', marginTop: '15%', backgroundColor: '#990011FF', color: 'white', marginBottom: '7%', borderRadius: '2%' }} onClick={handleDoctorsClick}>
              DOCTORS
            </button>
            <p style={{ fontSize: '23px' }}>
              "At Sanjay Sahayak, our doctors specialize in personalized care for elderly residents, focusing on enhancing well-being and quality of life. Through proactive interventions and tailored medical attention, we aim to optimize health outcomes, promoting independence and dignity in our nurturing environment."
            </p>
          </div>
          <div className="col">
            <img src={home3} style={{ height: '80%', width: '80%', marginTop: '10%', marginLeft: '7%', borderRadius: '2%' }} alt="home3" />
          </div>
        </div>
      </div>

      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
};

export default Home;
