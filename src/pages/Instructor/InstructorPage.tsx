import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ManagerInstructor from '../Instructor/ManagerInstructor';
import SidebarInstructor from '../Instructor/SidebarInstructor';
import DashboardInstructor from 'pages/Instructor/DashboardInstructor';


const AdminPage: React.FC = () => {
  return (
    <div className="flex">
    <SidebarInstructor />
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
        <Route path={`/`} element={<DashboardInstructor />} />
        <Route path={`manager-course`} element={<ManagerInstructor />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
