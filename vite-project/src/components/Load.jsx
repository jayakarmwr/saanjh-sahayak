// FileUpload.js
import React, { useState } from 'react';
import axios from 'axios';
//import { Worker, Viewer } from '@react-pdf-viewer/core';
//import '@react-pdf-viewer/core/lib/styles/index.css';
//import '@react-pdf-viewer/default-layout/lib/styles/index.css';
//import { Document, Page } from 'react-pdf';






const Load = () => {

    const [fileName, setFileName] = useState("")
    const [file, setFile] = useState(null);
    const [pdfURL, setPdfURL] = useState(null)
    const [size, setSize] = useState(null)




    function handleFileChange(event) {
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/en/uploadpdf`, { file: file, filename: fileName });
            console.log("Successfully uploaded.");
        } catch (error) {
            console.log("Error uploading details:", error);
            alert('File size too large');
        }
    };

    const handleShow = async (event) => {
        event.preventDefault();

        try {
            console.log("hi")
            const response = await axios.get(`/en/pdfid/66813196189877e17f54a9e0`, { responseType: 'arraybuffer' });
            // console.log(response.data);
            const binaryData = new Uint8Array(response.data);
            //console.log(binaryData)
            const blob = new Blob([binaryData], { type: 'application/pdf' });
            let url = window.URL.createObjectURL(blob);
            setPdfURL(url)

        } catch (error) {
            console.log("Error uploading details:", error);
            alert('File size too large');
        }
    }







    const docs = [
        { uri: pdfURL },

    ];



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="application/pdf" />
                <button type="submit">Upload</button>
            </form>
            <br />
            <br />

            <br />
            <button onClick={handleShow}>show pdf</button>

            {pdfURL && (
                <embed src={pdfURL} type="application/pdf" width="100%" height="600px" />
                //     <Document file={pdfURL}>
                //     <Page pageNumber={1} />
                //   </Document>



            )}




        </div>


    );
};

export default Load;
