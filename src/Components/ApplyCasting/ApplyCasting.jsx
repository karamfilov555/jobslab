import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { MultiSelect } from 'react-multi-select-component';
import DatePicker from 'react-datepicker';
import axios from 'axios';
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
  
  // New state variables for additional questions
  const [question1, setQuestion1] = useState('');
  const [question2, setQuestion2] = useState('');

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

    try {
      const formData = new FormData();

      const query = `
        mutation uploadImage($file: Upload!) {
          uploadImage(file: $file, userId: "5dde9f90-15af-4759-93e4-bb5f39df7f46") {
            message
          }
        }
      `;

      formData.append(
        "operations",
        JSON.stringify({
          query,
          variables: { file: null },
        })
      );

      formData.append("map", JSON.stringify({ "0": ["variables.file"] }));
      formData.append("0", featuredImage);

      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          'GraphQL-Preflight': 'true',
          "Apollo-Require-Preflight": "true",
        },
        body: formData,
      });

      const result = await response.json();
      if (result.errors) {
        console.error("Error uploading photo:", result.errors[0].message);
        toast.error("Error uploading photo: " + result.errors[0].message);
      } else {
        console.log("Photo uploaded successfully:", result.data.uploadImage.message);
        toast.success(result.data.uploadImage.message || "Photo uploaded successfully");
      }
    } catch (error) {
      console.error("An error occurred while uploading the photo.", error);
      toast.error("An error occurred while uploading the photo.");
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <h4 className="text-center">Apply for Casting Job - Job ID: {jobId}</h4>
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
                required
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
                required
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
                required
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
                required
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
                required
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
                required
              />
            </div>
            <div className="col-md-12 mt-3">
              <label><strong>Company Logo *</strong></label>
              <input
                type="file"
                onChange={handleLogoChange}
                className="form-control"
                accept="image/*"
                required
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
                required
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
                  required
                  className="form-control"
                />
              </div>
            ))}

            {/* Additional Questions Section */}
            <div className="col-md-12 mt-3">
              <label><strong>Why are you interested in this position? *</strong></label>
              <input
                type="text"
                placeholder="Your answer"
                value={question1}
                onChange={(e) => setQuestion1(e.target.value)}
                required
                className="form-control"
              />
            </div>
            <div className="col-md-12 mt-3">
              <label><strong>What relevant experience do you have? *</strong></label>
              <input
                type="text"
                placeholder="Your answer"
                value={question2}
                onChange={(e) => setQuestion2(e.target.value)}
                required
                className="form-control"
              />
            </div>

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
