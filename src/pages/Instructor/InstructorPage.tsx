import ChangepasswordIns from 'pages/Instructor/ChangePasswordIns';
import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import ViewLesson from 'pages/Instructor/ViewLesson';
import Setting from 'pages/Setting';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LessonInstructor from '../Instructor/LessonInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import ManagerInstructor from './CourseInstructor';
import ManagerCertificate from './ManagerCertificate';
import SessionInstructor from './SessionInstructor';
import ViewSession from './ViewSession';

const InstructorPage: React.FC = () => {
  return (
    <div className="flex h-lvh">
      <div className='overflow-hidden'>
    <SidebarInstructor />
    </div>
      <div className="flex-grow min-h-screen w-[1024px] overflow-y-auto ml-4">
        <Routes>
          <Route path={`/`} element={<DashboardInstructor />} />
          <Route path={`manager-instructor-course/`} element={<ManagerInstructor />} />
          {/* <Route path={`manager-instructor-course/view-session`} element={<ViewSession />} /> */}
          <Route path={`manager-instructor-lesson`} element={<LessonInstructor />} />
          <Route path={`manager-instructor-session`} element={<SessionInstructor />} />
          <Route path={`manager-instructor-certificate`} element={<ManagerCertificate   />} />
          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-changepassword`} element={<ChangepasswordIns />} />
          {/* <Route path={`view-session`} element={<ViewSession/>}/> */}
          
          <Route path={`view-session/:courseId/`} element={<ViewSession />} />
          {/* <Route path={`manager-lession/:sessionId`} element={<ManagerLession/>}/>  */}
          <Route path={`view-session/:courseId/manager-lession/:sessionId`} element={<ViewLesson/>}/> 
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default InstructorPage;
