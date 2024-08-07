import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  About,
  Contact,
  CourseDetailsPage,
  CoursePage,
  HomePage,
  ResendVerifyToken,
  VerityToken
} from 'pages';

import { SearchPage } from 'pages';

import { AuthProvider } from 'context/AuthContext';
import InstructorRouter from 'pages/Instructor/InstructorRouter';
import InstructorDetail from 'pages/InstructorDetail';
import AdminPage from 'pages/admin/AdminPage';
import ForgotPassword from 'pages/register/ForgotPassword';
import LayoutGuest from '../components/layout/LayoutGuest';
import ProtectedRouter from '../components/roles/ProtectedRouter';
import StudentRouter from '../pages/Student/StudentRouter';
import SignUpGoogleInstructor from '../pages/register/SignUpGoogleInstructor';



const AppRouter: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        
        {/* Layout for Guest */}
        <Route path={`/`} element={<LayoutGuest />}>
          {/* <Route index element={<Navigate to="/" />} /> */}
          <Route path={`/`} element={<HomePage />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/course-details/:courseId/instructor-detail/:userId/" element={<InstructorDetail />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path={`search`} element={<SearchPage />} />
          <Route path="/course-details/:courseId/" element={<CourseDetailsPage />} />
          <Route path="/search/course-details/:courseId/" element={<CourseDetailsPage />} />
          <Route path="/course/course-details/:courseId/" element={<CourseDetailsPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/verify-email" element={<VerityToken />} />
          <Route path="/verify-email/:token" element={<VerityToken />} />
          <Route path="/resend-email" element={<ResendVerifyToken />} />
          <Route path="/sign-up-google" element={<SignUpGoogleInstructor />} />
        </Route>
        
        {/* Layout for Users */}
        <Route path="/student/*"  element={<ProtectedRouter allowedRoles={["student"]}><StudentRouter /></ProtectedRouter>}/>
        <Route path="/instructor/*"  element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorRouter /></ProtectedRouter>}/>
        <Route path="/admin/*"  element={<ProtectedRouter allowedRoles={["admin"]}><AdminPage /></ProtectedRouter>}/>
      </Routes>

    </Router>
  </AuthProvider>
);

export default AppRouter;
