import React from 'react'
import Navigationvar from './Navigationvar'
import Patientslist from './Patientslist'
import { useNavigate } from 'react-router-dom'
import caretaker1 from '../assets/nurses-taking-care-elderly-nursing-home_602838-22.avif'
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
export default function Caretaker() {
  const navigate=useNavigate();
    
    const handlenewpatient=async()=>
        {
            navigate("/newpatient")
        }

        const handleChatbotClick = async () => {
          navigate('/chatbot');
        };
  return (
    <div>
        <Navigationvar/>
        <div class='container1'style={{height:'80vh'}}>
          <div class='row'>
            <div class='col' style={{marginLeft:'3%'}}>
               <p style={{fontSize:'30px',marginTop:'20%'}}>“It’s not that some people have willpower and some don’t. It’s that some people are ready to change and some are not.” - Carl Sandburg</p>
               <button style={{ fontSize: '20px' , marginTop:'7%',backgroundColor:'#990011FF',color:'white',marginBottom:'7%',borderRadius:'2%'}} onClick={handlenewpatient}>
          ADD NEW PATIENT +
        </button>
            </div>
            <div class='col'>
              <img src={caretaker1} style={{marginTop:'10%',borderRadius:'6%'}}/>
            </div>
          </div>
        </div>
      

      <div class='container2'/>
      <div class="row">
    <button class="col-sm" style={{fontSize: '20px',backgroundColor:'#990011FF',color:'white'}}>
      UPDATES
    </button>
    <div class='list'>
        <Patientslist/>

    </div>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  )
}
