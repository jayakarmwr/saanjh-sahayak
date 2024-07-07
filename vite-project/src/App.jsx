import {BrowserRouter,Routes,Route} from 'react-router-dom';

import Home from './components/Home';
import Doctors from './components/Doctors';
import Patient from './components/Patient';

import Caretaker from './components/Caretaker';

import ViewPatient from './components/ViewPatient';
import PatientForm from './components/PatientForm';
import Load from './components/Load';
import Chatbot from './components/Chatbot';



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/patientd/:id' element={<Patient/>}/>
      
      <Route path='/caretaker' element={<Caretaker/>}/>
      <Route path='/newpatient' element={<PatientForm/>}/>
      <Route path='/viewpatient/:id' element={<ViewPatient/>}/>
      {/*<Route path='/patientform' element={<PatientForm/>}/>*/}
      <Route path='/form' element={<Load/>}/>
      <Route path='/chatbot' element={<Chatbot/>}/>
     

      
    
      
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
