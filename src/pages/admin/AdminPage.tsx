import Footer from 'components/Footer';
import Dashboard from 'pages/admin/DashBoard';
import React from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import LayoutAdmin from '../../components/layout/LayoutAdmin';
import Category from './Category';
import Content from './Course';
import NewCourse from './NewCourse';
import Report from './Report';
import Sidebar from './Sidebar';
import TransactionHistory from './TransactionHistory';

import Users from './Users';
const AdminPage: React.FC = () => {
  return (
    <div>
      <LayoutAdmin/>
    <div className="flex min-h-screen mb-5">
      <Sidebar />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
        <Route path={`/`} element={<Dashboard />} />
          <Route path={`user`} element={<Users />} />
          <Route path={`course`} element={<Content />} />
          <Route path={`approve-courses`} element={<NewCourse/>}/>
          <Route path={`category`} element={<Category />} />
          <Route path={`report`} element={<Report />} />
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