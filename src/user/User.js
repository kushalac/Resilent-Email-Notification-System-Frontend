import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus,faSignInAlt } from '@fortawesome/free-solid-svg-icons';

const User = () => {
  const navigate = useNavigate();

  const handleSignupClick = () => {
    navigate('/Signup');
  };

  const handleSigninClick = () => {
    navigate('/Signin');
  };

  return (
    <div className="admin-container">
      <div className='navbarblock'>
      <Navbar />
      </div>
     
      <div className="button-containeruser">
          {/* Signup Button */}
          <button className="square-button" onClick={handleSignupClick}>
            <FontAwesomeIcon icon={faUserPlus} />&nbsp;
            <span className="button-text">Signup</span>
          </button>

        <button className="square-button" onClick={handleSigninClick}>
        <FontAwesomeIcon icon={faSignInAlt} />&nbsp;
            <span className="button-text">Signin</span>
          </button>
        </div>
        <div className="imageblock"></div>
    </div>
  );
};

export default User;

