import Footer from 'components/Footer';
import Dashboard from 'pages/admin/DashBoard';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import LayoutAdmin from '../../components/layout/LayoutAdmin';
import Content from './Course';
import ProfileAdmin from './ProfileAdmin';
import TransactionHistory from './Purchase';
import Sidebar from './Sidebar';

import ChangepasswordAd from 'pages/admin/ChangePasswordAd';
import ApproveInstructor from './ApproveInstructor';
import CategoryAdmin from './Category';
import Payout from './Payout';
import ReportAdmin from './Report';
import UsersAdmin from './Users';


const AdminPage: React.FC = () => {

  // const LayoutAdmin = React.lazy(() => import("../../components/layout/LayoutAdmin"));
  // const Dashboard = React.lazy(() => import("../admin/DashBoard"));
  // const Users = React.lazy(() => import("../admin/Users"));
  // const ApproveInstructor = React.lazy(() => import("../admin/ApproveInstructor"));
  // const Content = React.lazy(() => import("../admin/Course"));
  // const NewCourse = React.lazy(() => import("../admin/NewCourse"));
  // const Category = React.lazy(() => import("../admin/Category"));
  // const Report = React.lazy(() => import("../admin/Report"));
  // const ProfileAdmin = React.lazy(() => import("../admin/ProfileAdmin"));
  // const ChangepasswordAd = React.lazy(() => import("../admin/ChangePasswordAd"));
  // const TransactionHistory = React.lazy(() => import("../admin/TransactionHistory"));

  return (
    <div>
      <LayoutAdmin />
      <div className="flex overflow-hidden h-svh ">
      <div className=''>
        <Sidebar />
      </div>
      <div className="flex-grow h-full p-4 overflow-auto bg-white rounded ">
        <Routes>
        <Route path={`/`} element={<Dashboard />} />
        <Route path={`dashboard`} element={<Dashboard />} />
          <Route path={`user`} element={<UsersAdmin />} />
          <Route path={`approve-instructor`} element={<ApproveInstructor />} />
          <Route path={`course`} element={<Content />} />
          <Route path={`category`} element={<CategoryAdmin />} />
          <Route path={`report`} element={<ReportAdmin />} />
          <Route path={`info-admin`} element={<ProfileAdmin />} />
          <Route path={`admin-changepassword`} element={<ChangepasswordAd />} />
          <Route path={`transaction-history`} element={<TransactionHistory />} />
          <Route path={`payout`} element={<Payout />} />
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