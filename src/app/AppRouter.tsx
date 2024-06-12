import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ReportPage from '../pages/ReportPage';


import {
  About,
  BlogPage,
  BuyNow,
  CategoryPage,
  Contact,
  CourseDetailsPage,
  CourseOrder,
  CoursePage,
  DetailBlogPage,
  HomePage,
  LessonStudent,
  Setting,
} from 'pages';
// import { LessonStudent } from 'pages';
import { SavePage, SearchPage, ShoppingCart } from 'pages';
// import { AddCourse } from 'pages';

import { AuthProvider } from 'context/AuthContext';
import PaymentSuccess from 'pages/PaymentSuccess';
import AdminPage from 'pages/admin/AdminPage';
import ProfileInstructor from 'pages/profile/ProfileInstructor';
import ProfileStudent from 'pages/profile/ProfileStudent';
import LayoutGuest from '../components/layout/LayoutGuest';
import LayoutStudent from '../components/layout/LayoutStudent';
import ProtectedRouter from '../components/roles/ProtectedRouter';


const AppRouter: React.FC = () => (
  <AuthProvider>
  <Router>

    <LayoutGuest>
      <Routes>

    <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<ProtectedRouter allowedRoles={[3]}><CategoryPage /></ProtectedRouter>} />
        <Route path="/shopping-card" element={<ProtectedRouter allowedRoles={[3]}><ShoppingCart /></ProtectedRouter>} />
        <Route path="/buy-now" element={<BuyNow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/log-in" element={<Login/>} />
        <Route path="/sign-up" element={<SignUp />} />

        <Route path='/save' element={<SavePage />} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/course-details' element={<CourseDetailsPage/>} />
        <Route path='/detail-blog' element={<DetailBlogPage/>} />
        <Route path='/course' element={<CoursePage/>} />
        <Route path='/course-order' element={<CourseOrder/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/lesson-student' element={<LessonStudent/>} />
        <Route path='/payment-successfully' element={<PaymentSuccess/>}/>
        <Route path='/profile-student' element={<ProfileStudent/>} />
        <Route path='/profile-instructor' element={<ProfileInstructor/>} />

        <Route path='/admin-page/*' element={<AdminPage/>} /></Routes>

    </LayoutGuest>


    {/* <MainLayoutInstructor>
      <Routes>
        <Route path='/add' element={<AddCourse/>} />
        <Route path="/profile-instructor" element={<ProfileInstructor />} />
        <Route path='/setting' element={<Setting/>} />
      </Routes>
    </MainLayoutInstructor> */}

    <LayoutStudent>
      <Routes>

    <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/profile-student" element={<ProtectedRouter allowedRoles={[2]}><ProfileStudent /></ProtectedRouter>} />
          <Route path='/setting' element={<Setting/>} />
          <Route path='/lesson-student' element={<LessonStudent/>} />
      </Routes>
      </LayoutStudent>

  </Router>
  </AuthProvider>
);

export default AppRouter;