import React, { useEffect,useState } from 'react'
import female from '../assets/pngtree-female-user-avatars-flat-style-women-profession-vector-png-image_1529171.jpg';
import male from '../assets/pngtree-user-vector-avatar-png-image_1541962.jpg';



export default function Patientcard({patientDetails}) {
  const [img,setImg]=useState("");
  useEffect(() => {
    if (patientDetails.gender === 'female') {
        setImg(female);
    } else {
        setImg(male);
    }
}, [patientDetails.gender]);

  
  return (
    <div>
        <div col='container'>
        <div class='row'>
        <button class="col-sm" style={{fontSize: '25px',backgroundColor:'#990011FF',color:'white',marginTop:'1%',marginLeft:'10%',marginRight:'10%'}}>
        {patientDetails ? patientDetails.patientName : "Loading..."}
    </button>
        </div>
        </div>
      <div class='container1'>
        <div class='row'>
            <div class='col' style={{marginLeft:'10%',marginTop:'3%'}}>
                <h5>PATIENT NAME : {patientDetails.patientName} </h5>
                <br/>
                
                <h5>AGE : {patientDetails.age}</h5>
                <br/>
                
                <h5>GENDER : {patientDetails.gender}</h5>
                <br/>
               
                <h5>BLOOD GROUP : {patientDetails.bloodGroup}</h5>
            </div>
            <div class='col' style={{marginRight:'10%',marginTop:'4%'}}>
                <img src={img} />
            </div>
        </div>
      </div>


      <div class='container2'>
        <div class='row'>
            <div class='col' style={{marginLeft:'10%',marginRight:'10%',marginTop:'3%'}}>
                <h5>MEDICAL HISTORY</h5>
                <br/>
                
                <p style={{fontSize:'20px'}}>{patientDetails.medicalHistory} </p>
            </div>
        </div>
      </div>


     
    </div>
  )
}
