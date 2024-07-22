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
import ViewSession from './ViewSession';
import ManagerInstructorPurchase from './ManagerInstructorPurchase';
import ViewLesson from 'pages/Instructor/ViewLesson';
import InstructorSubscription from './SubcriptionInstructor';

const InstructorPage: React.FC = () => {
  return (
    <div className="flex">
      <div className='h-[91vh] '>
    <SidebarInstructor /></div>
      <div className="flex-grow ml-4 h-screen overflow-auto hide-scrollbar" >
        <Routes>
          <Route path={`/`} element={<DashboardInstructor />} />
          <Route path={`manager-instructor-course/`} element={<ManagerInstructor />} />
          {/* <Route path={`manager-instructor-course/view-session`} element={<ViewSession />} /> */}
          <Route path={`manager-instructor-lesson`} element={<LessonInstructor />} />
          <Route path={`manager-instructor-session`} element={<SessionInstructor />} />
          <Route path={`manager-instructor-certificate`} element={<ManagerCertificate   />} />
          <Route path={`manager-instructor-purchase`} element={<ManagerInstructorPurchase />} />
          <Route path={`instructor-subscription`} element={<InstructorSubscription />} />


          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-setting/:userId/`} element={<Setting />} />
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
