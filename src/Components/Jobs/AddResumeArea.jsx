import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSelect } from 'react-multi-select-component';
import './AddResumeArea.css'; // Ensure your CSS file is linked here

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

  // Fetch data for multi-select options
  useEffect(() => {
    const fetchMultiselectOptions = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://localhost:7111/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjNGNlOWQyYi05MGRkLTRkZDQtODY5ZS1jOTRiMDc5NmQ2MWEiLCJ1bmlxdWVfbmFtZSI6Im1paGFpbC5rYXRzYXJvd0BnbWFpbC5jb20iLCJuYmYiOjE3MjkxOTgwNDEsImV4cCI6MTcyOTIwMTY0MSwiaWF0IjoxNzI5MTk4MDQxfQ.MMdDU4zvzSkMKfOdO65Agrwf4zDXTrnsYsbleqWxsrY`
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
          })
        });

        const result = await response.json();

        if (result.errors) {
          toast.error('Failed to load multiselect options');
        } else {
          const fetchedLanguages = result.data.multiselectsOptions.languages.map(language => ({
            value: language,
            label: language.replace(/_/g, ' ')
          }));

          const fetchedSkills = result.data.multiselectsOptions.skills.map(skill => ({
            value: skill,
            label: skill.replace(/_/g, ' ')
          }));

          const fetchedLocations = result.data.multiselectsOptions.locations.map(location => ({
            value: location,
            label: location.replace(/_/g, ' ')
          }));

          setLanguageOptions(fetchedLanguages);
          setSkillOptions(fetchedSkills);
          setLocationOptions(fetchedLocations);
        }
      } catch (error) {
        toast.error('An error occurred while fetching options');
      }
    };

    const fetchExistingPhotos = async () => {
      try {
        // Replace with actual API call to fetch user's existing photos
        // const token = localStorage.getItem('token');
        // const response = await fetch('https://localhost:7111/api/user/photos', {
        //   headers: {
        //     "Authorization": `Bearer ${token}`
        //   }
        // });
        // const result = await response.json();
        const resutl = [
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg',
          'https://www.shutterstock.com/image-vector/cool-vector-casting-concept-illustration-260nw-742767343.jpg'
        ]
        setExistingPhotos(resutl); // Assuming result contains an array of photo URLs
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
      skills.length === 0 ||
      !measurements
    ) {
      toast.error('Please fill all the required fields');
      return;
    }

    const formattedDate = date ? date.toISOString().split('T')[0] : null;

    try {
      const token = localStorage.getItem('token');
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
                userId: "c4ce9d2b-90dd-4dd4-869e-c94b0796d61a",
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
                  languages: [${languages.map(lang => `"${lang}"`).join(',')}],
                  skills: [${skills.map(skill => `"${skill}"`).join(',')}],
                  measurements: "${measurements}"
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
            <h4 className="jm-job-acc-title">Create your profile and put it online.</h4>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <div className="row">
            <div className="col-xl-12 text-center mb-3">
              {photo && (
                <div className="photo-preview-box">
                  <img src={photo} alt="Profile Preview" className="photo-preview" />
                </div>
              )}
              <input type="file" accept="image/*" onChange={handlePhotoChange} />
            </div>

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
                placeholder="Height (in cm)"
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
                onChange={selected => setLocations(selected.map(option => option.value))}
                labelledBy="Select your locations"
              />
            </div>
            <div className="col-xl-12">
              <label>Languages:</label>
              <MultiSelect
                options={languageOptions}
                value={languages.map(language => ({ value: language, label: language }))}
                onChange={selected => setLanguages(selected.map(option => option.value))}
                labelledBy="Select your languages"
              />
            </div>
            <div className="col-xl-12">
              <label>Skills:</label>
              <MultiSelect
                options={skillOptions}
                value={skills.map(skill => ({ value: skill, label: skill }))}
                onChange={selected => setSkills(selected.map(option => option.value))}
                labelledBy="Select your skills"
              />
            </div>
            <br></br>
            <br></br>
            <br></br>
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
            <br></br>
            <br></br>
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
