import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import {
  About,
  AddBlog,
  BlogPage,
  Contact,
  CourseDetailsPage,
  CoursePage,
  DetailBlogPage,
  HomePage,
  TopInstructorPage,
  VerityToken
} from 'pages';

import { SearchPage } from 'pages';

import { AuthProvider } from 'context/AuthContext';
import InstructorRouter from 'pages/Instructor/InstructorRouter';
import AdminPage from 'pages/admin/AdminPage';
import ForgotPassword from 'pages/register/ForgotPassword';
import LayoutGuest from '../components/layout/LayoutGuest';
import ProtectedRouter from '../components/roles/ProtectedRouter';
import StudentRouter from '../pages/Student/StudentRouter';


const AppRouter: React.FC = () => (
  <AuthProvider>
    <Router>
      <Routes>
        {/* Layout for Guest */}
        <Route path={`/`} element={<LayoutGuest />}>
          <Route index element={<Navigate to={`/home`} />} />
          <Route path={`/home`} element={<HomePage />} />
          <Route path={`/home/course-details`} element={<CourseDetailsPage/>} />
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path={`search`} element={<SearchPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/add-blog/*" element={<AddBlog />} />
          <Route path={`course-details`} element={<CourseDetailsPage />} />
          <Route path="/detail-blog" element={<DetailBlogPage />} />
          <Route path="/course" element={<CoursePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/top-instructor" element={<TopInstructorPage />} />
          <Route path="/verify-email/:token" element={<VerityToken />} />
        </Route>

        {/* Layout for Students */}
       
        <Route path="/student/*"  element={<ProtectedRouter allowedRoles={["student"]}><StudentRouter /></ProtectedRouter>}/>
        <Route path="/instructor/*"  element={<ProtectedRouter allowedRoles={["instructor"]}><InstructorRouter /></ProtectedRouter>}/>
        <Route path="/admin/*"  element={<ProtectedRouter allowedRoles={["admin"]}><AdminPage /></ProtectedRouter>}/>


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

        {/* <Route path="/admin/*" element={<LayoutAdmin />}> */}
          {/* <Route path="home" element={<HomePage />} /> */}
           {/* <Route path={``} element={<ProtectedRouter allowedRoles={[1]}><AdminPage /></ProtectedRouter>} />

          </Route>  */}

          {/* <Route path="/instructor/*" element={<LayoutInstructor />}> */}
          {/* <Route path="admin-page/*" element={<ProtectedRouter allowedRoles={[1]}><AdminPage /></ProtectedRouter>} />
          <Route path="profile-instructor/*" element={<ProtectedRouter allowedRoles={[3]}><ProfileInstructor /></ProtectedRouter>} /> */}

          {/* <Route path={`instructor-page`} element={<ProtectedRouter allowedRoles={[3]}><InstructorPage /></ProtectedRouter>} /> */}

          {/* </Route> */}
          

      </Routes>

    </Router>
  </AuthProvider>
);

export default AppRouter;
