const express=require("express");
const {Patient,Doctor}=require('../models/allschemas');
const allroutes=express.Router();


allroutes.get("/",(req,res)=>
{
    console/log("root reaches");
})