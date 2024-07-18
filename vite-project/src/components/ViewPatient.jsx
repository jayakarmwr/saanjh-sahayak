import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navigationvar from './Navigationvar';
import female from '../assets/pngtree-female-user-avatars-flat-style-women-profession-vector-png-image_1529171.jpg';
import male from '../assets/pngtree-user-vector-avatar-png-image_1541962.jpg';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';
import '../components/spin.css'
import verifyimg from '../assets/pngtree-verified-stamp-vector-png-image_7105265.png'

export default function ViewPatient() {
  const { id } = useParams();
  const [file, setFile] = useState("");
  const [patientDetails, setPatientDetails] = useState(null);
  const [fileName, setFileName] = useState("");
  const [size, setSize] = useState(0);
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reportsDate, setReportsDate] = useState(null);
  
  
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };
  async function getDates() {
    console.log("hi")
    const response = await axios.get(`/en/getdates/${id}`);
    setReportsDate(response.data)
  }
  

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
    const  getDates=async() =>{
      console.log("hi")
      const response = await axios.get(`/en/getdates/${id}`);
      
      setReportsDate(response.data)
    }
    

    fetchPatientDetails();
    getDates();
  }, [id]);

  const handleFileClick = async (file) => {
    navigate(`/report/${file}`)
  };

  const handleFile = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const fileData = reader.result.split(',')[1]; // Get base64-encoded file data
        const filename = event.target.value.replace("C:\\fakepath\\", "");

        try {
          setLoading(true);
          console.log("hi");
          const response = await axios.post('/en/uploadpdf', { file: fileData, filename: filename, patientId: id, name: patientDetails.name });
         
          console.log("submitted successfully");
        } catch (error) {
          console.log("Error uploading details:", error);
          alert('File size too large or other issues.');
        }
        finally {
          setLoading(false);
        }
      };
      reader.readAsDataURL(selectedFile);
    } else {
      console.log("No input file");
    }
  };

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  }

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f6f8' }}>
      <Navigationvar />
      <div style={{ padding: '20px' ,height:'100%'}}>
        

        {patientDetails && reportsDate &&(
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
              <h3>Previous test reports: {patientDetails.reportsList.length}</h3>
              <div>
              {reportsDate.map((report, index) => (
              <div onClick={() => { handleFileClick(report.file) }} key={index} className="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2 justify-between cursor-pointer hover:bg-slate-100 hover:scale-105 transition transform duration-300">
                <div className="flex items-center gap-4">
                  <div className="text-[#0d151c] flex items-center justify-center rounded-lg bg-[#e7eef4] shrink-0 size-12" data-icon="File" data-size="24px" data-weight="regular">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                      <path
                        d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-[#0d151c] text-base font-medium leading-normal line-clamp-1">{report.date}</p>
                    <p className="text-[#49779c] text-sm font-normal leading-normal line-clamp-2">{report.specialistReq}</p>
                  </div>
                </div>
                {report.isVerified && (
                      <img src={verifyimg} alt="Verified" style={{ width: '40px', height: '20px' }} />
                    )}
               
              </div>
            ))}
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <h3>Upload New Report</h3>
          <label
            htmlFor="file-upload"
            className={`bg-blue-500 text-white px-4 py-2 rounded cursor-pointer`}
            style={{ backgroundColor: '#990011FF', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer' }}
          >
            Upload Reports
          </label>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            style={{ display: 'none' }}
            onChange={handleFile}
          />
          {loading && (
          <div style={styles.loadingOverlay}>
            <div style={styles.spinner}></div>
          </div>
        )}

         
        </div>
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
      

    </div>
    
  );
}

const styles = {
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '5px solid #3498db',
    animation: 'spin 1s linear infinite',
  },
};
