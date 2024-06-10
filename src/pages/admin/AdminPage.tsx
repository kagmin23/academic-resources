import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from './Content';
import Report from './Report';
import Sidebar from './Sidebar';
import Users from './Users';

const AdminPage: React.FC = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
          <Route path='/admin-page/user' element={<Users />} />
          <Route path='/admin-page/content' element={<Content />} />
          <Route path='/admin-page/report' element={<Report />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
