import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { request, gql } from 'graphql-request';


const COUNTRIES_QUERY = gql`
  {
    countries {
      name
    }
  }
`;

const AboutArea = () => {

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
    <section className="jm-about-area pt-95 pb-50">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-xl-6 col-lg-7">
                    <div className="jm-about-wrap mb-50">
                        <div className="jm-section-title mb-30">
                            <span className="subtitle">Our About Us</span>
                            <h2 className="title mb-20">We Provides Best Job Solution.</h2>
                            <p className="text mb-30">There are many variations of passages of Lorem Ipsum Fasts There are 
                                many variations of passages of Lorem Ipsum.</p>
                        </div>
                        <ul>
      {countries.map((country, index) => (
        <li key={index}>{country.name}</li>
      ))}
    </ul>

                        <div className="jm-about-content mb-40">
                            <div className="jm-about-content-item">
                                <div className="jm-about-item-info mb-15">
                                    <div className="jm-about-item-icon">
                                        <span><i className="fa-thin fa-layer-group"></i></span>
                                    </div>
                                    <div className="jm-about-item-head">
                                        <h4 className="title"><a href="jobslab-service-details.html">Software Development</a></h4>
                                    </div>
                                </div>
                                <div className="jm-about-item-text">
                                    <p>There are many variations of passages of corem Ipsum.</p>
                                </div>
                            </div>
                            <div className="jm-about-content-item">
                                <div className="jm-about-item-info mb-15">
                                    <div className="jm-about-item-icon">
                                        <span><i className="fa-thin fa-copy"></i></span>
                                    </div>
                                    <div className="jm-about-item-head">
                                        <h4 className="title"><a href="jobslab-service-details.html">Service Development</a></h4>
                                    </div>
                                </div>
                                <div className="jm-about-item-text">
                                    <p>There are many variations of passages of corem Ipsum.</p>
                                </div>
                            </div>
                        </div>
                        <div className="jm-about-content-btn">
                            <Link to="/jobCategoryPage" className="jm-theme-btn">All Categories</Link>
                        </div>
                    </div>
                </div>
                <div className="col-xl-6 col-lg-5">
                    <div className="jm-about-img ml-40 mb-50">
                        <img className="jm-img-1" src="assets/img/about/home-1-about-1.jpg" alt=""/>
                        <img className="jm-img-2" src="assets/img/about/home-1-about-2.jpg" alt=""/>
                        <img className="jm-img-3" src="assets/img/about/home-1-about-3.jpg" alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default AboutArea
