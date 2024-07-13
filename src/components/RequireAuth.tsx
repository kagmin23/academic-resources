import React from 'react';
import { Navigate } from 'react-router-dom';
import LayoutStudent from '../components/layout/LayoutStudent';
import { useRole } from '../context/AuthContext'; // Import useRole từ AuthContext
import LayoutGuest from './layout/LayoutGuest';
import { role } from './roles/role';

interface RequireAuthProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const roles = useRole(); // Sử dụng useRole từ AuthContext

  if (!allowedRoles.includes(roles)) {
    return <Navigate to="/log-in" />;
  }

  let Layout;
  switch (roles) {
    case role.student:
      Layout = LayoutStudent;
      break;
    default:
      Layout = LayoutGuest;
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
