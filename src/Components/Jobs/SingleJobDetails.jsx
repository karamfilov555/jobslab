import { Link, useNavigate } from 'react-router-dom';
import JobVideoModal from './JobVideoModal';
import AccordionSection from './AccordionSection';
import React, { useEffect, useState } from 'react';
import CountdownTimer from "../Category Area/CountDownTimer";
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';

const castingDetailsQuery = `
    query {
        castingDetails(castingId: $id) {
            id
            title
            description
            imageUrl
            deadline
            location
            isQuickAccess
        }
    }
`;



const SingleJobDetails = ({ jobId }) => {
    const [casting, setCasting] = useState([]);
    const navigate = useNavigate();

    const query = castingDetailsQuery.replace('$id', `${jobId}`);

    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token); // Use named import
    const userId = decodedToken.nameid;

    const userProfileQuery = `
        query {
                isUserProfileCompleted(userId: "${userId}")
        }
    `;
    useEffect(() => {
        const fetchCastings = async () => {
            try {
               
                const response = await fetch("https://localhost:7111/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ query }),
                });

                const result = await response.json();
                if (response.ok) {
                    setCasting(result.data.castingDetails);
                } else {
                    throw new Error("Failed to fetch data.");
                }
            } catch (error) {
                console.error("Network error:", error.message);
            }
        };

        fetchCastings();
    }, [query]);

    const handleApplyClick = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem("token");

            const response = await fetch("https://localhost:7111/graphql", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ query: userProfileQuery }),
            });

            const result = await response.json();

            if (response.ok) {
                const isProfileComplete = result.data.isUserProfileCompleted;

                if (isProfileComplete) {
                    if(casting.isQuickAccess)
                    {
                        var quickApplyQuery = `
                            mutation{
                                applyForCasting(castingId: ${jobId}, userId: "${userId}", isQuickAccess: true)
                                {
                                    message
                                }
                            }
                        `;
                        
                        const response = await fetch("https://localhost:7111/graphql", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                            body: JSON.stringify({ query: quickApplyQuery }),
                        });
            
                        const result = await response.json();

                        toast.success("successfully submited");
                    }
                    else
                    {
                        navigate("/applyForCastingPage", { state: { jobId } });
                    }
                } else {
                    toast.warning("Please complete your profile before applying.");
                    navigate("/profilePage")
                }
            } else {
                throw new Error("Failed to check profile completion.");
            }
        } catch (error) {
            console.error("Error checking profile completion:", error.message);
        }
    };

    return (
        <div className="container">
            <div className="jm-job-wrap pt-100 pb-60">
                <div className="row">
                    <div className="col-xl-8 col-lg-8">
                        <div className="jm-job-content-wrapp">
                            <img className="w-100 mb-40" src={casting.imageUrl} alt="img" />
                            <div className="jm-job-content-title-wrapper mb-35">
                                <div className="jm-job-content-title-text-wrapp">
                                    <div className="jm-job-content-title-text">
                                        <div className="jm-job-content-title-img">
                                            <img src={casting.imageUrl} alt="img" />
                                        </div>
                                        <div className="jm-job-content-title-bottom">
                                            <h4 className="jm-job-content-title">{casting.title}</h4>
                                            <span className="jm-job-content-title-meta"><i className="fa-thin fa-user"></i> 11 Vacancies</span>
                                            <span className="jm-job-content-title-rating">
                                                <span className="jm-job-rating-text">5</span>
                                                <i className="fa-thin fa-star"></i>
                                                <i className="fa-thin fa-star"></i>
                                                <i className="fa-thin fa-star"></i>
                                                <i className="fa-thin fa-star"></i>
                                                <i className="fa-thin fa-star"></i>
                                            </span>
                                        </div>
                                    </div>

                                    <div className="jm-job-content-title-favour-icon">
                                        <Link to="#"><i className="fa-thin fa-heart"></i></Link>
                                        <Link to="#"><i className="fa-thin fa-gear"></i></Link>
                                    </div>
                                </div>
                            </div>
                            <div className="jm-job-content-bottom-info-wrapper mb-25">
                                <div className="jm-job-content-bottom-info-single">
                                    <label>Experience : </label>
                                    <span>Minimum 1 Year</span>
                                </div>
                                <div className="jm-job-content-bottom-info-single">
                                    <label>Employee Type : </label>
                                    <span>Full Time</span>
                                </div>
                                <div className="jm-job-content-bottom-info-single">
                                    <label>Position : </label>
                                    <span>Senior</span>
                                </div>
                                <div className="jm-job-content-bottom-info-single">
                                    <label>Offer Salary : </label>
                                    <span>$1500 - $2500</span>
                                </div>
                            </div>

                            <div className="jm-job-content-informations-wrapper "> 
                                <AccordionSection />
                                <div className="row align-items-center mb-15">
                                    <div className="col-xl-7 col-lg-7 col-md-7">
                                        <div className="jm-job-content-info-skill-meta text-center text-md-start mb-15">
                                            <label>Skills :</label>
                                            <Link to="#">WordPress</Link>
                                            <Link to="#">PHP</Link>
                                        </div>
                                    </div>
                                    <div className="col-xl-5 col-lg-5 col-md-5">
                                        <div className="jm-job-content-share text-center text-md-end mb-15">
                                            <label>Share :</label>
                                            <Link to="#"><i className="fa-brands fa-facebook-f"></i></Link>
                                            <Link to="#"><i className="fa-brands fa-twitter"></i></Link>
                                            <Link to="#"><i className="fa-brands fa-linkedin-in"></i></Link>
                                            <Link to="#"><i className="fa-brands fa-instagram"></i></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Jobs */}
                            <div className="jm-related-jobs-inner mb-40">
                                <h4 className="jm-related-job-title">Related Castings</h4>
                                {/* Example related jobs */}
                                <div className="jm-latest-job-layout-3">
                                    <div className="jm-latest-job-layout-3-wrapper">
                                        <div className="jm-latest-job-layout-3-img">
                                            <img src="assets/img/job/starbuck.png" alt="apple" />
                                        </div>
                                        <div className="jm-latest-job-layout-3-info">
                                            <h4 className="jm-latest-job-layout-3-info-title"><Link to="/jobDetailsPage">Software Solution Ltd</Link></h4>
                                            <div className="jm-latest-job-layout-3-info-meta">
                                                <span><i className="fa-thin fa-tags"></i>WordPress, Java</span>
                                                <span><i className="fa-thin fa-location-dot"></i>Cupertino, USA</span>
                                                <span><i className="fa-thin fa-money-bill-1"></i>$35000 - $40000</span>
                                                <span><i className="fa-thin fa-clock"></i>Full Time</span>
                                            </div>
                                        </div>
                                        <div className="jm-latest-job-layout-3-submit">
                                            <Link to="/postJobPage" className="jm-latest-job-layout-3-btn">Apply Now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-4">
                        <div className="jm-job-sidebar ml-40">
                            <div className="jm-job-sidebar-widget mb-40">
                                <div className="jm-job-sidebar-inner">
                                    <h3 className="jm-job-sidebar-widget-title">Casting Overview</h3>
                                </div>
                                <div className="jm-job-sidebar-inner-content">
                                    <JobVideoModal />
                                    <ul className="jm-job-sidebar-review-list mb-15">
                                        <li><i className="fa-thin fa-house-blank"></i> <span className="jm-job-review-label">Title : </span> {casting.title}</li>
                                        <li><i className="fa-thin fa-heart"></i> <span className="jm-job-review-label">Experience : </span> 02 Years</li>
                                        <li><i className="fa-thin fa-location-crosshairs"></i> <span className="jm-job-review-label">Location : </span>{casting.location}</li>
                                        <li><i className="fa-thin fa-sack-dollar"></i> <span className="jm-job-review-label">Salary : </span> $15000 - $30000</li>
                                        <li><i className="fa-thin fa-graduation-cap"></i> <span className="jm-job-review-label">Qualification : </span> Bachelor Degree</li>
                                        <li><i className="fa-thin fa-building"></i> <span className="jm-job-review-label">Industry : </span> Private</li>
                                        <li><i className="fa-thin fa-timer"></i> <span className="jm-job-review-label">Deadline : </span> <CountdownTimer deadline={casting.deadline} /></li>
                                    </ul>
                                    <div className="jm-job-sidebar-overview-buttons">
                                        <a href="#" onClick={handleApplyClick} className="jm-job-overview-btn"> Apply Now <i className="fa-thin fa-arrow-right-long"></i></a>
                                        <Link to="#" className="jm-job-overview-btn job-bookmark"><i className="fa-thin fa-bookmark"></i> Add Bookmark</Link>
                                    </div>
                                </div>
                            </div>
                            {/* Other sidebar widgets */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SingleJobDetails;
