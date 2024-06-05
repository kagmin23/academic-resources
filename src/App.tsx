import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import TeacherProfile from './pages/Profile/TeacherProfile';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        
      </Routes>
    </Router>
  );
};

export default App;
