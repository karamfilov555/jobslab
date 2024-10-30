import React from 'react'
import SearchForm from "../Components/Search Form/SearchForm";
import SidePanel from "../Components/Side Panel/SidePanel";
import Header2 from "../Components/Header/Header2";
import Footer from '../Components/Footer/Footer';
import JobDetailsMain from '../Components/Main/JobDetailsMain';
import { useParams } from 'react-router-dom';

const JobDetailsPage = () => {
  const { id } = useParams();
  return (
    <>
        <SearchForm/>
        <SidePanel/>
        <Header2/>
        <JobDetailsMain jobId={id} />
        <Footer/>
    </>
  )
}

export default JobDetailsPage