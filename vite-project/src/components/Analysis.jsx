import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf'; // Import jspdf library
import 'jspdf-autotable'; // Import autotable plugin
import Navigationvar from './Navigationvar';
import bot from '../assets/chat-bot-logo-design-concept-600nw-1938811039.webp';


export default function Analysis() {
  const [patient, setPatient] = useState(null);
  
  const { id } = useParams();
  

  useEffect(() => {
    const getReportDetails = async () => {
      try {
        const response = await axios.get(`/en/getreportdetails?id=${id}`);
        setPatient(response.data);
      } catch (error) {
        console.error('Error fetching report details:', error);
      }
    };

    getReportDetails();
  }, [id]);
  const handleChatbotClick = async () => {
    navigate('/chatbot');
  };


  const generatePDF = () => {
    if (!patient) {
      console.error('Patient data is not loaded yet.');
      return;
    }

    const doc = new jsPDF();

    // Add report details to the PDF
    doc.setFontSize(16);
    doc.text('Report Details', 10, 20);

    doc.setFontSize(12);
    doc.text(`ID: ${patient._id}`, 10, 35);
    doc.text(`Date of Report: ${patient.dateOfReport ? new Date(patient.dateOfReport).toLocaleDateString() : 'N/A'}`, 10, 45);
    doc.text(`Patient: ${patient.patient}`, 10, 55);

    // Split summary text into lines that fit within the page width
    const summaryLines = doc.splitTextToSize(patient.summary || '', doc.internal.pageSize.width - 20);
    doc.text('Summary:', 10, 65);
    summaryLines.forEach((line, index) => {
      if (index < 5) { // Limit to show only 5 lines of summary
        doc.text(line, 15, 75 + index * 10); // Adjust Y position based on index and line height
      }
    });

    doc.text(`Severity: ${patient.severity}`, 10, 135);
    doc.text(`Specialist Required: ${patient.specialistReq}`, 10, 145);

    // Save the PDF
    doc.save(`Report-${patient._id}.pdf`);
  };

  return (
    <div>
      <Navigationvar/>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {patient ? (
          <div style={{ 
            padding: '10px',
            marginTop: '6%',
            border: '1px solid #ccc',
            borderRadius: '5px',
            width: '70%',
            minHeight: '70vh',
          }}>
            <h2 style={{ textAlign: 'center' }}>REPORT DETAILS</h2>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p><strong>ID:</strong> {patient._id}</p>
              <p><strong>Date of Report:</strong> {patient.dateOfReport ? new Date(patient.dateOfReport).toLocaleDateString() : 'N/A'}</p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p><strong>Patient:</strong> {patient.patient}</p>
              <p><strong>Severity:</strong> {patient.severity}</p>
            </div>
            <p><strong>Summary:</strong> {patient.summary}</p>
            <p><strong>Specialist Required:</strong> {patient.specialistReq}</p>
            <p><strong>Precautions</strong></p> {patient.precautions.map((condition, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      <li>{condition}</li>
                    </span>
                  ))}
            <p><strong>Possible Diseases</strong></p> {patient.possibleDiseases.map((condition, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      <li>{condition}</li>
                    </span>
                  ))}
            <p><strong>Doctor's Note:</strong> {patient.doctorNotes}</p>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={generatePDF} style={{ padding: '10px 20px', backgroundColor: '#990011FF', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
                Download PDF
              </button>
              <button style={{ padding: '10px 20px', backgroundColor: '#990011FF', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}  >
                View Report
              </button>
            </div>
          </div>
        ) : (
          <p>Loading report details...</p>
        )}
      </div>
      <div style={{ position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }} onClick={handleChatbotClick}>
        <img src={bot} alt="Chatbot Icon" style={{ width: '50px', height: '50px' }} />
      </div>
    </div>
  );
}