import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { JobContext } from '../../Context/JobContext';
import { useAuth } from '../../Context/AuthProvider';

const Header = () => {
  const { handleOpenForm, isSticky, handleOpen } = useContext(JobContext);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => { 
    console.log('Authentication state changed:', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <header className="header-transparent">
      <div className={`jm-header-area header-sticky ${isSticky ? 'sticky' : ''}`}>
        <div className="container">
          <div className="jm-header-top d-none d-md-block">
            <div className="row align-items-center">
              <div className="col-xl-7 col-md-8">
                <div className="jm-header-top-cta">
                  <span><i className="fas fa-map-marker-alt"></i>27/52 Avenue, NY USA 685.</span>
                  <span><i className="fal fa-clock"></i>Mon - Sat 8.00 - 18.00.</span>
                </div>
              </div>
              <div className="col-xl-5 col-md-4">
                <div className="jm-header-top-social">
                  <Link to="#"><i className="fab fa-facebook-f"></i></Link>
                  <Link to="#"><i className="fab fa-pinterest-p"></i></Link>
                  <Link to="#"><i className="fab fa-twitter"></i></Link>
                  <Link to="#"><i className="fab fa-instagram"></i></Link>
                </div>  
              </div>
            </div>
          </div>
          <div className="jm-header-main jm-header-padding">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-3 col-7">
                <div className="jm-header-logo">
                  <Link className="jm-logo" to="/">
                    <img src="assets/img/logo/logo.png" alt="Image Not Found" />
                  </Link>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block">
                <div className="jm-header-main-menu text-center">
                  <nav className="jm-mobile-menu" id="jm-mobile-menu">
                    <ul>
                      <li className="menu-has-children">
                        <Link to="/">Home</Link>
                        <ul className="sub-menu">
                          <li><Link to="/">Home 1</Link></li>
                        </ul>
                      </li>
                      {/* Other menu items */}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-5">
                <div className="jm-header-right text-end d-flex align-items-center justify-content-end">
                  <Link
                    to="#"
                    className="jm-search d-none d-lg-block jm-header-action-search"
                    role="button"
                    onClick={handleOpenForm}
                  >
                    <i className="fal fa-search"></i>
                  </Link>
                  <Link to="/candidateDetailsPage" className="jm-user">
                    <i className="fal fa-user"></i>
                  </Link>
                  {/* Conditional rendering based on authentication status */}
                  {isAuthenticated ? (
                    <>
                      <Link to="/profilePage" className="jm-theme-btn d-none d-lg-block">
                        Profile
                      </Link>
                      <button
                        className="jm-theme-btn d-none d-lg-block"
                        onClick={logout}
                        style={{ marginLeft: '10px' }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/registerPage" className="jm-theme-btn d-none d-lg-block">
                        Register
                      </Link>
                      <Link to="/loginPage" className="jm-theme-btn d-none d-lg-block" style={{ marginLeft: '10px' }}>
                        Login
                      </Link>
                    </>
                  )}
                  <div
                    className="jm-navbar-mobile-sign side-toggle d-lg-none d-inline-block"
                    role="button"
                    onClick={handleOpen}
                  >
                    <span className="dr-line-1"></span>
                    <span className="dr-line-2"></span>
                    <span className="dr-line-3"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
