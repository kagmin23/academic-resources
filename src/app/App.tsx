import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import ProfileStudent from '../pages/profile/ProfileStudent';
import ProfileInstructor from '../pages/profile/ProfileInstructor';
import Login from '../pages/register/Login';
import SignUp from '../pages/register/SignUp';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
      <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profileStudent" element={<ProfileStudent />} />
        <Route path="/profileinstructor" element={<ProfileInstructor />} />
        
      </Routes>
    </Router>
  );
};

export default App;
