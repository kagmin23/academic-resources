import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import BuyNow from '../pages/BuyNow';
import CategoryPage from '../pages/CategoryPage';
import Contact from '../pages/Contact';
import CoursePage from '../pages/CoursePage';
import HomePage from '../pages/HomePage';
import ReportPage from '../pages/ReportPage';
import SearchPage from '../pages/SearchPage';
import ShoppingCard from '../pages/ShoppingCart';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import Profile from 'pages/Profile';
import TeacherProfile from 'pages/TeacherProfile';
import MainLayou from '../components/layout/Layout'
import About from 'pages/About';


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
        <Route path="/profile" element={<Profile />} />
        <Route path="/teacherProfile" element={<TeacherProfile />} />
        <Route path="/about" element={<About/>}/>

      </Routes>
    </MainLayou>
  </Router>
);

export default App;