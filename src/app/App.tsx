import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from '../components/Layout';
import CategoryPage from '../pages/CategoryPage';
import HomePage from '../pages/HomePage';
import SearchPage from '../pages/SearchPage';
import ReportPage from '../pages/ReportPage';
import CoursePage from '../pages/CoursePage';
import ShoppingCard from'../pages/ShoppingCart';
import BuyNow from '../pages/BuyNow';
import Contact from '../pages/Contact';



const App: React.FC = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/course" element={<CoursePage/>} />
        <Route path="/shoppingCard" element={<ShoppingCard />} />
        <Route path="/buyNow" element={<BuyNow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/report" element={<ReportPage />} />

      </Routes>
    </MainLayout>
  </Router>
);

export default App;
