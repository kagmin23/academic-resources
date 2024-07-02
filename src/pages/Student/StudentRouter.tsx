import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LayoutStudent from 'components/layout/LayoutStudent';
import {
  About,
  AddBlog,
  BlogPage,
  BuyNow,
  CategoryPage,
  Contact,
  CourseDetailsPage,
  CoursePage,
  HomePage,
  LessonStudent,
  SavePage,
  Setting,
  ShoppingCart,
  TopInstructorPage
} from 'pages';
import PaymentSuccess from 'pages/PaymentSuccess';
import StudentPage from 'pages/Student/StudentPage';
import ProtectedRouter from '../../components/roles/ProtectedRouter';
import Report from '../ReportPage';
import Certificate from './Certificate';
import RouterLesson from './RouterLesson';

const StudentRouter: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutStudent />}>
          <Route path="/" element={<HomePage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="about" element={<About />} />
          <Route path="course/*" element={<ProtectedRouter allowedRoles={['student']}><CoursePage /></ProtectedRouter>} />
          <Route path="category" element={<ProtectedRouter allowedRoles={['student']}><CategoryPage /></ProtectedRouter>} />
          <Route path="course-details" element={<ProtectedRouter allowedRoles={['student']}><CourseDetailsPage /></ProtectedRouter>} />
          <Route path="shopping-cart" element={<ProtectedRouter allowedRoles={['student']}><ShoppingCart /></ProtectedRouter>} />
          <Route path="profile-student/*" element={<ProtectedRouter allowedRoles={['student']}><StudentPage /></ProtectedRouter>} />
          <Route path="buy-now" element={<ProtectedRouter allowedRoles={['student']}><BuyNow /></ProtectedRouter>} />
          <Route path="contact" element={<ProtectedRouter allowedRoles={['student']}><Contact /></ProtectedRouter>} />
          <Route path="report" element={<ProtectedRouter allowedRoles={['student']}><Report /></ProtectedRouter>} />
          <Route path="setting" element={<ProtectedRouter allowedRoles={['student']}><Setting /></ProtectedRouter>} />
          <Route path="add-blog" element={<ProtectedRouter allowedRoles={['student']}><AddBlog /></ProtectedRouter>} />
          <Route path="lesson-student" element={<ProtectedRouter allowedRoles={['student']}><LessonStudent /></ProtectedRouter>} />
          <Route path="router-lesson/*" element={<ProtectedRouter allowedRoles={['student']}><RouterLesson /></ProtectedRouter>} />
          <Route path="save" element={<ProtectedRouter allowedRoles={['student']}><SavePage /></ProtectedRouter>} />
          <Route path="payment-successfully" element={<ProtectedRouter allowedRoles={['student']}><PaymentSuccess /></ProtectedRouter>} />
          <Route path="top-instructor" element={<ProtectedRouter allowedRoles={['student']}><TopInstructorPage /></ProtectedRouter>} />
          <Route path="certificate-student" element={<ProtectedRouter allowedRoles={['student']}><Certificate /></ProtectedRouter>} />
        </Route>
      </Routes>
    </div>
  );
}

export default StudentRouter;
