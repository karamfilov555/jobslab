import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { MultiSelect } from 'react-multi-select-component';
import axios from 'axios';
import './ApplyCasting.css';

const ApplyCasting = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState('');
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

  // New states for the questions
  const [education, setEducation] = useState('');
  const [workPlace, setWorkPlace] = useState('');
  const [jobDetails, setJobDetails] = useState('');

  

  const handleImageChange = (e) => setFeaturedImage(e.target.files[0]);
  const handleLogoChange = (e) => setCompanyLogo(e.target.files[0]);
  const handleVideoChange = (e) => setCompanyVideo(e.target.files[0]);

  const handleSocialLinkChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation uploadMedia($file: Upload!, $userId: String!) {
          uploadMedia(file: $file, userId: "cfa7c44a-daca-4790-85b2-beb92878929e") {
            message
          }
        }
      `,
      variables: { file: null, userId: "cfa7c44a-daca-4790-85b2-beb92878929e" }
    }));
    
    formData.append('map', JSON.stringify({ 0: ['variables.file'] }));
    formData.append(0, featuredImage || companyLogo || companyVideo);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://localhost:7111/graphql',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.data.errors) {
        toast.error('Error: ' + response.data.errors[0].message);
      } else {
        toast.success(response.data.data.uploadMedia.message || 'Job posted successfully');
      }
    } catch (error) {
      toast.error('An error occurred while uploading the media.');
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <h4 className="text-center">Apply for Casting Job</h4>
        <form onSubmit={handleSubmit} className="jm-post-job-wrapper mb-40">
          <div className="row">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Job Title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                placeholderText="Select Date"
                className="form-control date-picker-input"
              />
            </div>
            <div className="col-md-6">
              <MultiSelect
                options={locationOptions}
                value={jobLocation}
                onChange={(selected) => setJobLocation(selected.map(option => option.value))}
                labelledBy="Select Location"
              />
            </div>
            <div className="col-md-6">
              <MultiSelect
                options={categoryOptions}
                value={jobCategory}
                onChange={(selected) => setJobCategory(selected.map(option => option.value))}
                labelledBy="Select Category"
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Expected Salary"
                value={expectedSalary}
                onChange={(e) => setExpectedSalary(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Job Type"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
              />
            </div>
            <div className="col-md-12">
              <textarea
                placeholder="Job Description"
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
              ></textarea>
            </div>
            
            {/* Questions Section */}
            <div className="col-md-12">
              <label>Education (Primary/Secondary/Higher/Specialty) *</label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                placeholder="Enter your education level"
              />
            </div>
            <div className="col-md-12">
              <label>Workplace (last workplace if currently unemployed) *</label>
              <input
                type="text"
                value={workPlace}
                onChange={(e) => setWorkPlace(e.target.value)}
                placeholder="Enter your last workplace"
              />
            </div>
            <div className="col-md-12">
              <label>Describe the nature of your work *</label>
              <textarea
                value={jobDetails}
                onChange={(e) => setJobDetails(e.target.value)}
                placeholder="Briefly describe your responsibilities"
              ></textarea>
            </div>

            {/* File Uploads Section */}
            <div className="col-md-12">
              <input
                type="file"
                onChange={handleImageChange}
                className="form-control"
                accept="image/*"
              />
              <input
                type="file"
                onChange={handleLogoChange}
                className="form-control mt-3"
                accept="image/*"
              />
            </div>
            
            {/* Video Upload Section */}
            <div className="col-md-12">
              <label>Upload a Video:</label>
              <input
                type="file"
                onChange={handleVideoChange}
                className="form-control mt-3"
                accept="video/*"
              />
            </div>

            {/* Social Links */}
            <div className="col-md-6">
              <input
                type="text"
                placeholder="LinkedIn"
                name="linkedin"
                value={socialLinks.linkedin}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Twitter"
                name="twitter"
                value={socialLinks.twitter}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Facebook"
                name="facebook"
                value={socialLinks.facebook}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Pinterest"
                name="pinterest"
                value={socialLinks.pinterest}
                onChange={handleSocialLinkChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Instagram"
                name="instagram"
                value={socialLinks.instagram}
                onChange={handleSocialLinkChange}
              />
            </div>

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
