import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MainLayout from './components/Layout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';


const App: React.FC = () => (
  <Router>
    <MainLayout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/search" element={<SearchPage />} />
        {/* Add more routes as needed */}
      </Routes>
    </MainLayout>
  </Router>
);

export default App;
