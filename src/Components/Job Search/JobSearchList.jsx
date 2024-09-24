import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { request, gql } from 'graphql-request';


const COUNTRIES_QUERY = gql`
  {
    countries {
      name
    }
  }
`;

const JobSearchList = () => {

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch countries when the component is mounted
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const data = await request('https://countries.trevorblades.com/', COUNTRIES_QUERY);
          setCountries(data.countries);
        } catch (err) {
          setError(err);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCountries();
    }, []);


// Handle loading state
if (loading) return <p>Loading...</p>;

// Handle error state
if (error) return <p>Error: {error.message}</p>;


  return (
    <div className="jm-jobs-search-under-hero">
                <div className="container">
                    <div className="jm-candidates-search-wrapper">
                        <div className="jm-candidates-search-top-text">
                            <h4 className="jm-candidates-search-title">Find Your Candidates</h4>
                        </div>
                        <div className="jm-candidates-search-wrapper-inner-flex">
                            <div className="jm-candidates-search-wrapper-inner-input-fields">
                                <div className="row">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <input type="text" placeholder="Keywords..."/>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <input type="text" placeholder="Location"/>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <select className="jm-candidates-search-select">
                                            <option>Choose Type</option>
                                            <option>Freelance</option>
                                            <option>Full Time</option>
                                            <option>Part Time</option>
                                        </select>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6">
                                        <select className="jm-candidates-search-select">
                                            <option>Choose Category</option>
                                            <option>Developer</option>
                                            <option>Medical</option>
                                            <option>Technology</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="jm-candidates-search-wrapper-inner-input-submit"><span className="jm-candidates-search-icon"><i className="fa-duotone fa-magnifying-glass"></i></span>Search</button>
                        </div>
                    </div>
                    <div className="jm-candidates-item-wrapper pt-100 pb-100">
                        <div className="row">


                        <ul>
                        {countries.map((country, index) => (
                            <div key={index} className="col-xl-12">
                            <div className="jm-latest-job-layout-3 jm-candidate-layout-list">
                                <div className="jm-latest-job-layout-3-wrapper">
                                <div className="jm-latest-job-layout-3-img">
                                    <Link to="/candidateDetailsPage">
                                    <img src="assets/img/team/9.jpg" alt="img" />
                                    </Link>
                                </div>
                                <div className="jm-latest-job-layout-3-info">
                                    <span className="jm-candidate-list-designation">HTML Developer</span>
                                    <h4 className="jm-latest-job-layout-3-info-title">
                                    <Link to="/candidateDetailsPage">
                                        {country.name}
                                    </Link>
                                    <span className="jm-candidate-rating">
                                        <i className="fa-thin fa-star"></i> 4.9
                                    </span>
                                    </h4>
                                    <div className="jm-latest-job-layout-3-info-meta">
                                    <span><i className="fa-thin fa-tags"></i> HTML, CSS3</span>
                                    <span><i className="fa-thin fa-location-dot"></i> Cupertino, USA</span>
                                    <span><i className="fa-thin fa-money-bill-1"></i> $5000 - $1000</span>
                                    <span><i className="fa-thin fa-clock"></i> Full Time</span>
                                    </div>
                                </div>
                                <div className="jm-latest-job-layout-3-submit">
                                    <Link to="/candidateDetailsPage" className="jm-latest-job-layout-3-btn">
                                    View Profile
                                    </Link>
                                </div>
                                </div>
                            </div>
                            </div>
                        ))}
                        </ul>

                           
                            

                        </div>
                    </div>
                </div>
            </div>
  )
}

export default JobSearchList