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
          <Route path='/user' element={<Users />} />
          <Route path='/content' element={<Content />} />
          <Route path='/report' element={<Report />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
