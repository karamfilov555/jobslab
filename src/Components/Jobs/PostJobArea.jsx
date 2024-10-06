import React, { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';  // Using axios for multipart GraphQL request

const PostJobArea = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [emailUrl, setEmailUrl] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobCategory, setJobCategory] = useState('');
  const [expectedSalary, setExpectedSalary] = useState('');
  const [previousExperience, setPreviousExperience] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [companyVideoUrl, setCompanyVideoUrl] = useState('');
  const [linkedinUsername, setLinkedinUsername] = useState('');
  const [twitterUsername, setTwitterUsername] = useState('');
  const [facebookUsername, setFacebookUsername] = useState('');
  const [pinterestUsername, setPinterestUsername] = useState('');
  const [instagramUsername, setInstagramUsername] = useState('');
  const [companyDescription, setCompanyDescription] = useState('');

  // For file upload
  const [featuredImage, setFeaturedImage] = useState(null); 
  const [companyLogo, setCompanyLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    // Construct GraphQL request using FormData for file upload
    const formData = new FormData();
    formData.append('operations', JSON.stringify({
      query: `
        mutation uploadImage($file: Upload!, $userId: String!) {
          uploadImage(file: $file, userId: $userId) {
            message
          }
        }
      `,
      variables: { file: null, userId: "cfa7c44a-daca-4790-85b2-beb92878929e" }
    }));

    // Map for file uploads (featuredImage and companyLogo if present)
    const map = {
      0: ['variables.file']
    };

    formData.append('map', JSON.stringify(map));

    // Attach the image file to the formData
    if (featuredImage) {
      formData.append(0, featuredImage);
    } else if (companyLogo) {
      formData.append(0, companyLogo);
    }

    try {
      const response = await axios.post(
        'https://localhost:7111/graphql',  // Replace with your GraphQL endpoint
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'GraphQL-Preflight': 'true',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJjZmE3YzQ0YS1kYWNhLTQ3OTAtODViMi1iZWI5Mjg3ODkyOWUiLCJ1bmlxdWVfbmFtZSI6ImthcmFtZmlsb3Y1NTVAZ21haWwuY29tIiwibmJmIjoxNzI4MjE4NDA3LCJleHAiOjE3MjgyMjIwMDcsImlhdCI6MTcyODIxODQwN30.zYiTi6Zwaw-FLEu48x9ygyIGJdAYFSYgE7Djb3AFpQs'
          },
        }
      );

      const { data } = response;
      if (data.errors) {
        toast.error('Error: ' + data.errors[0].message);
      } else {
        toast.success(data.data.uploadImage.message || 'Job posted successfully');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('An error occurred while uploading the image.');
    }

    // Reset form fields after successful submission
    setJobTitle('');
    setEmailUrl('');
    setJobLocation('');
    setJobType('');
    setJobCategory('');
    setExpectedSalary('');
    setPreviousExperience('');
    setJobDescription('');
    setCompanyName('');
    setCompanyWebsite('');
    setCompanyVideoUrl('');
    setLinkedinUsername('');
    setTwitterUsername('');
    setFacebookUsername('');
    setPinterestUsername('');
    setInstagramUsername('');
    setCompanyDescription('');
    setFeaturedImage(null);  // Reset featured image
    setCompanyLogo(null);    // Reset company logo
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <form onSubmit={handleSubmit}>
          {/* Job Info Fields */}
          <input type="file" onChange={(e) => setFeaturedImage(e.target.files[0])} />
          {/* Other job info inputs */}
          
          {/* Company Info Fields */}
          <input type="file" onChange={(e) => setCompanyLogo(e.target.files[0])} />
          {/* Other company info inputs */}
          
          <button type="submit" className="jm-post-job-btn jm-theme-btn">Post A Job</button>
        </form>
      </div>
    </div>
  );
};

export default PostJobArea;