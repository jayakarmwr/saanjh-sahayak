

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { patient} = require("../Schema");


const getPatients = async (req, res) => {
  try {
    const Patients = await patient.find();
  //  console.log("hi")
    res.send(Patients);
  } catch (err) {
    console.log("error fetching the patients", err);
    res.status(500).send(err);
  }
};
const getpatientdetails=async(req,res)=>
  {
    const id = req.query.id; // Get the ID from the query parameters
    //console.log('Fetching details for ID:', id);

  try {
    const data = await patient.find({ _id: id });
    //console.log(data);
    res.send(data);
  } catch (error) {
    console.error('Error fetching patient details:', error);
    res.status(500).send('Server error');
  }
  };
  const uploadpatient=async(req,res)=>
    {
      try {
        const patientData = new patient_data(req.body);
        await patientData.save();
        res.status(201).send(patientData);
      } catch (error) {
        res.status(400).send(error);
      }

    }

    const getfiles = async (req, res) => {
      try {
        const id = req.query.id;
        const data = await patient_data.findOne({ _id: id }).select('fileId'); // Find a single document and select the fileId field
        if (!data) {
          return res.status(404).json({ message: 'No data found' });
        }
        const fileIds = data.fileId; // fileId is already an array
       // console.log(fileIds);
        res.json(fileIds); // Send the fileId array in the response
      } catch (error) {
        console.error("Error fetching file IDs:", error);
        res.status(500).send('Internal server error');
      }
    };


const apiKey = "AIzaSyA0PGILzV1yBsyoWb5DJyXltJ_m3AOrYGg";  // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 0.0,
  topP: 0.9,
  topK: 50,
  maxOutputTokens: 50,
  responseMimeType: 'text/plain',
};


const chatbot=async (req, res) => {
  const userMessage = req.body.message;
 // console.log('User Message:', userMessage);

  try {
    const chatSession = await model.startChat({
      generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(userMessage);
    let botResponse = result.response.text();
    
   
    botResponse= botResponse.replace(/\*\*/g, ""); // Remove Markdown bold markers
    botResponse = botResponse.replace(/\*/g, "");
   // console.log('Bot Response:', botResponseString);

    res.json({ reply: botResponse });
  } catch (error) {
    console.error('Error communicating with Gemini API:', error);
    res.status(500).json({ error: 'Failed to communicate with Gemini API' });
  }


  
  

};
const postprescription=async(req,res)=>
{
  try {
    const  id  = req.query.id;
    //console.log(id)
    const { doctorName, suggestedTreatment, medications } = req.body;
    

    const patient = await patient_data.findByIdAndUpdate(id, {
      doctorName,
      suggestedTreatment,
      medications,
    }, { new: true });

    if (!patient) {
      return res.status(404).json({ status: 'error', message: 'Patient not found' });
    }
    //console.log("saved")

    res.json({ status: 'ok', message: 'Suggestion submitted successfully', patient });
  } catch (error) {
    console.error('Error submitting suggestion:', error);
    res.status(500).json({ status: 'error', message: 'Failed to submit suggestion', error });
  }

}
    

  
const getprediction=async(req,res)=>
{
  const id = req.query.id;
  console.log(id)
  const fileid = req.query.fileId;
  console.log(fileid)
  
  try {
    const patientData = await patient_data.findOne({ _id: id });
    console.log(patientData)
    if (!patientData) {
      return res.status(404).send({ error: 'Patient not found' });
    }
  
    const fileObj = patientData.fileId;
    console.log(fileObj)
    if (!fileObj) {
      return res.status(404).send({ error: 'File not found' });
    }
    const file = fileObj.file;
    if (file !== fileid) {
      return res.status(404).send({ error: 'File not found' });
    }
    
    const predictions = fileObj.predictions;
    if (!predictions || !predictions.length) {
      return res.status(404).send({ error: 'No predictions found' });
    }
    
    const prediction = predictions[0]; // assuming you want the first prediction
    const predictionData = prediction.prediction; // assuming the prediction data is in a property called "prediction"
    console.log(predictionData)
    
    res.send({ prediction: predictionData });
  }catch(err)
  {
    console.log("error occured",err)
  }
}





module.exports = { getPatients, getpatientdetails ,uploadpatient,getfiles,chatbot,postprescription,getprediction};
