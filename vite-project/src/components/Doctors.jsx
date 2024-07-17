import React from 'react'
import Navigationvar from './Navigationvar'
import Patientslistd from './Patientlistd'

import doctor1 from '../assets/smiling-indian-caring-doctor-supporting-holding-hand-olde-senior-female-patient-lying-bed-clinic-hospital-elderly-people-health-care-concept_938508-6362.avif'
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import { useNavigate } from 'react-router-dom';

export default function Doctors() {
  const navigate=useNavigate();
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };
  return (
    <div>
        <Navigationvar/>
        <div class='container1'style={{backgroundColor:'#f5f4f2',height:'70vh'}}>
          <div class='row'>
            <div class='col' style={{marginLeft:'3%'}}>
               <p style={{fontSize:'35px',marginTop:'20%'}}>"The art of medicine consists of amusing the patient while nature cures the disease." - Voltaire</p>
               <p style={{fontsize:'35px',marginTop:'4%'}}>
               In our application, our dedicated team of doctors serves as the cornerstone of compassionate
                care for our elderly community. With expertise and empathy, they provide personalized attention, 
                focusing on enhancing well-being and quality of life. Their proactive approach ensures timely interventions,
                 fostering an environment of trust and support for our residents.
               </p>
            </div>
            <div class='col'>
              <img src={doctor1} style={{marginTop:'10%',borderRadius:'6%'}}/>
            </div>
          </div>
        </div>


        <div class="container2">
  <div class="row">
    <button class="col-sm" style={{fontSize: '20px',backgroundColor:'#990011FF',color:'white'}}>
      PATIENTS LIST
    </button>
    <div class='list'>
        <Patientslistd/>

    </div>
   
    
  </div>
</div>
<div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
      
    </div>
  )
}
