import React from 'react'
import { Route, Routes } from 'react-router-dom';
import SidebarLesson from './SidebarLesson';
import LessonStudent from 'pages/LessonStudent';
export default function RouterLesson() {
  return (
    <div className="flex">
    
      <div className="flex-grow p-4 bg-white rounded shadow-md">
        <Routes>
        <Route path={`/`} element={<LessonStudent />} />
        <Route path={`lesson-student/:id`} element={<LessonStudent />} />
          <Route path={`*`} element={<h1>404</h1>} />
        </Routes>
      </div>
      <SidebarLesson/>
    </div>
  )
}
