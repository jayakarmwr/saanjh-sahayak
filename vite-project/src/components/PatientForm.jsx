import React, { useState } from "react";
import axios from "axios";
import Navigationvar from "./Navigationvar";
import image from '../assets/young-friendly-female-caregiver-senior-260nw-2266110337.webp'

const PatientForm = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      patientName,
      age,
      bloodGroup,
      medicalHistory,
      gender,
    };

    try {
      console.log("entered")
      const response = await axios.post('/en/upload', formData);
      alert("done")
      console.log(response.data);
    } catch (error) {
      console.error('Error submitting patient details:', error);
    }
  };

  const containerStyle = {
    display: 'flex',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '1rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: '5%',
    flexDirection: 'row', // Flex direction for side-by-side layout
  };

  const formContainerStyle = {
    flex: 1,
    padding: '1rem',
  };

  const imageContainerStyle = {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1rem',
  };

  const imageStyle = {
    maxWidth: '100%',
    height: '100%',
    borderRadius: '8px',
  };

  const formGroupStyle = {
    marginBottom: '1rem',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: 'bold',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    display: 'inline-block',
    padding: '0.75rem 1.25rem',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#990011FF',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#990011FF',
  };

  const mediaQueryStyle = `
    @media (max-width: 768px) {
      .container {
        flex-direction: column;
      }
      button {
        width: 100%;
        padding: 0.75rem;
      }
    }
  `;

  return (
    <div>
      <Navigationvar />
      <div className="container" style={containerStyle}>
        <style>{mediaQueryStyle}</style>
        <div style={formContainerStyle}>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="patientName" style={labelStyle}>Patient Name</label>
              <input
                type="text"
                id="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="age" style={labelStyle}>Age</label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="bloodGroup" style={labelStyle}>Blood Group</label>
              <input
                type="text"
                id="bloodGroup"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="medicalHistory" style={labelStyle}>Medical History</label>
              <textarea
                id="medicalHistory"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                required
                style={inputStyle}
              ></textarea>
            </div>

            <div className="form-group" style={formGroupStyle}>
              <label htmlFor="gender" style={labelStyle}>Gender</label>
              <select
                id="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
                style={inputStyle}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              style={{ ...buttonStyle }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
            >
              Submit
            </button>
          </form>
        </div>
        <div style={imageContainerStyle}>
          <img src={image} alt="Side Image" style={imageStyle} />
        </div>
      </div>
    </div>
  );
};

export default PatientForm;
