import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams ,useNavigate} from 'react-router-dom';
import Navigationvar from './Navigationvar';
import female from '../assets/pngtree-female-user-avatars-flat-style-women-profession-vector-png-image_1529171.jpg';
import male from '../assets/pngtree-user-vector-avatar-png-image_1541962.jpg';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';

export default function ViewPatient() {
    const { id } = useParams();
    const [file, setFile] = useState("");
    const [patientDetails, setPatientDetails] = useState(null);
    const [fileName,setFileName]=useState("");
    const [size,setSize]=useState(0);
    const [img,setImg]=useState("");
    const navigate=useNavigate();
    
    const handleChatbotClick = async () => {
         navigate('/chatbot');
    };

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const res = await axios.get(`/en/patientdetail?id=${id}`);
                setPatientDetails(res.data[0]); // Assuming res.data is an array, take the first element
                console.log("done", res.data);
                if (res.data[0].gender.toLowerCase() === "female") {
                    setImg(female);
                } else if (res.data[0].gender.toLowerCase() === "male") {
                    setImg(male);
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        };

        fetchPatientDetails();
    }, [id]);
     



    const handleFileChange=(event) =>{
        const selectedFile = event.target.files[0];

        setSize(selectedFile.size / (1024 * 1024));

        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFile(reader.result.split(',')[1]);
            };
            reader.readAsDataURL(selectedFile);
            const filename = event.target.value.replace("C:\\fakepath\\", "");
            setFileName(filename);
        } else {
            alert('No file selected');
        }
    }


    const submitImage = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/en/uploadpdf?id=${id}`, { file: file, filename: fileName });
            alert("Successfully uploaded.")
            console.log("Successfully uploaded.");
        } catch (error) {
            console.log("Error uploading details:", error);
            alert('File size too large');
        }
    };

    return (
        <div>
            <Navigationvar />
            <div className="container">
                <div className="row">
                    <button className="col-sm" style={{ fontSize: '25px', backgroundColor: '#990011FF', color: 'white', marginTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
                        {patientDetails ? patientDetails.patientName.toUpperCase() : "Loading..."}
                    </button>
                </div>
            </div>

            {patientDetails && (
                <div className="container2">
                    <div className="row">
                        <div className="col" style={{ marginLeft: '20%', marginTop: '2%' }}>
                            <h5>PATIENT NAME: {patientDetails.patientName}</h5>
                            <br />
                            <h5>DOCTOR NAME: {patientDetails.doctorName}</h5>
                            <br />
                            <h5>AGE: {patientDetails.age}</h5>
                            <br />
                            <h5>GENDER: {patientDetails.gender}</h5>
                            <br />
                            <h5>BLOOD GROUP: {patientDetails.bloodGroup}</h5>
                            <br />
                        </div>
                        <div className="col" style={{ marginTop: '4%' }}>
                            <img src={img} style={{ maxWidth: '100%', maxHeight: '100%' }} alt="Patient" />
                        </div>
                    </div>
                </div>
            )}

            <div className="container6">
                <div className="row">
                    <div className="col" style={{ marginTop: '2%', marginLeft: '20%', marginRight: '10%' }}>
                        <h5>MODEL PREDICTION</h5>
                        <p style={{fontSize: '15px' }}>
                            {patientDetails ? patientDetails.prediction : "Loading..."}
                        </p>
                        
                    </div>
                </div>
            </div>

            <div className="container3">
                <div className="row">
                    <div className="col" style={{ marginTop: '2%', marginLeft: '20%', marginRight: '10%' }}>
                        <h5>RECOMMENDED TREATMENT</h5>
                        <p style={{ fontSize: '20px' }}>
                            {patientDetails ? patientDetails.suggestedTreatment : "Loading..."}
                        </p>
                        <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }}>ENDORSE THE TREATMENT</button>
                    </div>
                </div>
            </div>

            <div className="container4">
                <div className="row">
                    <div className="col" style={{ marginTop: '5%', marginLeft: '20%', marginRight: '10%' }}>
                        <h5>PRESCRIPTION</h5>
                        <p style={{ fontSize: '20px' }}>
                            {patientDetails ? patientDetails.medications: "Loading..."}
                        </p>
                        <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }}>DOWNLOAD PRESCRIPTION</button>
                    </div>
                </div>
            </div>

            <div className="container5">
                <div className="row">
                    <div className="col" style={{ marginTop: '5%', marginLeft: '20%', marginRight: '10%' }}>
                        <h5>UPLOAD NEW REPORT</h5>
                        <input type="file" accept="application/pdf" onChange={handleFileChange} />
                        <button type="submit" style={{ backgroundColor: '#990011FF', color: 'white' }} onClick={submitImage}>SUBMIT</button>
                    </div>
                </div>
            </div>
            <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
        </div>
    );
}
