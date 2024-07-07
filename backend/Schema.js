const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const patientSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  bloodGroup: { type: String, required: true },
  medicalHistory: { type: String, required: true },
  gender: { type: String, required: true },
  fileId: {
    type: Array // Reference to the 'File' collection where PDFs are stored
},
prediction: { type: String },
doctorName: {type:String},
suggestedTreatment: {type:String},
medications: {type:String}
 
});
oldAgeHomeSchema=new mongoose.Schema({
    name:String,
    doctors:Array,
    patients:Array,
    address:String,
    contact:Number,
})
reportSchema = new mongoose.Schema({
    patient: String,
    patientId:ObjectId,
    doctor: String,
    file: ObjectId,
    dateOfReport: Date,
    valuesFromReport:Object,
    precautions: Array,
    severity:Number,
    summary: String,
    possibleDiseases: Array,
    doctorNotes: ObjectId//prescribtion
  });

doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String
});


const patient_data = mongoose.model('patient_data', patientSchema);
const report = mongoose.model('report', reportSchema);
const oldAgeHome = mongoose.model('oldAgeHome', oldAgeHomeSchema);
const doctor = mongoose.model('doctor', doctorSchema);

module.exports = { patient_data, report , oldAgeHome, doctor}