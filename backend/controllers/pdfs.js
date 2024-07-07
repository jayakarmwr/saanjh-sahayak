const { MongoClient, ObjectId, GridFSBucket } = require('mongodb');
const pdf = require('pdf-parse');
require('dotenv').config(); // Ensure dotenv is loaded at the top
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const { patient_data } = require("../Schema");
const pdfParse = require('pdf-parse');

const { GoogleGenerativeAI } = require('@google/generative-ai')

const mongoURI = process.env.MONGO_URI; // Ensure the environment variable name matches exactly
const databaseName = 'workshop';

if (!mongoURI) {
    console.error('MONGO_URI not defined in environment variables');
    process.exit(1);
}

const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let db;

async function connectToDatabase() {
    try {
        await client.connect();
        console.log('MongoDB connected successfully');
        db = client.db(databaseName);
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
}

connectToDatabase();


// Middleware setup
app.use(express.json({ limit: '100mb' })); // Increase body-parser limit
app.use(express.urlencoded({ limit: '100mb', extended: true }));

// POST endpoint for file upload
const uploadpdf = async (req, res) => {
    try {
        if (!db) {
            throw new Error('MongoDB connection not established.');
        }

        const { file, filename} = req.body;
        const id = req.query.id;
        //console.log(id)

        const uploadFile = async (data, name) => {
            const buffer = Buffer.from(data, 'base64');
            const bucket = new GridFSBucket(db);
            const uploadStream = bucket.openUploadStream(name);
            const fileId = uploadStream.id;

            await new Promise((resolve, reject) => {
                uploadStream.end(buffer, (error) => {
                    if (error) {
                        console.error(`Error uploading ${name}:`, error);
                        reject(error);
                    } else {
                      //  console.log(`${name} uploaded successfully, stored under id:`, fileId);
                        resolve(fileId);
                    }
                });
            });

            return fileId;
        };

        const fileId = file ? await uploadFile(file, filename) : null;
        if (fileId && id) {

            ///
            // Extract text from the PDF buffer directly
            const buffer = Buffer.from(file, 'base64');
            const pdfData = await pdfParse(buffer);
            const text = pdfData.text;

            // Send the extracted text to the Gemini API for prediction
            const apiKey = "AIzaSyA0PGILzV1yBsyoWb5DJyXltJ_m3AOrYGg";
            const genAI = new GoogleGenerativeAI(apiKey);
            const model = genAI.getGenerativeModel({
                model: "gemini-1.5-flash",
            });

            const generationConfig = {
                temperature: 0,
                topP: 0.95,
                topK: 64,
                maxOutputTokens: 1000,
                responseMimeType: "text/plain",
            };

            const chatSession = model.startChat({
                generationConfig,
                history: [
                    {
                        role: "user",
                        parts: [
                            { text: text },
                        ],
                    },
                ],
            });

            let result = await chatSession.sendMessage(text);
            let prediction = result.response.text();
            prediction = prediction.replace(/\*\*/g, ""); // Remove Markdown bold markers
            prediction = prediction.replace(/\*/g, "");
            ////
            await patient_data.findByIdAndUpdate(id, { fileId: fileId,prediction: prediction });
        }
       
      //  console.log("File saved successfully");
        res.json({ status: 'ok', fileId: fileId });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to save pdf details' });
    }
};

// GET endpoint to fetch a PDF by ID
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
        //console.log(fileId)

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

const pdfparse = async (req, res) => {
    try {
        //console.log("hi");
       // console.log(req);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { uploadpdf, pdfid, pdfparse };
