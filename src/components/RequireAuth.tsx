import React from 'react';
import { Navigate } from 'react-router-dom';
import LayoutStudent from '../components/layout/LayoutStudent';
import { useRole } from '../context/AuthContext'; // Import useRole từ AuthContext
import LayoutGuest from './layout/LayoutGuest';
import { Roles } from './roles/role';

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const role = useRole(); // Sử dụng useRole từ AuthContext

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/log-in" />;
  }

  let Layout;
  switch (role) {
    case Roles.Student:
      Layout = LayoutStudent;
      break;
    default:
      Layout = LayoutGuest;
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
