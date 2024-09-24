import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Footer from '../Components/Footer/Footer';
import ServiceDetailsMain from '../Components/Main/ServiceDetailsMain';

const ServiceDetailsPage = () => {
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <ServiceDetailsMain/>
        <Footer/>
    </>
  )
}

export default ServiceDetailsPage