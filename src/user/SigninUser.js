import React, { useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faUserEdit, faTrash} from '@fortawesome/free-solid-svg-icons'; // Import relevant FontAwesome icons
import Navbar from '../signinNavbar';
import { useAuth } from '../admin/AuthContext';


const SigninUser = () => {
  const location = useLocation();
  const userEmail = location.state?.userEmail;
  const userName = location.state?.userName;
  const navigate = useNavigate();
  const { userAuthenticated} = useAuth();
  const handleModifyUserClick = () => {
    navigate('/ModifyUser',{ state: { userEmail: userEmail,userName } });
  };

  const handleDeleteClick = () => {
    navigate('/DeleteUser',{ state: { userEmail: userEmail,userName} });
  };

  useEffect(() => {
    // Redirect to '/admin' if not authenticated
    if (!userAuthenticated) {
      navigate('/signin');
    }
  }, [userAuthenticated, navigate]);

  return (
    <div className="admin-container">
        <div className='navbarblock'>
     <Navbar userName={"Welcome " + userName} />
     </div>

     <div className="button-containeruser">

          {/* User Modification Button */}
          <button className="square-button" onClick={handleModifyUserClick}>
            <FontAwesomeIcon icon={faUserEdit} />&nbsp;
            <span className="button-text">User Modification</span>
          </button>

          {/* Delete Button */}
          <button className="square-button" onClick={handleDeleteClick}>
            <FontAwesomeIcon icon={faTrash} />&nbsp;
            <span className="button-text">Delete</span>
          </button>
        </div>
        <div className="imageblock">
      </div>
    </div>
  );
};

export default SigninUser;