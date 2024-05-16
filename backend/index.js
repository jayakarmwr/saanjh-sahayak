const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const allroutes = require('./routes/AllRoutes');

// Parse JSON bodies
app.use(express.json());

let corspolicy = {
    origin: "http://localhost:3000"
}

app.use(cors(corspolicy));

app.use((req, res, next) => {
    console.log("Request received at " + (new Date()));
    async function db() {
        try {
            await mongoose.connect("mongodb://localhost:27017/realmarketplace?retryWrites=true&w=majority");
            console.log("Connected to database");
        } catch (err) {
            console.log('Error connecting to database:', err);
            res.status(500).send(err);
        }
    }
    db();
    next();
});

app.get('/', (req, res) => {
    console.log("Reached root");
    res.send("Welcome to realgrande back end server");
});

app.listen(3000, () => {
    console.log("Server is running");
});
