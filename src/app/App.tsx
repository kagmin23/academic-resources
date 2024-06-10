
import About from 'pages/About';
import BlogPage from 'pages/BlogPage';
import CourseDetailsPage from 'pages/CourseDetailsPage';
import CourseOrder from 'pages/CourseOrder';
import CoursePage from 'pages/CoursePage';
import DetailBlogPage from 'pages/DetailBlogPage';
import SavePage from 'pages/SavePage';

import LessonGuest from 'pages/LessonGuest';
import LessonStudent from 'pages/LessonStudent';
import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayou from '../components/layout/Layout';
import BuyNow from '../pages/BuyNow';
import CategoryPage from '../pages/CategoryPage';
import Contact from '../pages/Contact';
import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import SearchPage from '../pages/SearchPage';
import ShoppingCard from '../pages/ShoppingCart';




const App: React.FC = () => (
  <Router>
    <MainLayou>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/shopping-card" element={<ShoppingCard />} />
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
        <Route path='/lesson-guest' element={<LessonGuest/>} />
        <Route path='/lesson-student' element={<LessonStudent/>} />

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
      </Routes>
    </MainLayoutStudent> */}

  </Router>
);

export default App;