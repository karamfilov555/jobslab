import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './ApplyCasting.css';

const ApplyCasting = () => {
  const location = useLocation();
  const { jobId } = location.state || {};

  console.log("The job id is:", jobId);

  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState([]);
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState([]);
  const [expectedSalary, setExpectedSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [socialLinks, setSocialLinks] = useState({
    linkedin: '',
    twitter: '',
    facebook: '',
    pinterest: '',
    instagram: '',
  });
  const [date, setDate] = useState(null);
  const [locationOptions, setLocationOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const [featuredImage, setFeaturedImage] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [companyVideo, setCompanyVideo] = useState(null);
  const [education, setEducation] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [jobDetails, setJobDetails] = useState('');

  const [casting, setCasting] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({}); // Object to store answers for each question

  useEffect(() => {
    const fetchCastings = async () => {
      try {
        const token = localStorage.getItem("token");

        const query = `
          query {
            castingDetails(castingId: 1) {
              id
              title
              description
              imageUrl
              deadline
              location
            }
          }
        `;

        console.log("Fetching casting data...");

        const response = await fetch("https://localhost:7111/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (response.ok) {
          setCasting(result.data.castingDetails);
        } else {
          throw new Error("Failed to fetch casting data.");
        }
      } catch (error) {
        console.error("Error fetching casting data:", error);
        toast.error("Failed to fetch casting details.");
      }
    };

    fetchCastings();
  }, [jobId]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = localStorage.getItem("token");

        const query = `
          query{
            castingQuestions(castingId: 1){
              id
              questionText
            }
          }
        `;

        console.log("Fetching casting questions data...");

        const response = await fetch("https://localhost:7111/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();
        if (response.ok) {
          setQuestions(result.data.castingQuestions);
        } else {
          throw new Error("Failed to fetch casting questions.");
        }
      } catch (error) {
        console.error("Error fetching casting questions:", error);
        toast.error("Failed to fetch casting questions.");
      }
    };

    fetchQuestions();
  }, [jobId]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer
    }));
  };

  const handleImageChange = (e) => setFeaturedImage(e.target.files[0]);
  const handleLogoChange = (e) => setCompanyLogo(e.target.files[0]);
  const handleVideoChange = (e) => setCompanyVideo(e.target.files[0]);

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const userId = "5dde9f90-15af-4759-93e4-bb5f39df7f46"; // Replace with actual user ID or email

    // Prepare answers array with questionId and answerText
    const formattedAnswers = questions.map((question) => ({
      questionId: question.id,
      answerText: answers[question.id] || "", // Get the answer from answers state, default to empty string if not found
    }));

    const query = `
      mutation {
        applyForCasting(castingId: ${jobId}, userId: "${userId}", answers: ${JSON.stringify(formattedAnswers).replace(/"([^"]+)":/g, '$1:')}) {
          message
        }
      }
    `;

    try {
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
      });

      const result = await response.json();
      if (response.ok) {
        toast.success(result.data.applyForCasting.message || "Application submitted successfully");
      } else {
        throw new Error(result.errors[0]?.message || "Failed to apply for casting");
      }
    } catch (error) {
      console.error("Error applying for casting:", error);
      toast.error("An error occurred while submitting your application.");
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <h4 className="text-center">Apply for {casting.title} - Job ID: {jobId}</h4>
        <form onSubmit={handleSubmit} className="jm-post-job-wrapper mb-40">
          <div className="row">
            {/* Job Title */}
            <div className="col-md-12">
              <label><strong>Job Title *</strong></label>
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                // required
                className="form-control"
              />
            </div>

            {/* Date Picker */}
            <div className="col-md-12 mt-3">
              <label><strong>Date *</strong></label>
              <DatePicker
                selected={date}
                onChange={(selectedDate) => setDate(selectedDate)}
                placeholderText="Select Date"
                className="form-control date-picker-input"
                // required
              />
            </div>

            {/* Job Location */}
            <div className="col-md-12 mt-3">
              <label><strong>Location *</strong></label>
              <MultiSelect
                options={locationOptions}
                value={jobLocation}
                onChange={(selected) => setJobLocation(selected)}
                labelledBy="Select Location"
                className="form-control"
              />
            </div>

            {/* Job Category */}
            <div className="col-md-12 mt-3">
              <label><strong>Category *</strong></label>
              <MultiSelect
                options={categoryOptions}
                value={jobCategory}
                onChange={(selected) => setJobCategory(selected)}
                labelledBy="Select Category"
                className="form-control"
              />
            </div>

            {/* Expected Salary */}
            <div className="col-md-12 mt-3">
              <label><strong>Expected Salary *</strong></label>
              <input
                type="text"
                placeholder="Expected Salary"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
                // required
                className="form-control"
              />
            </div>

            {/* Job Type */}
            <div className="col-md-12 mt-3">
              <label><strong>Job Type *</strong></label>
              <input
                type="text"
                placeholder="Job Type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                // required
                className="form-control"
              />
            </div>

            {/* Job Description */}
            <div className="col-md-12 mt-3">
              <label><strong>Job Description *</strong></label>
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                // required
                className="form-control"
              ></textarea>
            </div>

            {/* File Uploads Section */}
            <div className="col-md-12 mt-3">
              <label><strong>Featured Image *</strong></label>
              <input
                type="file"
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
                // required
              />
            </div>
            <div className="col-md-12 mt-3">
              <label><strong>Company Logo *</strong></label>
              <input
                type="file"
                onChange={handleLogoChange}
                className="form-control"
                accept="image/*"
                // required
              />
            </div>

            {/* Video Upload Section */}
            <div className="col-md-12 mt-3">
              <label><strong>Upload a Video *</strong></label>
              <input
                type="file"
                onChange={handleVideoChange}
                className="form-control"
                accept="video/*"
                // required
              />
            </div>

            {/* Social Links */}
            {['linkedin', 'twitter', 'facebook', 'pinterest', 'instagram'].map((platform) => (
              <div className="col-md-12 mt-3" key={platform}>
                <label><strong>{platform.charAt(0).toUpperCase() + platform.slice(1)} *</strong></label>
                <input
                  type="text"
                  placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                  name={platform}
                  value={socialLinks[platform]}
                  onChange={handleSocialLinkChange}
                  // required
                  className="form-control"
                />
              </div>
            ))}

            {/* Dynamic Questions Section */}
            {questions.map((question) => (
              <div className="col-md-12 mt-3" key={question.id}>
                <label><strong>{question.questionText}</strong></label>
                <input
                  type="text"
                  placeholder="Your answer"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="form-control"
                />
              </div>
            ))}

            {/* Submit Button */}
            <div className="col-md-12 text-center mt-4">
              <button type="submit" className="jm-post-job-btn jm-theme-btn">
                Submit Application
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyCasting;
