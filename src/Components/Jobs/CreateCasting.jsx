import React, { useState } from "react";
import { toast } from "react-toastify";
import { jwtDecode } from 'jwt-decode';
import "react-datepicker/dist/react-datepicker.css";
import "./AddResumeArea.css"; // Reuse the existing CSS file for styling

const CreateCasting = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [deadline, setDeadline] = useState(null);
  const [useDefaultQuestions, setUseDefaultQuestions] = useState(true);
  const [customQuestionsFile, setCustomQuestionsFile] = useState(null);
  const [castingImage, setCastingImage] = useState(null);
  const [useDefaultImage, setUseDefaultImage] = useState(true);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description || !location || !deadline) {
      toast.error("Please fill all the required fields");
      return;
    }
  
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token); // Use named import
    const agencyId = decodedToken.nameid; // This should be the user id - when the user is an agency
  
    if (!token) {
      toast.error("You are not authenticated. Please log in first.");
      return;
    }
  
    try {
      const formData = new FormData();
  
      // Append operations and variables
      formData.append(
        "operations",
        JSON.stringify({
          query: `
            mutation CreateCasting($input: CreateCastingInput!, $useDefaultImage: Boolean!, $image: Upload) {
                createCasting(input: $input, useDefaultImage: $useDefaultImage, image: $image) {
                    message
                }
            }               
          `,
          variables: {
            input: {
              agencyId,
              title,
              description,
              location,
              deadline,
              useDefaultQuestions,
            },
            useDefaultImage,
            image: castingImage ? null : undefined, // Don't include image if not uploaded
          },
        })
      );
  
      // Only map the image field if a file is uploaded
      if (castingImage) {
        formData.append("map", JSON.stringify({
          "2": ["variables.image"],
        }));
        formData.append("2", castingImage); // Key '2' must match the map
      } else {
        // If no image is uploaded, we can skip adding the file data
        formData.append("map", JSON.stringify({})); // Empty map for cases without image
      }
  
      const response = await fetch("https://localhost:7111/graphql", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "GraphQL-Preflight": "true",
        },
        body: formData,
      });
  
      const result = await response.json();
  
      if (result.errors) {
        toast.error(result.errors[0].message || "Failed to create casting");
      } else {
        toast.success(result.data.createCasting.message);
      }
    } catch (error) {
      toast.error("An error occurred while submitting the casting");
    }
  };
  

  const handleCastingImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCastingImage(file);
      setUseDefaultImage(false); // Set useDefaultImage to false if an image is uploaded
    } else {
      setCastingImage(null);
      setUseDefaultImage(true); // Revert to default image usage
    }
  };

  return (
    <div className="jm-post-job-area pt-95 pb-60">
      <div className="container">
        <div className="row align-items-center justify-content-center text-center">
          <div className="col-xl-8">
            <h4 className="jm-job-acc-title">Create a Casting Call</h4>
          </div>
        </div>
        <div className="jm-post-job-wrapper mb-40">
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="row">
              {/* Casting Image Preview */}
              <div className="col-xl-12 text-center mb-3">
                {castingImage && (
                  <div className="photo-preview-box">
                    <img
                      src={URL.createObjectURL(castingImage)}
                      alt="Casting Preview"
                      className="photo-preview"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCastingImageUpload}
                />
              </div>

              {/* Input Fields */}
              <div className="col-xl-6 col-md-6">
                <input
                  type="text"
                  placeholder="Casting Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="col-xl-12">
                <textarea
                  placeholder="Brief Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </div>
              <div className="col-xl-6 col-md-6">
                <div className="checkbox-wrapper">
                  <label>
                    <input
                      type="checkbox"
                      checked={useDefaultQuestions}
                      onChange={(e) => setUseDefaultQuestions(e.target.checked)}
                    />
                    Use Default Questions
                  </label>
                </div>
              </div>

              {/* Upload Custom Questions */}
              {!useDefaultQuestions && (
                <div className="col-xl-12 text-center">
                  <label>Upload Custom Questions:</label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setCustomQuestionsFile(e.target.files[0])}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="col-xl-12 text-center mt-4">
                <button
                  type="submit"
                  className="jm-post-job-btn jm-theme-btn"
                >
                  Create Casting
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateCasting;
