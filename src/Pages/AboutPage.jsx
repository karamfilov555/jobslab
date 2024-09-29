import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import AboutMain from '../Components/Main/AboutMain';
import Footer from '../Components/Footer/Footer';
import Register from '../Components/Register/Register';

const AboutPage = () => {
  return (
    <>
    <Register/>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <AboutMain/>
        <Footer/>
    </>
  )
}

export default AboutPage