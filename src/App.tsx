import React from 'react';
import './App.css';
import MainLayout from './components/Layout';
import './index.css';
import HomePage from './pages/HomePage';

const App: React.FC = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};

export default App;
