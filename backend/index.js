const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const approute = require('./AllRoutes');
require('dotenv').config();

const { Pdf} = require("./Schema");

app.use(cors({ origin: 'https://localhost:5173' }));
  

const port = process.env.PORT;
app.use(bodyParser.json({ limit: '100mb' }));

app.use(express.json({ limit: '100mb' }));

app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.MONGO_URI;
console.log(uri)
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use(express.static(path.join(__dirname, './build')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});


app.use('/en', approute);

app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, './build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
