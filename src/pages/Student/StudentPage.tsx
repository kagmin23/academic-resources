import AboutStudent from 'pages/Student/AboutStudent';
import Certificate from 'pages/Student/Certificate';
import ChangepasswordStu from 'pages/Student/ChangePasswordStu';
import MyCourseStudent from 'pages/Student/MyCourseStudent';
import ProfileStudent from 'pages/Student/ProfileStudent';
import SidebarStudent from 'pages/Student/SidebarStudent';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerStudentPurchase from './ManagerPurchase';

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
          <Route path={`certificate-student`} element={<Certificate />} />
          <Route path={`manager-student-purchase`} element={<ManagerStudentPurchase />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentPage;
