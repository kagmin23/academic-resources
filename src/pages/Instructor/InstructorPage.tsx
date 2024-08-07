import ChangepasswordIns from 'pages/Instructor/ChangePasswordIns';
import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import ViewLesson from 'pages/Instructor/ViewLesson';
import Setting from 'pages/Setting';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerInstructor from '../Instructor/ManagerInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import ManagerLessonInstructor from './LessonInstructor';
import ManagerReview from './ManagerReview';
import PayoutInstructor from './PayoutInstructor';
import ManagerInstructorPurchase from './PurchasesInstructor';
import SessionInstructor from './SessionInstructor';
import SubcriptionInstructor from './SubcriptionInstructor';
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
          <Route path={`manager-instructor-lesson`} element={<ManagerLessonInstructor />} />
          <Route path={`manager-instructor-session`} element={<SessionInstructor />} />
          <Route path={`manager-instructor-purchase`} element={<ManagerInstructorPurchase />} />

          <Route path={`instructor-setting`} element={<Setting />} />
          <Route path={`instructor-setting/:userId/`} element={<Setting />} />
          <Route path={`instructor-changepassword`} element={<ChangepasswordIns />} />
          {/* <Route path={`view-session`} element={<ViewSession/>}/> */}
          
          <Route path={`manager-instructor-course/:courseId/manager-session/`} element={<ViewSession />} />
          <Route path={`manager-instructor-course/:courseId/manager-session/:sessionId/manager-lesson`} element={<ViewLesson/>}/>
          {/* <Route path={`view-session/:courseId/manager-lession/:sessionId`} element={<ViewLesson/>}/> */}
          <Route path={`manager-subcription-instructor`} element={<SubcriptionInstructor />}/>
          <Route path={`manager-instructor-payout`} element={<PayoutInstructor />}/>
          <Route path={`manager-review-instructor`} element={<ManagerReview />}/>
          
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
};

export default InstructorPage;