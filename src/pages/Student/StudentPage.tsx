import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SidebarStudent from 'pages/Student/SidebarStudent';
import ChangepasswordStu from 'pages/Student/ChangePasswordStu';
import AboutStudent from 'pages/Student/AboutStudent';
import MyCourseStudent from 'pages/Student/MyCourseStudent';
import ProfileStudent from 'pages/Student/ProfileStudent';


const StudentPage: React.FC = () => {
  return (
    <div className="flex">
    <SidebarStudent />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
          <Route path={`/`} element={<AboutStudent />} />
          <Route path={`course-student`} element={<MyCourseStudent />} />
          <Route path={`info-student`} element={<ProfileStudent />} />
          <Route path={`student-changepassword`} element={<ChangepasswordStu />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentPage;
