import React from 'react';
import { Navigate } from 'react-router-dom'; // To handle redirects
import { useAuth } from '../Context/AuthProvider'; // Adjust the path to your AuthProvider
import SearchForm from '../Components/Search Form/SearchForm';
import SidePanel from '../Components/Side Panel/SidePanel';
import Header from '../Components/Header/Header';
import HomeMain1 from '../Components/Main/HomeMain1';
import Footer from '../Components/Footer/Footer';

const HomePage1 = () => {
  const { isAuthenticated } = useAuth(); // Get the auth status from context


  console.log(isAuthenticated);
  
  // If not authenticated, redirect to the login page
  // if (!isAuthenticated) {
  //   return <Navigate to="/registerPage" />;
  // }

  // Render the HomePage1 content for logged-in users
  return (
    <>
      <SearchForm />
      <SidePanel />
      <Header />
      <HomeMain1 />
      <Footer />
    </>
  );
};

export default HomePage1;
