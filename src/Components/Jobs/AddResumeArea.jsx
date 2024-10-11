import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSelect } from 'react-multi-select-component';

const AddResumeArea = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [date, setDate] = useState(null);
  const [eyeColor, setEyeColor] = useState('');
  const [hairColor, setHairColor] = useState('');
  const [gender, setGender] = useState('MALE');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [location, setLocation] = useState('');
  const [languages, setLanguages] = useState([]);
  const [languageOptions, setLanguageOptions] = useState([]);  // Dynamic languagues
  const [skills, setSkills] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);  // Dynamic skills
  const [measurements, setMeasurements] = useState('');

  // Fetch languages from the backend
  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://localhost:7111/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZmE3YzQ0YS1kYWNhLTQ3OTAtODViMi1iZWI5Mjg3ODkyOWUiLCJ1bmlxdWVfbmFtZSI6ImthcmFtZmlsb3Y1NTVAZ21haWwuY29tIiwibmJmIjoxNzI4NjMwNjk3LCJleHAiOjE3Mjg2MzQyOTcsImlhdCI6MTcyODYzMDY5N30.4GajyryK80Px3nwtw7S3W4O85syiaIg9uHQD7PSokfg'
          },
          body: JSON.stringify({
            query: `
              query {
                languages
              }
            `
          })
        });

        const result1 = await response.json();

        if (result1.errors) {
          toast.error('Failed to load languages');
        } else {
          const fetchedLanguages = result1.data.languages.map(language => ({
            value: language, // Assuming language value from the BE matches the expected format
            label: language.replace(/_/g, ' ') // Format label (optional)
          }));
          setLanguageOptions(fetchedLanguages); // Update state with the fetched skills
        }
      } catch (error) {
        toast.error('An error occurred while fetching languages');
      }
    };

    fetchLanguages(); // Call the function to load skills when component mounts
  }, []);


   // Fetch skills from the backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('https://localhost:7111/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZmE3YzQ0YS1kYWNhLTQ3OTAtODViMi1iZWI5Mjg3ODkyOWUiLCJ1bmlxdWVfbmFtZSI6ImthcmFtZmlsb3Y1NTVAZ21haWwuY29tIiwibmJmIjoxNzI4NjMwNjk3LCJleHAiOjE3Mjg2MzQyOTcsImlhdCI6MTcyODYzMDY5N30.4GajyryK80Px3nwtw7S3W4O85syiaIg9uHQD7PSokfg'
          },
          body: JSON.stringify({
            query: `
              query {
                skills
              }
            `
          })
        });

        const result = await response.json();

        if (result.errors) {
          toast.error('Failed to load skills');
        } else {
          const fetchedSkills = result.data.skills.map(skill => ({
            value: skill, // Assuming skill value from the BE matches the expected format
            label: skill.replace(/_/g, ' ') // Format label (optional)
          }));
          setSkillOptions(fetchedSkills); // Update state with the fetched skills
        }
      } catch (error) {
        toast.error('An error occurred while fetching skills');
      }
    };

    fetchSkills(); // Call the function to load skills when component mounts
  }, []);

  const handleLanguagesChange = (selectedOptions) => {
    // Set selected languages
    setLanguages(selectedOptions.map(option => option.value));
  };

  const handleSkillsChange = (selectedOptions) => {
    // Set selected skills
    setSkills(selectedOptions.map(option => option.value));
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
      !location ||
      languages.length === 0 ||
      skills.length === 0 ||
      !measurements
    ) {
      toast.error('Please fill all the required fields');
      return;
    }


    const formattedDate = date ? date.toISOString().split('T')[0] : null;

    try {
      const response = await fetch('https://localhost:7111/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZmE3YzQ0YS1kYWNhLTQ3OTAtODViMi1iZWI5Mjg3ODkyOWUiLCJ1bmlxdWVfbmFtZSI6ImthcmFtZmlsb3Y1NTVAZ21haWwuY29tIiwibmJmIjoxNzI4NjMwNjk3LCJleHAiOjE3Mjg2MzQyOTcsImlhdCI6MTcyODYzMDY5N30.4GajyryK80Px3nwtw7S3W4O85syiaIg9uHQD7PSokfg'
        },
        body: JSON.stringify({
          query: `
            mutation {
              upsertUserProfile(
                userId: "cfa7c44a-daca-4790-85b2-beb92878929e", 
                input: {
                  dateOfBirth: "${formattedDate}",
                  eyeColor: "${eyeColor}",
                  hairColor: "${hairColor}",
                  firstName: "${firstName}",
                  lastName: "${lastName}",
                  gender: ${gender},
                  height: ${height},
                  weight: ${weight},
                  location: "${location}",
                  languages: [${languages.map(lang => `${lang}`).join(',')}],
                  skills: [${skills.map(skill => `${skill}`).join(',')}],
                  measurements: ${measurements}
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
        toast.error('Failed to submit resume');
      } else {
        toast.success(result.data.upsertUserProfile.message);
      }
    } catch (error) {
      toast.error('An error occurred while submitting the resume');
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <h4 className="jm-job-acc-title">Create your resume and put it online.</h4>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <div className="row">
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
                placeholder="Height (in cantimeters)"
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
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="col-xl-12">
              <label>Languages:</label>
              <MultiSelect
                options={languageOptions}
                value={languages.map(language => ({ value: language, label: language }))}
                onChange={handleLanguagesChange}
                labelledBy="Select your languages"
              />
            </div>
            <div className="col-xl-12">
              <label>Skills:</label>
              <MultiSelect
                options={skillOptions}
                value={skills.map(skill => ({ value: skill, label: skill }))}
                onChange={handleSkillsChange}
                labelledBy="Select your skills"
              />
            </div>
              <label>Measurements:</label>
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
