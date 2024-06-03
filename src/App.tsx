// src/App.tsx
import React from 'react';

import 'antd/dist/reset.css';
import './App.css';
import TeacherProfile from './pages/TeacherProfile';
// import Profile from './pages/Profile';

const App: React.FC = () => {
  return (
    <div className="App">
      {/* <Profile/> */}
      <TeacherProfile/>
    </div>
  );
};

export default App;
