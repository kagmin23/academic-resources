import Footer from 'components/Footer';
import Dashboard from 'pages/admin/DashBoard';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import LayoutAdmin from '../../components/layout/LayoutAdmin';
import Category from './Category';
import Content from './Course';
import NewCourse from './NewCourse';
import ProfileAdmin from './ProfileAdmin';
import Report from './Report';
import Sidebar from './Sidebar';
import TransactionHistory from './TransactionHistory';

import ChangepasswordAd from 'pages/admin/ChangePasswordAd';
import ApproveInstructor from './ApproveInstructor';
import Users from './Users';

const AdminPage: React.FC = () => {
  return (
    <div>
      <LayoutAdmin/>
    <div className="flex h-5/6 mb-5 overflow-hidden ">
      <div className=''>
        <Sidebar />
      </div>
      <div className="flex-grow p-4 overflow-auto h-full bg-white rounded ">
        <Routes>
        <Route path={`/`} element={<Dashboard />} />
        <Route path={`dashboard`} element={<Dashboard />} />
          <Route path={`user`} element={<Users />} />
          <Route path={`approve-instructor`} element={<ApproveInstructor />} />
          <Route path={`course`} element={<Content />} />
          <Route path={`approve-courses`} element={<NewCourse/>}/>
          <Route path={`category`} element={<Category />} />
          <Route path={`report`} element={<Report />} />
          <Route path={`info-admin`} element={<ProfileAdmin />} />
          <Route path={`admin-changepassword`} element={<ChangepasswordAd />} />
          <Route path={`transaction-history`} element={<TransactionHistory />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
        <Outlet />
        
      </div>
      
    </div>
    <Footer/>

    </div>
  );
}

export default AdminPage;