import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import HomePageMain2 from '../Components/Main/HomePageMain2';
import Footer2 from '../Components/Footer/Footer2';
import { useAuth } from '../Context/AuthProvider';
import { Navigate } from 'react-router-dom'; 

const HomePage2 = () => {
  const { isAuthenticated } = useAuth(); // Get the auth status from context
  
  console.log(isAuthenticated);
  
  // If not authenticated, redirect to the login page
   if (!isAuthenticated) {
     return <Navigate to="/" />;
   }

  return (
    <>
    <Header2/>
    <HomePageMain2/>
    <Footer2/>
</>
  )
}

export default HomePage2