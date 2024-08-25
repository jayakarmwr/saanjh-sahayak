const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
patientSchema = new mongoose.Schema({
    patientID:Number,
    name: String,
    DOB:Date,
    gender: String,
    chronics:Array,//Chronical diseases like diabetes,BP
    phone:Number,
    reportsList:Array,//latest report is at 0 index
    bloodGroup:String,
})
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
   
  },
  resetToken: {
    type: String,
    default: ''
  },
  resetTokenExpiry: {
    type: Date,
    default: Date.now
  },
  role: {
    type: String,
    enum: ['doctor', 'caretaker'],
    default: 'caretaker'
  }
}, { timestamps: true });
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
    specialistReq: String,
    possibleDiseases: Array,
    doctorNotes: String,//prescribtion
    periodicAnalysis:String,
    isVerified:Boolean
  });

doctorSchema = new mongoose.Schema({
    name: String,
    specialization: String
});

PdfSchema = new mongoose.Schema({
    name: String,
    data: Buffer,
  });

const patient = mongoose.model('patient', patientSchema);
const report = mongoose.model('report', reportSchema);
const oldAgeHome = mongoose.model('oldAgeHome', oldAgeHomeSchema);
const doctor = mongoose.model('doctor', doctorSchema);
const Pdf=mongoose.model('pdf',PdfSchema);
const User = mongoose.model('User', userSchema);


module.exports = { patient, report , oldAgeHome, doctor,Pdf,User}