import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

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
  ProfileInstructor,
  ProfileStudent,
  SavePage,
  Setting,
  ShoppingCart,
} from 'pages';

import { SearchPage } from 'pages';

import { AuthProvider } from 'context/AuthContext';
import PaymentSuccess from 'pages/PaymentSuccess';
import AdminPage from 'pages/admin/AdminPage';
import LayoutAdmin from '../components/layout/LayoutAdmin';
import LayoutGuest from '../components/layout/LayoutGuest';
import LayoutInstructor from '../components/layout/LayoutInstructor';
import LayoutStudent from '../components/layout/LayoutStudent';
import ProtectedRouter from '../components/roles/ProtectedRouter';
import Report from '../pages/ReportPage';
import StudentRouter from 'pages/student/StudentRouter';
const AppRouter: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Layout for Guest */}
        <Route path="/" element={<LayoutGuest />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/course-details" element={<CourseDetailsPage />} />
          <Route path="/detail-blog" element={<DetailBlogPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/course-order" element={<CourseOrder />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Layout for Students */}
       
        <Route path="/student/*"  element={<ProtectedRouter allowedRoles={[2]}><StudentRouter /></ProtectedRouter>}/>
        {/* <Route path={``} element={<ProtectedRouter allowedRoles={[2]}><UserRouter /></ProtectedRouter>} /> */}
        {/* <Route path={``} element={<HomePage />} />
          <Route path={`blog`} element={<BlogPage />} />
          <Route path={`about`} element={<About />} />

          <Route path={`course`}element={<ProtectedRouter allowedRoles={[2]}><CoursePage /></ProtectedRouter>} />
          <Route path={`category`} element={<ProtectedRouter allowedRoles={[2]}><CategoryPage /></ProtectedRouter>} />
          <Route path={`shopping-cart`} element={<ProtectedRouter allowedRoles={[2]}><ShoppingCart /></ProtectedRouter>} />
          <Route path={`profile-student`} element={<ProtectedRouter allowedRoles={[2]}><ProfileStudent /></ProtectedRouter>} />
          <Route path={`buy-now`} element={<ProtectedRouter allowedRoles={[2]}><BuyNow /></ProtectedRouter>} />
          <Route path={`contact`} element={<ProtectedRouter allowedRoles={[2]}><Contact /></ProtectedRouter>} />
          <Route path={`report`} element={<ProtectedRouter allowedRoles={[2]}><Report /></ProtectedRouter>} />
          <Route path={`setting`} element={<ProtectedRouter allowedRoles={[2]}><Setting /></ProtectedRouter>} />
          <Route path={`lesson-student`} element={<ProtectedRouter allowedRoles={[2]}><LessonStudent /></ProtectedRouter>} />
          <Route path={`save`} element={<ProtectedRouter allowedRoles={[2]}><SavePage /></ProtectedRouter>} />
          <Route path={`payment-successfully`} element={<ProtectedRouter allowedRoles={[2]}><PaymentSuccess /></ProtectedRouter>} /> */}
        {/* </Route> */}
          {/* <Route path="/home" element={<HomePage />} /> */}

        <Route path="/admin/*" element={<LayoutAdmin />}>
          {/* <Route path="home" element={<HomePage />} /> */}
          <Route path={``} element={<ProtectedRouter allowedRoles={[1]}><AdminPage /></ProtectedRouter>} />

          </Route>

          {/* viết tiếp */}
          {/* <Route path="/admin/*"  element={<ProtectedRouter allowedRoles={[2]}><AdminPage /></ProtectedRouter>}/> */}

          <Route path="/" element={<LayoutAdmin />}/>

          <Route path="/" element={<LayoutInstructor />}>

          <Route path="admin-page/*" element={<ProtectedRouter allowedRoles={[1]}><AdminPage /></ProtectedRouter>} />
          <Route path="profile-instructor/*" element={<ProtectedRouter allowedRoles={[3]}><ProfileInstructor /></ProtectedRouter>} />
          </Route>

      </Routes>
    </Router>
  </AuthProvider>
);

export default AppRouter;
