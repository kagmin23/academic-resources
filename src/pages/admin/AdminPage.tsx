import Dashboard from 'pages/admin/DashBoard';
import React from 'react';
import { Route, Routes ,Outlet} from 'react-router-dom';
import Category from './Category';
import Content from './Course';
import Report from './Report';
import Sidebar from './Sidebar';
import NewCourse from'./NewCourse';
import Users from './Users';
import LayoutAdmin from'../../components/layout/LayoutAdmin';
import Footer from 'components/Footer';
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
          <Route path={`newcourse`} element={<NewCourse/>}/>
          <Route path={`category`} element={<Category />} />
          <Route path={`report`} element={<Report />} />
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