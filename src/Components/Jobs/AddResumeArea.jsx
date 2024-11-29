import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import { jwtDecode } from 'jwt-decode';
import './AddResumeArea.css';

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
  const [phoneNumber, setPhoneNumber] = useState('');
  const [photo, setPhoto] = useState(null);
  const [existingPhotos, setExistingPhotos] = useState([]);

  useEffect(() => {
    const fetchMultiselectOptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7111/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                multiselectsOptions {
                  skills
                  languages
                  locations
                }
              }
            `
          }),
        });

        const result = await response.json();

        if (result.errors) {
          toast.error('Failed to load multiselect options');
        } else {
          setLanguageOptions(
            result.data.multiselectsOptions.languages.map((language) => ({
              value: language,
              label: language.replace(/_/g, ' '),
            }))
          );
          setSkillOptions(
            result.data.multiselectsOptions.skills.map((skill) => ({
              value: skill,
              label: skill.replace(/_/g, ' '),
            }))
          );
          setLocationOptions(
            result.data.multiselectsOptions.locations.map((location) => ({
              value: location,
              label: location.replace(/_/g, ' '),
            }))
          );
        }
      } catch (error) {
        toast.error('An error occurred while fetching options');
      }
    };

    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7111/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            query: `
              query {
                multiselectsOptions {
                  skills
                  languages
                  locations
                }
              }
            `
          }),
        });
        
        const result = [
          'https://via.placeholder.com/150',
          'https://via.placeholder.com/150',
        ];
        setExistingPhotos(result);
      } catch (error) {
        toast.error('Failed to load existing photos');
      }
    };

    fetchMultiselectOptions();
    fetchUserDetails();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(URL.createObjectURL(file));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (
      !firstName ||
      !lastName ||
      !eyeColor ||
      !hairColor ||
      !gender ||
      !height ||
      !weight ||
      locations.length === 0 ||
      languages.length === 0 ||
      skills.length === 0  ||
      !measurements ||
      !phoneNumber
    ) {
      toast.error('Please fill all the required fields');
      return;
    }

    const formattedDate = date ? date.toISOString().split('T')[0] : null;

    try {
      const token = localStorage.getItem("token");
      const decodedToken = jwtDecode(token); // Use named import
      const userId = decodedToken.nameid;
      const response = await fetch('https://localhost:7111/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `
            mutation {
              upsertUserProfile(
                userId: "${userId}",
                input: {
                  dateOfBirth: "${formattedDate}",
                  eyeColor: "${eyeColor}",
                  hairColor: "${hairColor}",
                  firstName: "${firstName}",
                  lastName: "${lastName}",
                  gender: ${gender},
                  height: ${height},
                  weight: ${weight},
                  location: "${locations.join(', ')}",
                  languages: [${languages}],
                  skills: [${skills}],
                  measurements: ${measurements}
                  phoneNumber: "${phoneNumber}"
                }
              ) {
                message
              }
            }
          `
        })
      });

      const result = await response.json();

      if (result.errors) {
        toast.error('Failed to submit profile');
      } else {
        toast.success(result.data.upsertUserProfile.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the profile');
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <h4 className="jm-job-acc-title">Create Your Profile</h4>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <div className="row">
           
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
            
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Date of Birth"
                className="uniform-input"
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Eye Color"
                value={eyeColor}
                onChange={(e) => setEyeColor(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Hair Color"
                value={hairColor}
                onChange={(e) => setHairColor(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Height (in cm)"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <input
                type="text"
                className="uniform-input"
                placeholder="Weight (in kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="col-xl-6 col-md-6">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="uniform-input"
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="col-xl-6 col-md-6">
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
              <label>Location:</label>
              <Select
                options={locationOptions}
                isMulti
                value={locationOptions.filter((option) =>
                  locations.includes(option.value)
                )}
                onChange={(selected) =>
                  setLocations(selected.map((option) => option.value))
                }
              />
            </div>
            <div className="col-xl-12">
              <label>Languages:</label>
              <Select
                options={languageOptions}
                isMulti
                value={languageOptions.filter((option) =>
                  languages.includes(option.value)
                )}
                onChange={(selected) =>
                  setLanguages(selected.map((option) => option.value))
                }
              />
            </div>
            <div className="col-xl-12 mb-4">
              <label>Skills:</label>
              <Select
                options={skillOptions}
                isMulti
                value={skillOptions.filter((option) =>
                  skills.includes(option.value)
                )}
                onChange={(selected) =>
                  setSkills(selected.map((option) => option.value))
                }
              />
            </div>
            
            
            <br></br>
            <br></br>
            <div className="col-xl-12 text-center">
              <button
                className="jm-post-job-btn jm-theme-btn"
                onClick={handleFormSubmit}
              >
                Submit
              </button>
            </div>
             <div className="col-xl-12 text-center mb-3 pt-30">
            {photo && (
                <div className="photo-preview-box">
                  <img src={photo} alt="Profile Preview" className="photo-preview" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>
            <div className= "col-xl-12 text-center">
  <button className="btn btn-primary"
                onClick={handleFormSubmit}
              >
                Upload photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResumeArea;
