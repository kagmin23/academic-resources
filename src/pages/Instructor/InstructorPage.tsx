import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import Setting from 'pages/Setting';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LessonInstructor from '../Instructor/LessonInstructor';
import ManagerInstructor from '../Instructor/ManagerInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import ChangepasswordIns from 'pages/Instructor/ChangePasswordIns';


const InstructorPage: React.FC = () => {
  return (
    <div className="flex">
    <SidebarInstructor />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
          <Route path={`/`} element={<DashboardInstructor />} />
          <Route path={`manager-instructor-course`} element={<ManagerInstructor />} />
          <Route path={`manager-instructor-lesson`} element={<LessonInstructor />} />
          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-changepassword`} element={<ChangepasswordIns />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default InstructorPage;
