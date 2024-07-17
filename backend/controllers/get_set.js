

const { GoogleGenerativeAI } = require('@google/generative-ai')
const { patient,report} = require("../Schema");




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
        const patientData = new patient(req.body);
        await patientData.save();
        res.status(201).send(patientData);
      } catch (error) {
        res.status(400).send(error);
      }

    }

    const getfiles = async (req, res) => {
      try {
        const id = req.query.id;
        const data = await patient.findOne({ _id: id }).select('reportsList'); // Find a single document and select the fileId field
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


const apiKey = "AIzaSyAsP6FIwHahsY4ShpkIDu-Vl08DAuKeJRA";  // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  systemInstruction: "Respond only to medical questions with brief, accurate answers that fit in a standard chatbot window. Provide factual information based on established medical knowledge, focusing on symptoms, conditions, treatments, and general health advice. Do not offer personalized diagnoses or treatment plans. For non-medical queries or requests for alternative treatments, politely explain that you're a medical information chatbot and can't assist with those topics. Always encourage users to consult a healthcare professional for personalized medical advice, especially for serious concerns. Keep responses concise, clear, and easy to read.",

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
    const patientData = await patient.findOne({ _id: id });
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


const getreportsdetails=async(req,res)=>
{
  const { id } = req.query; 
 
  

  try {
    const details = await report.findOne({ _id: id }); 
    if (!details) {
      return res.status(404).json({ message: 'No report found for the given ID.' });
    }
    
    res.json(details);
  } catch (error) {
    console.error('Error fetching report details:', error);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
}

const updatedoctornotes=async(req,res)=>
{
  try {
    const { id } = req.params;
    const { doctorNotes } = req.body;
   

    // Validate inputs if needed
    if (!doctorNotes) {
      return res.status(400).json({ error: 'Doctor notes are required' });
    }

    const updatedReport = await report.findByIdAndUpdate(id, {doctorNotes : doctorNotes, isVerified:"true"} , { new: true });
    res.status(200).json(updatedReport);
  } catch (error) {
    console.error('Error updating doctor notes:', error);
    res.status(500).json({ error: 'Error updating doctor notes' });
  }
}
const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const getDates = async (req,res)=>{
  const id = req.params.id;
  const data = await report.find({patientId:id});
  const dates = data.map(item=>({
      file: item._id,
      specialistReq:item.specialistReq,
      date: item.valuesFromReport.date ? item.valuesFromReport.date : formatDate(item.dateOfReport)

  }))
  
  res.json(dates);

}




module.exports = { getPatients, getpatientdetails ,uploadpatient,getfiles,chatbot,postprescription,getprediction,getreportsdetails,updatedoctornotes,getDates};
