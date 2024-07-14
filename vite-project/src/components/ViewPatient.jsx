import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navigationvar from './Navigationvar';
import female from '../assets/pngtree-female-user-avatars-flat-style-women-profession-vector-png-image_1529171.jpg';
import male from '../assets/pngtree-user-vector-avatar-png-image_1541962.jpg';

export default function ViewPatient() {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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

  function formatDate(dateString) {
    const date = new Date(dateString.replace('T', ' ').replace(/\..+/, ''));
    return date.toLocaleDateString();
  }

  function timeElapsed(dateString) {
    const currentDate = new Date();
    const uploadedDate = new Date(dateString.replace('T', ' ').replace(/\..+/, ''));
    const timeDiff = currentDate - uploadedDate;
    const days = Math.floor(timeDiff / (1000 * 3600 * 24));
    const months = Math.floor(days / 30);

    if (months > 0) {
      return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return 'Uploaded today';
    }
  }

  const handleFile = async (event) => {
    
    const selectedFile = event.target.files[0];


    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result.split(',')[1]; // Get base64-encoded file data
        const filename = event.target.value.replace("C:\\fakepath\\", "");

        try {
          console.log("hi");
          const reponse = await axios.post('/en/uploadpdf', { file: fileData, filename: filename, patientId: id, name: patientDetails.name });
          console.log("submitted sucessfully")

        } catch (error) {
          console.log("Error uploading details:", error);
          
          alert('File size too large or other issues.');
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.log("No input file");
    }
  };

 
 

  return (
    <div>
      <Navigationvar />
      <div className="container">
        <div className="row">
          <button className="col-sm" style={{ fontSize: '25px', backgroundColor: '#990011FF', color: 'white', marginTop: '1%', marginLeft: '10%', marginRight: '10%' }}>
            {patientDetails ? patientDetails.name : "Loading..."}
          </button>
        </div>
      </div>

      {patientDetails && (
        <div className="container2">
          <div className="row">
            <div className="col" style={{ marginLeft: '20%', marginTop: '2%' }}>
              <h5>PATIENT NAME: {patientDetails.name}</h5>
              <br />
              
              <h5>GENDER: {patientDetails.gender}</h5>
              <br />
              <h5>BLOOD GROUP: {patientDetails.bloodGroup}</h5>
              <br />
            </div>
            <div className="col" style={{ marginTop: '4%' }}>
              <img src={img} style={{ width: '40%', height: '70%' }} alt="Patient" />
            </div>
          </div>
        </div>
      )}

      <div className='container7' style={{ marginTop: '5%', marginLeft: '20%', marginRight: '10%' }}>
        <h5>PREVIOUS REPORTS</h5>
        {patientDetails && patientDetails.fileId && patientDetails.fileId.map((file, index) => (
          <div key={index} className="file-item" style={{
            backgroundColor: '#990011FF',
            color: 'white',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            margin: '20px',
            width: '30%',
            cursor: 'pointer'
          }}>
            <i className="fas fa-file-pdf" style={{ fontSize: '24px', color: '#e74c3c' }} />
            <p>Date: {formatDate(file.date)} ({timeElapsed(file.date)})</p>
          </div>
        ))}
      </div>

      <div className="container5">
        <div className="row">
          <div className="col" style={{ marginTop: '5%', marginLeft: '20%', marginRight: '10%' }}>
            <h5>UPLOAD NEW REPORT</h5>
            <label
              htmlFor="file-upload"
              className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer`}
            >
              Upload Reports
            </label>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFile}
            />
            
            {loading && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <div style={{
                  backgroundColor: '#fff',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
                }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#333' }}>uploading...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
