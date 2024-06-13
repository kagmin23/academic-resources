import Dashboard from 'pages/admin/DashBoard';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Category from './Category';
import Content from './Course';
import Report from './Report';
import Sidebar from './Sidebar';
import Users from './Users';

const AdminPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
        <Route path={`/`} element={<Dashboard />} />
          <Route path={`user`} element={<Users />} />
          <Route path={`course`} element={<Content />} />
          <Route path={`category`} element={<Category />} />
          <Route path={`report`} element={<Report />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;