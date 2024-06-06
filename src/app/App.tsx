import TeacherProfile from 'pages/TeacherProfile';
import ProfileStudent from 'pages/profile/ProfileStudent';
import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayou from '../components/layout/Layout';
import BuyNow from '../pages/BuyNow';
import CategoryPage from '../pages/CategoryPage';
import Contact from '../pages/Contact';
import CoursePage from '../pages/CoursePage';
import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import BlogPage from 'pages/BlogPage';
import DetailBlogPage from 'pages/DetailBlogPage';
import SavePage from 'pages/SavePage';
import SearchPage from '../pages/SearchPage';
import ShoppingCard from '../pages/ShoppingCart';
import CourseDetailsPage from 'pages/CourseDetailsPage';




const App: React.FC = () => (
  <Router>
    <MainLayou>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/course" element={<CoursePage/>} />
        <Route path="/shoppingCard" element={<ShoppingCard />} />
        <Route path="/buyNow" element={<BuyNow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<ReportPage />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/profile-student" element={<ProfileStudent />} />
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        <Route path='/save' element={<SavePage />} />
        <Route path='/blog' element={<BlogPage/>} />
        <Route path='/detailBlog' element={<DetailBlogPage/>} />
        <Route path='/course-details' element={<CourseDetailsPage/>} />

      </Routes>
    </MainLayou>
  </Router>
);

export default App;