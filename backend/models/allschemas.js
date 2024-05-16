const mongoose=require("mongoose");
const patientschema=new mongoose.Schema(
    {
        "name":String,
        "medical_history":Object,
        "age":Number,

    }
)
const doctorschema=new mongoose.Schema({
    "name":String,
    "workat":String,
    "phone_no":Number,
    "email":String,
})

const Patient =mongoose.model('Patient',patientschema);
const Doctor=mongoose.model("Doctor",doctorschema);
module.exports={Patient,Doctor};