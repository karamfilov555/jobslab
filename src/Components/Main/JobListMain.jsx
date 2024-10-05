import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import BrowseJobsList from '../Browse Jobs/BrowseJobsList';

const JobListMain = () => {
  const [castings, setCastings] = useState([]); // State to store castings data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    // Function to fetch castings from GraphQL API
    const fetchCastings = async () => {
      const token = localStorage.getItem('token'); // Retrieve token from local storage

      if (!token) {
        setError("No token found. Please login first.");
        return;
      }

      // Decode the JWT to get user details
      const decodedToken =  jwtDecode(token);
      const userId = decodedToken.nameid; // Extract the 'nameid' from the token

      console.log("Decoded User ID:", userId);

      // Your updated GraphQL query using the decoded user ID
      const query = `
        query {
          myApplications(userId: "${userId}") {
            description
            title
            id        
          }
        }
      `;

      try {
        const response = await fetch("https://localhost:7111/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}` // Attach token to request
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          setError(result.errors[0].message);
        } else {
          setCastings(result.data.myApplications); // Set applications data to state
        }
      } catch (err) {
        setError("Network error: " + err.message);
      }
    };

    fetchCastings();
  }, []); // Runs once when component mounts

  return (
    <main>
      <Breadcrumb topic={"Applications"} topicSpan={"My Applications"} />

      {error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <BrowseJobsList castings={castings} /> // Pass applications data as props to BrowseJobsList
      )}
    </main>
  );
};

export default JobListMain;
