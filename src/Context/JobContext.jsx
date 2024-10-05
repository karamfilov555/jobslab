import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // Updated import

const JobContext = createContext();

const JobContextProvider = ({ children }) => {
  // Search Form
  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleOpenForm = () => setIsFormOpen(true);
  const handleCloseForm = () => setIsFormOpen(false);

  // SidePanel
  const [sidePanelOpen, setSidePanelOpen] = useState(false);
  const handleOpen = () => setSidePanelOpen(true);
  const handleClose = () => setSidePanelOpen(false);

  // Sticky Navbar
  const [isSticky, setIsSticky] = useState(false);
  useEffect(() => {
    let timeoutId;
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSticky(window.scrollY > 0);
      }, 200); // Delay of 200 milliseconds
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Jobs
  const [jobs, setJobs] = useState([]); // State to hold jobs
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found. Please login first.");
        return;
      }

      const decodedToken = jwtDecode(token); // Use named import
      const userId = decodedToken.nameid;

      const query = `
        query {
          myApplications(userId: "${userId}") {
            id
            title
            description
          }
        }
      `;

      try {
        const response = await fetch("https://localhost:7111/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ query }),
        });

        const result = await response.json();

        if (result.errors) {
          console.error(result.errors[0].message);
        } else {
          const fetchedJobs = result.data.myApplications.map(application => ({
            id: application.id,
            imgSrc: 'path/to/default/image.jpg', // Default image
            jobTitle: application.title,
            company: 'Default Company', // Mocked value
            location: 'Default Location', // Mocked value
            salary: 5000, // Mocked value
            postedTime: 'Just now', // Mocked value
            jobTime: 'Full Time', // Mocked value
            vacancies: 1, // Mocked value
            description: application.description,
          }));

          setJobs(fetchedJobs);
          setFilteredJobs(fetchedJobs); // Initialize filteredJobs with fetched data
        }
      } catch (err) {
        console.error("Network error: " + err.message);
      }
    };

    fetchJobs(); // Call the function to fetch jobs
  }, []); // Empty dependency array to run once on mount

  // Jobs Filter
  const filterJobsByTime = (selectedTimes) => {
    if (selectedTimes.length === 0) {
      setFilteredJobs(jobs);
    } else {
      const filtered = jobs.filter((job) => selectedTimes.includes(job.jobTime));
      setFilteredJobs(filtered);
    }
  };
  const [selectedTimes, setSelectedTimes] = useState([]);

  const handleJobTimeSelect = (event) => {
    const { value, checked } = event.target;
    let updatedTimes = [...selectedTimes];

    if (checked) {
      updatedTimes.push(value);
    } else {
      updatedTimes = updatedTimes.filter((time) => time !== value);
    }

    setSelectedTimes(updatedTimes);
    filterJobsByTime(updatedTimes);
  };

  // Modal 
  const [showModal, setShowModal] = useState(false);
  const handleCloseModal = () => setShowModal(false);
  const handleOpenModal = () => setShowModal(true);

  // Employer Filter
  const [selectedJobType, setSelectedJobType] = useState('');

  const handleJobTypeChange = (event) => {
    setSelectedJobType(event.target.value);
  };

  const filteredEmployer = jobs.filter(
    (job) => selectedJobType === '' || job.jobTime === selectedJobType
  );

  return (
    <JobContext.Provider value={{ 
      isFormOpen, 
      handleOpenForm, 
      handleCloseForm,
      isSticky, 
      filteredJobs, 
      filterJobsByTime,
      handleJobTimeSelect,
      showModal,
      handleCloseModal,
      handleOpenModal,
      handleJobTypeChange,
      filteredEmployer,
      selectedJobType,
      sidePanelOpen,
      handleOpen,
      handleClose,
      }}>
      {children}
    </JobContext.Provider>
  );
};

export { JobContext, JobContextProvider };
