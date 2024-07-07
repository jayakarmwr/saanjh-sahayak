import React,{useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'

export default function Suggestion({patientDetails}) {
  const {id}=useParams();
  const [doctorName, setDoctorName] = useState('');
  const [suggestedTreatment, setSuggestedTreatment] = useState('');
  const [medications, setMedications] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      doctorName,
      suggestedTreatment,
      medications
    };


    
    try {
      console.log(formData)

      const response = await axios.post(`/en/precription?id=${id}`,formData);
      alert("done")
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
  return (
    <div>
      <div col='container'>
        <div class='row'>
        <button class="col-sm" style={{fontSize: '25px',backgroundColor:'#990011FF',color:'white',marginTop:'1%',marginLeft:'10%',marginRight:'10%'}}>
      PRESCRIPTION
    </button>
        </div>
        </div>

        <div class='container2'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
                <h5>PATIENT NAME : {patientDetails.patientName.toUpperCase()}</h5>
                <br />
                <br/>
                <h5>DOCTOR NAME : </h5>
                <input type='text' placeholder='doctor name' style={{width:'50%',borderRadius:'5%'}}  value={doctorName} onChange={(e) => setDoctorName(e.target.value)}/>
            </div>
        </div>

        <div class='container3'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
                <h5>SUGGESTED TREATMENT</h5>
                
                <textarea rows='5' placeholder='type here...........' value={suggestedTreatment}  onChange={(e) => setSuggestedTreatment(e.target.value)}/>
            </div>
        </div>

        <div class='container4'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
                <h5>MEDICATIONS TO BE TAKEN</h5>
                
                <textarea rows='5' placeholder='type here...........' value={medications}  onChange={(e) => setMedications(e.target.value)}/>
                <input type='file' accept='image/*' />
                
            </div>
        </div>

        <div class='container3'>
            <div class='row' style={{marginLeft:'10%',marginRight:'10%',marginTop:'2%'}}>
               <button type='submit' style={{backgroundColor:'#990011FF',color:'white',width:'10%'}} onClick={handleSubmit}>SUBMIT</button>
            </div>
        </div>
    </div>
  )
}
