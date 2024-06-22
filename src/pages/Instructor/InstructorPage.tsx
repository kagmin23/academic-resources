import ChangepasswordIns from 'pages/Instructor/ChangePasswordIns';
import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import Setting from 'pages/Setting';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LessonInstructor from '../Instructor/LessonInstructor';
import ManagerInstructor from '../Instructor/ManagerInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import ManagerCertificate from './ManagerCertificate';
import SessionInstructor from './SessionInstructor';


const InstructorPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      <div className='h-[89vh]'>
    <SidebarInstructor /></div>
      <div className="flex-grow ml-4  ">
        <Routes>
          <Route path={`/`} element={<DashboardInstructor />} />
          <Route path={`manager-instructor-course`} element={<ManagerInstructor />} />
          <Route path={`manager-instructor-lesson`} element={<LessonInstructor />} />
          <Route path={`manager-instructor-session`} element={<SessionInstructor />} />
          <Route path={`manager-instructor-certificate`} element={<ManagerCertificate   />} />
          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-changepassword`} element={<ChangepasswordIns />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default InstructorPage;
