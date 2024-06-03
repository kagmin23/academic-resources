import React from 'react';
import './App.css';
import HomePage from './components/HomePage';
import MainLayout from './components/Layout';
import './index.css';

const App: React.FC = () => {
  return (
    <MainLayout>
      <HomePage />
    </MainLayout>
  );
};

export default App;
