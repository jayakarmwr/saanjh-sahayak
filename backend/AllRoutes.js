const router = require('express').Router();
const {getPatients,getpatientdetails,uploadpatient,getfiles,chatbot,postprescription} = require('./controllers/get_set')
const { uploadpdf ,pdfid}=require('./controllers/pdfs');




router.get('/getpatients',getPatients);
router.post('/uploadpdf', uploadpdf );
router.post('/upload',uploadpatient);
router.get("/patientdetail",getpatientdetails);
router.get("/get-files",getfiles);
router.get("/files/:id",pdfid);
router.post("/chat",chatbot);
router.post ("/precription",postprescription)


module.exports = router;