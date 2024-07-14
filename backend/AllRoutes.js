const router = require('express').Router();
const {getPatients,getpatientdetails,uploadpatient,getfiles,chatbot,postprescription,getprediction} = require('./controllers/get_set')
const { uploadpdf ,pdfid}=require('./controllers/pdfs');
const {uploadReport,getParameters,analysis} = require('./controllers/LLM')





router.get('/getpatients',getPatients);
router.post('/getparameters',getParameters)
router.post('/analysis',analysis);
//router.post('/upload',uploadpatient);
router.post('/upload', uploadReport)
router.post('/uploadpdf', uploadpdf)
router.get("/patientdetail",getpatientdetails);
router.get("/get-files",getfiles);
router.get("/files/:id",pdfid);
router.post("/chat",chatbot);
router.post ("/precription",postprescription);
router.get('/getprediction',getprediction);


module.exports = router;