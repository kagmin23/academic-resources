import ChangepasswordIns from 'pages/Instructor/ChangePasswordIns';
import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import ViewLesson from 'pages/Instructor/ViewLesson';
import Setting from 'pages/Setting';
import SubcriptionInstructor from 'pages/SubcriptionInstructor';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LessonInstructor from '../Instructor/LessonInstructor';
import ManagerInstructor from '../Instructor/ManagerInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import ManagerCertificate from './ManagerCertificate';
import ManagerInstructorPurchase from './ManagerInstructorPurchase';
import SessionInstructor from './SessionInstructor';
import ViewSession from './ViewSession';

const InstructorPage: React.FC = () => {
  return (
    <div className="flex">
      <div className='h-[91vh] '>
    <SidebarInstructor /></div>
      <div className="flex-grow h-screen ml-4 overflow-auto hide-scrollbar" >
        <Routes>
          <Route path={`/`} element={<DashboardInstructor />} />
          <Route path={`manager-instructor-course/`} element={<ManagerInstructor />} />
          {/* <Route path={`manager-instructor-course/view-session`} element={<ViewSession />} /> */}
          <Route path={`manager-instructor-lesson`} element={<LessonInstructor />} />
          <Route path={`manager-instructor-session`} element={<SessionInstructor />} />
          <Route path={`manager-instructor-certificate`} element={<ManagerCertificate   />} />
          <Route path={`manager-instructor-purchase`} element={<ManagerInstructorPurchase />} />

          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-setting/:userId/`} element={<Setting />} />
          <Route path={`instructor-changepassword`} element={<ChangepasswordIns />} />
          {/* <Route path={`view-session`} element={<ViewSession/>}/> */}
          
          <Route path={`view-session/:courseId/`} element={<ViewSession />} />
          {/* <Route path={`manager-lession/:sessionId`} element={<ManagerLession/>}/>  */}
          <Route path={`view-session/:courseId/manager-lession/:sessionId`} element={<ViewLesson/>}/>
          <Route path={`subcription-instructor`} element={<SubcriptionInstructor/>}/>
          
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default InstructorPage;
