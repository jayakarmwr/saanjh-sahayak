const router = require('express').Router();
const {getPatients,getpatientdetails,uploadpatient,getfiles,chatbot,postprescription,getprediction,getreportsdetails,updatedoctornotes,getDates} = require('./controllers/get_set')
const { uploadpdf ,pdfid}=require('./controllers/pdfs');
const {getParameters,analysis} = require('./controllers/LLM')





router.get('/getpatients',getPatients);
router.post('/getparameters',getParameters)
router.post('/analysis',analysis);
router.post('/upload',uploadpatient);
router.get('/getreportdetails',getreportsdetails);
router.post('/uploadpdf', uploadpdf)
router.get("/patientdetail",getpatientdetails);
router.get("/get-files",getfiles);
router.post("/updateDoctorNotes/:id",updatedoctornotes)
router.post("/chat",chatbot);
router.post ("/precription",postprescription);
router.get('/getprediction',getprediction);
router.get('/files/:id',pdfid);
router.get('/getdates/:id',getDates)


module.exports = router;