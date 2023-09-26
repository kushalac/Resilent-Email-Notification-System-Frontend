import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import User from './user/User';
import ModifyUser from './user/ModifyUser';
import DeleteUser from './user/DeleteUser';
import Signup from './user/Signup';
import Signin from './user/Signin';
import SigninUser from './user/SigninUser';
import Admin from './admin/Admin';
import CreateNotification from './admin/CreateNotification';
import UpdateNotification from './admin/UpdateNotification';
import SendNotification from './admin/SendNotification';
import DeleteNotification from './admin/DeleteNotification';
import { AuthProvider } from './admin/AuthContext'; // Import the AuthProvider
import Dashboard from './admin/Dashboard';
import ErrorBoundary from './ErrorBoundary';


function App() {
  return (
    <Router>
      <AuthProvider> {/* Wrap the entire app with AuthProvider */}
      <ErrorBoundary>
        <Routes>
          <Route path="/Admin" element={<Admin />} />
          <Route path="/CreateNotification" element={<CreateNotification />} />
          <Route path="/UpdateNotification" element={<UpdateNotification />} />
          <Route path="/SendNotification" element={<SendNotification />} />
          <Route path="/DeleteNotification" element={<DeleteNotification />} />
          <Route path="/User" element={<User />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/SigninUser" element={<SigninUser />} />
          <Route path="/ModifyUser" element={<ModifyUser />} />
          <Route path="/DeleteUser" element={<DeleteUser />} />
          <Route path="/Dashboard" element={<Dashboard />} /> 
          <Route path="/" element={<Homepage />} />
        </Routes>
        </ErrorBoundary>
      </AuthProvider>
    </Router>
  );
}

export default App;