const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const Pdf = require('pdf-parse');
const multer = require('multer');
const express = require('express');
const app = express();
const axios = require('axios');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { analysis } = require('./LLM');
require('dotenv').config();
const mongoURI =process.env.MONGO_URI;
const databaseName = 'workshop';
const client = new MongoClient(mongoURI);
let db;
client.connect();
db = client.db(databaseName);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/*const uploadpdf = async (req, res) => {
    try {
        if (!db) {
            throw new Error('MongoDB connection not established.');
        }
        const { file, filename , patientId ,name} = req.body;
        
        const uploadFile = async (data, name) => {
            const buffer = Buffer.from(data, 'base64');
            const bucket = new GridFSBucket(db);
            const uploadStream = bucket.openUploadStream(name);
            const fileId = uploadStream.id;
            let parsed;
            
            await Pdf(buffer).then(function(data){
                 parsed=(data.text);
            })

            const parsedText = await pdfparse(buffer);
           const response =  await axios.post('http://localhost:3000/en/getparameters', { text: parsed });
           if(response.data.data===false){
             return {fileId:null,jsonObject:null};
           }

           const jsonObject = response.data.data;
           //console.log("i a m in pdf js",response.data.data)
            

            await new Promise((resolve, reject) => {
                uploadStream.end(buffer, (error) => {
                    if (error) {
                        console.error(`Error uploading ${name}:`, error);
                        reject(error);
                    } else {
                        console.log(`${name} uploaded successfully, stored under id:`, fileId);
                        resolve(fileId);
                    }
                });
            });

            return {fileId,jsonObject};
        };
        const fileDetails = file ? await uploadFile(file, filename) : null;
        if(fileDetails.fileId===null){
            return res.json({data : false});
        }
        
        const ollamaResponse = await axios.post('http://localhost:5000/ollama/predict', {
            text:parsedText // Send the parsed text instead of the file
        });


        console.log("Ollama response:", ollamaResponse.data);
        const fileId = fileDetails.fileId;
        const jsonObject = fileDetails.jsonObject;
        
        console.log("hi");
        const analysis_response = await axios.post('http://localhost:3000/en/analysis',{fileId : fileId, jsonObject:jsonObject,patientId: patientId,name : name } );
        console.log("analysis_response ",analysis_response.data.data)
        return res.json({data : true});

        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save pdf details' });
    }
}*/

const pdfid = async (req, res) => {
    try {
        const conn = mongoose.createConnection(mongoURI);
        let gfs;
        conn.once('open', () => {
            gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'fs'
            });
        });



        const fileId = new mongoose.Types.ObjectId(req.params.id);

        if (!gfs) {
            conn.once('open', () => {
                gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                    bucketName: 'fs'
                });
                const readStream = gfs.openDownloadStream(fileId);
                res.set('Content-Type', 'application/pdf');
                readStream.pipe(res);
            });
        } else {
            gfs.openDownloadStream(fileId).pipe(res);
        }


    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
    }
};
const pdfparse = async (buffer) => {
    try {
        const data = await Pdf(buffer);
        return data.text;
    } catch (error) {
        console.error('Error parsing PDF:', error);
        throw new Error('Failed to parse PDF');
    }
};

const uploadFile = async (buffer, name) => {
    try {
        const bucket = new GridFSBucket(db);
        const uploadStream = bucket.openUploadStream(name);
        const fileId = uploadStream.id;

        await new Promise((resolve, reject) => {
            uploadStream.end(buffer, (error) => {
                if (error) {
                    console.error(`Error uploading ${name}:`, error);
                    reject(error);
                } else {
                    console.log(`${name} uploaded successfully, stored under id:`, fileId);
                    resolve(fileId);
                }
            });
        });

        return fileId;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw new Error('Failed to upload file');
    }
};

const uploadpdf = async (req, res) => {
    try {
        if (!db) {
            throw new Error('MongoDB connection not established.');
        }

        const { file, filename, patientId, name } = req.body;

        if (!file || !filename || !patientId || !name) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Decode base64 file data to buffer
        const buffer = Buffer.from(file, 'base64');
        
        // Parse the PDF to extract text
        const parsedText = await pdfparse(buffer);

        // Upload the PDF to MongoDB GridFS
        const fileId = await uploadFile(buffer, filename);

        // Send parsed text to another service for parameters
        const response = await axios.post('http://localhost:3000/en/getparameters', { text: parsedText });
        if (response.data.data === false) {
            return res.json({ data: false });
        }

        const jsonObject = response.data.data;

        // Send parsed text to Ollama model
        const ollamaResponse = await axios.post('http://localhost:5000/ollama/predict', {
            text: parsedText
        });

        console.log("Ollama response:", ollamaResponse.data);

        // Send analysis request
        const analysisResponse = await axios.post('http://localhost:3000/en/analysis', {
            fileId: fileId,
            jsonObject: jsonObject,
            patientId: patientId,
            name: name
        });

        console.log("Analysis response:", analysisResponse.data.data);

        return res.json({ data: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to process PDF' });
    }
};

/*const pdfparse = async (req, res) => {
    try {
        const { file } = req.body;

        if (!file) {
            return res.status(400).json({ error: 'No file provided' });
        }

        const buffer = Buffer.from(file, 'base64');
        const parsedText = await parsePdf(buffer);

        res.json({ text: parsedText });
    } catch (error) {
        console.error('Error processing file:', error);
        res.status(500).json({ error: 'Error processing file' });
    }
};*/

  const reciver = async (req,res)=>{
    const parsed=req.body.text;
  }



module.exports = { uploadpdf, pdfid, pdfparse,reciver,analysis }