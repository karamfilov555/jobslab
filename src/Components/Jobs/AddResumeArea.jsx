import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSelect } from 'react-multi-select-component';
import "./AddResumeArea.css";

const AddResumeArea = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(null);
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [gender, setGender] = useState('MALE');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [locations, setLocations] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);
  const [measurements, setMeasurements] = useState('');
  const [photo, setPhoto] = useState(null);
  const [existingPhotos, setExistingPhotos] = useState([]);

  useEffect(() => {
    const fetchMultiselectOptions = async () => {
      // Fetch options (languages, skills, locations)
      // (The same fetching logic as before)
    };

    const fetchExistingPhotos = async () => {
      try {
        // Mocked list of photo URLs for testing purposes
        const mockedPhotos = [
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg'
        ];
        
        // Set the mocked data
        setExistingPhotos(mockedPhotos);
      } catch (error) {
        toast.error('Failed to load existing photos');
      }
    };

    fetchMultiselectOptions();
    fetchExistingPhotos();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Form submission logic remains the same
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <h4 className="jm-job-acc-title">Create your profile and put it online.</h4>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <div className="row">
            {/* Photo Upload and Preview */}
            <div className="col-xl-12 text-center mb-3">
              {photo && (
                <div className="photo-preview-box">
                  <img src={photo} alt="Profile Preview" className="photo-preview" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>

            {/* Display Existing Photos */}
            <div className="col-xl-12 text-center mb-3">
              <h5>Your Existing Photos</h5>
              <div className="existing-photos-list">
                {existingPhotos.length > 0 ? (
                  existingPhotos.map((photoUrl, index) => (
                    <div key={index} className="photo-item">
                      <img src={photoUrl} alt={`Existing Photo ${index + 1}`} className="existing-photo" />
                    </div>
                  ))
                ) : (
                  <p>No existing photos found.</p>
                )}
              </div>
            </div>

            {/* Form Fields */}
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Date of birth"
                className="form-control date-picker-input"
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Eye Color"
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Hair Color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Height (in centimeters)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                placeholder="Weight (in kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="col-xl-12">
              <label>Location:</label>
              <MultiSelect
                options={locationOptions}
                value={locations.map(location => ({ value: location, label: location }))}
                onChange={setLocations}
                labelledBy="Select your locations"
              />
            </div>
            <div className="col-xl-12">
              <label>Languages:</label>
              <MultiSelect
                options={languageOptions}
                value={languages.map(language => ({ value: language, label: language }))}
                onChange={setLanguages}
                labelledBy="Select your languages"
              />
            </div>
            <div className="col-xl-12">
              <label>Skills:</label>
              <MultiSelect
                options={skillOptions}
                value={skills.map(skill => ({ value: skill, label: skill }))}
                onChange={setSkills}
                labelledBy="Select your skills"
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <label>Measurements:</label>
              <select value={measurements} onChange={(e) => setMeasurements(e.target.value)}>
                <option value="XS">XS</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </div>
            <div className="col-xl-12">
              <button
                className="jm-post-job-btn jm-theme-btn"
                type="submit"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResumeArea;
