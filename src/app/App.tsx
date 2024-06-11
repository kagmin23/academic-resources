
import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayou from '../components/layout/Layout';
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
} from 'pages';
// import { LessonStudent } from 'pages';
import { SavePage, SearchPage, ShoppingCart } from 'pages';
// import { AddCourse } from 'pages';

import PaymentSuccess from 'pages/PaymentSuccess';




const App: React.FC = () => (
  <Router>
    <MainLayou>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/shopping-card" element={<ShoppingCart />} />
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

        <Route path='/payment-successfully' element={<PaymentSuccess/>}/>


      </Routes>
    </MainLayou>

    {/* <MainLayoutInstructor>
      <Routes>
        <Route path='/add' element={<AddCourse/>} />
        <Route path="/profile-instructor" element={<ProfileInstructor />} />
        <Route path='/setting' element={<Setting/>} />
      </Routes>
    </MainLayoutInstructor> */}

    {/* <MainLayoutStudent>
      <Routes>
          <Route path="/profile-student" element={<ProfileStudent />} />
          <Route path='/setting' element={<Setting/>} />
          <Route path='/lesson-student' element={<LessonStudent/>} />
      </Routes>
    </MainLayoutStudent> */}

  </Router>
);

export default App;