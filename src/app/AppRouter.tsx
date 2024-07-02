import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AuthProvider, useAuth } from '../context/AuthContext'; // Adjust path as per your file structure
import InstructorRouter from '../pages/Instructor/InstructorRouter'; // Adjust path as per your file structure

import ForgotPassword from '../pages/register/ForgotPassword'; // Adjust path as per your file structure
import LayoutGuest from '../components/layout/LayoutGuest';
import ProtectedRouter from '../components/roles/ProtectedRouter';
import StudentRouter from '../pages/Student/StudentRouter'; // Adjust path as per your file structure
import { getCurrentUser } from '../services/loginApiService'; // Adjust path as per your file structure
import { HomePage } from '../pages'; // Adjust path as per your file structure
import Login from 'pages/register/Login';
import SignUp from 'pages/register/SignUp';
import AdminPage from 'pages/admin/AdminPage';

const AppRouter: React.FC = () => {
  const { login, role } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const user = await getCurrentUser();
        login(); // Update authentication state after successful login
        // Optionally set role if needed: setRole(user.role);
      } catch (error) {
        console.error('Failed to fetch current user:', error);
        // Handle error, e.g., redirect to login or show error message
      } finally {
        setLoading(false);
      }
    }

    fetchCurrentUser();
  }, [login]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Layout for Guest */}
          <Route path="/" element={<LayoutGuest />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            {/* Other public routes */}
          </Route>

          {/* Layout for Students */}
          <Route path="/student/*" element={<ProtectedRouter allowedRoles={['student']}><StudentRouter /></ProtectedRouter>} />

          {/* Layout for Instructors */}
          <Route path="/instructor/*" element={<ProtectedRouter allowedRoles={['instructor']}><InstructorRouter /></ProtectedRouter>} />

          {/* Layout for Admin */}
          <Route path="/admin/*" element={<ProtectedRouter allowedRoles={['admin']}><AdminPage /></ProtectedRouter>} />

          {/* Login and other public routes */}
          <Route path="/log-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Handle 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRouter;
