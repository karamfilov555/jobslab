import { BrowserRouter as Router,Routes,Route,useLocation } from "react-router-dom"
import HomePage1 from "./Pages/HomePage1"
import JobPage from "./Pages/JobPage"
import CandidatePage from "./Pages/CandidatePage"
import AboutPage from "./Pages/AboutPage"
import BlogPage from "./Pages/BlogPage"
import BlogListPage from "./Pages/BlogListPage"
import BlogDetailsPage from "./Pages/BlogDetailsPage"
import ServicePage from "./Pages/ServicePage"
import ServiceDetailsPage from "./Pages/ServiceDetailsPage"
import ErrorPage from "./Pages/ErrorPage"
import ContactPage from "./Pages/ContactPage"
import CandidateListPage from "./Pages/CandidateListPage"
import CandidateDetailsPage from "./Pages/CandidateDetailsPage"
import HomePage2 from "./Pages/HomePage2"
import JobListPage from "./Pages/JobListPage"
import JobDetailsPage from "./Pages/JobDetailsPage"
import JobCategoryPage from "./Pages/JobCategoryPage"
import EmployerListPage from "./Pages/EmployerListPage"
import EmployerGridPage from "./Pages/EmployerGridPage"
import CompanyDetailsPage from "./Pages/CompanyDetailsPage"
import PostJobPage from "./Pages/PostJobPage"
import AddResumePage from "./Pages/AddResumePage"
import { useEffect } from "react"

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation();
  
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  
    return null;
  };
  return (
   <Router>
    <ScrollToTop/>
      <Routes>
          <Route path="/" element={<HomePage1/>}/>
          <Route path="/homePage2" element={<HomePage2/>}/>
          <Route path="/jobPage" element={<JobPage/>}/>
          <Route path="/jobListPage" element={<JobListPage/>}/>
          <Route path="/jobDetailsPage" element={<JobDetailsPage/>}/>
          <Route path="/jobCategoryPage" element={<JobCategoryPage/>}/>
          <Route path="/employerListPage" element={<EmployerListPage/>}/>
          <Route path="/employerGridPage" element={<EmployerGridPage/>}/>
          <Route path="/companyDetailsPage" element={<CompanyDetailsPage/>}/>
          <Route path="/postJobPage" element={<PostJobPage/>}/>
          <Route path="/addResumePage" element={<AddResumePage/>}/>
          <Route path="/candidatePage" element={<CandidatePage/>}/>
          <Route path="/aboutPage" element={<AboutPage/>}/>
          <Route path="/blogPage" element={<BlogPage/>}/>
          <Route path="/blogListPage" element={<BlogListPage/>}/>
          <Route path="/blogDetailsPage" element={<BlogDetailsPage/>}/>
          <Route path="/servicePage" element={<ServicePage/>}/>
          <Route path="/serviceDetailsPage" element={<ServiceDetailsPage/>}/>
          <Route path="/contactPage" element={<ContactPage/>}/>
          <Route path="/candidateListPage" element={<CandidateListPage/>}/>
          <Route path="/candidateDetailsPage" element={<CandidateDetailsPage/>}/>
          <Route path="*" element={<ErrorPage/>}/>
      </Routes>
   </Router>
  )
}

export default App
