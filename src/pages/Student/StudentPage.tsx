import AboutStudent from 'pages/Student/AboutStudent';
import Certificate from 'pages/Student/Certificate';
import ChangepasswordStu from 'pages/Student/ChangePasswordStu';
import ProfileStudent from 'pages/Student/EditProfileStudent';
import MyCourseStudent from 'pages/Student/MyCourseStudent';
import SidebarStudent from 'pages/Student/SidebarStudent';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerStudentPurchase from './PurchasesStudent';
import SubcriptionStudent from './SubcriptionStudent';
const StudentPage: React.FC = () => {
  return (
    <div className="flex ">
      <div  className='h-[91vh] pb-3'>

    <SidebarStudent /></div>
      {/* <div className="flex-grow p-4 bg-white rounded shadow-md"> */}
      <div className="flex-grow h-screen ml-4 overflow-auto hide-scrollbar ">
        <Routes>
          <Route path={`/`} element={<AboutStudent />} />
          <Route path={`course-student`} element={<MyCourseStudent />} />
          <Route path={`info-student`} element={<ProfileStudent />} />
          <Route path={`info-student/:userId/`} element={<ProfileStudent />} />
          <Route path={`student-changepassword`} element={<ChangepasswordStu />} />
          <Route path={`certificate-student`} element={<Certificate />} />
          <Route path={`manager-student-purchase`} element={<ManagerStudentPurchase />} />
          <Route path={`subcription-student`} element={<SubcriptionStudent />} />
        </Routes>
      </div>
    </div>
  );
}

export default StudentPage;
