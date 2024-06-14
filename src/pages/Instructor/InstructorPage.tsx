import DashboardInstructor from 'pages/Instructor/DashboardInstructor';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

const InstructorPage: React.FC = () => {
    return (
        <div className="flex">
            <div className="flex-grow p-4 bg-white rounded shadow-md">
                <Routes>
                    <Route path={`/`} element={<DashboardInstructor />} />
                    <Route path={`*`} element={<h1>404</h1>} />
                </Routes>
            </div>

        </div>
    );
}

export default InstructorPage;