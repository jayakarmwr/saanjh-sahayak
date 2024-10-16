import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './components/Home';
import Doctors from './components/Doctors';
import Patient from './components/Patient';

import Caretaker from './components/Caretaker';
import Doctoranalysis from './components/Doctoranalysis';
import ViewPatient from './components/ViewPatient';
import PatientForm from './components/PatientForm';
import Login from './components/Login';
import Chatbot from './components/Chatbot';
import Analysis from './components/Analysis';
import Chat from './components/Chat';
import Newuser from './components/Newuser';
import Passwordreset from './components/Passwordreset';




function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/patientd/:id' element={<Patient/>}/>
      <Route path='/reportdoctor/:id' element={<Doctoranalysis/>}/>
      <Route path='/caretaker' element={<Caretaker/>}/>
      <Route path='/newpatient' element={<PatientForm/>}/>
      <Route path='/viewpatient/:id' element={<ViewPatient/>}/>
      {/*<Route path='/patientform' element={<PatientForm/>}/>*/}
      {/*<Route path='/signup' element={<Signup/>}/>*/}
      
      <Route path='/chatbot' element={<Chatbot/>}/>
      <Route path='/report/:id' element={<Analysis/>}/>
      {/*<Route path="/user/:userrole" element={<User/>}/>*/}
      <Route path="/login" element={<Login/>}/>
      <Route path='reset-password/:token' element={<Passwordreset/>}/>
      <Route path="/newuser" element={<Newuser/>}/>
      <Route path="/chat" element={<Chat/>}/>
     
     

      
    
      
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
