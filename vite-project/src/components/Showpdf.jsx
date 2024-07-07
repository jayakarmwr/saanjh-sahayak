import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const Showpdf = ({ patientId }) => {
  const [allFiles, setAllFiles] = useState([]);
  const [selectedPdfUrl, setSelectedPdfUrl] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPdf = async () => {
      try {
        const result = await axios.get(`/en/get-files?id=${patientId}`);
        console.log(result.data);
        setAllFiles(result.data ); // Ensure setting an empty array if data is undefined
      } catch (error) {
        console.error("Error fetching file list:", error);
        setAllFiles([]); // Ensure setting an empty array on error
      }
    };

    getPdf();
  }, [patientId, id]);

  const handlePDFView = async (fileId) => {
    try {
      console.log(fileId);
      const response = await axios.get(`/en/files/${fileId}`, { responseType: 'arraybuffer' });
      const binaryData = new Uint8Array(response.data);
      const blob = new Blob([binaryData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      setSelectedPdfUrl(url); 
  
      // Create a new link element
     /* const link = document.createElement('a');
      link.href = `/pdfShow?pdfUrl=${encodeURIComponent(url)}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
  
      // Append to the body
      document.body.appendChild(link);
      link.click();
  
      // Remove from the body
      document.body.removeChild(link);*/
    } catch (error) {
      console.error("Error fetching PDF file:", error);
    }
  };;

  return (
    <div>
      {allFiles && allFiles.length === 0 ? (
        <p>No files available.</p>
      ) : (
        allFiles.map((data) => (
          <div className="inner-div" key={data}>
            <button
              className="btn btn-primary" style={{ backgroundColor: '#990011FF', color: 'white' }} 
              onClick={() => handlePDFView(data)} 
            >
              Show Pdf
            </button>
          </div>
        ))
      )}
      {selectedPdfUrl && (
        <div className="pdf-preview">
          <iframe src={selectedPdfUrl} width="100%" height="100%" style={{ height: '100vh' }}></iframe>
        </div>
      )}
    </div>
  );
};

export default Showpdf;
