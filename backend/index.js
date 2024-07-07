const express = require('express');
const mongoose = require('mongoose');
const app=express();
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bodyParser=require('body-parser');
const { GridFsStorage } = require('multer-gridfs-storage');
const approute = require('./AllRoutes');

app.use(bodyParser.json({limit: '100mb'}))
app.use(express.json({limit: '100mb'}))


dotenv.config(); // Load environment variables from .env file


app.use(express.json()); // For JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

const mongoURI = process.env.MONGO_URI;

// Connect mongoose to MongoDB
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});





app.use('/en',approute);

// Serve React build for all routes
app.get('*', function(req, res) {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
