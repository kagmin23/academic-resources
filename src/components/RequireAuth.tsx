// RequireAuth.tsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import LayoutStudent from '../components/layout/LayoutStudent';
import LayoutGuest from '../components/layout/LayoutGuest';
import { useRole } from '../context/AuthContext'; // Import useRole from AuthContext
import { Roles } from '../components/roles/role'; // Adjust according to your role structure

interface RequireAuthProps {
  allowedRoles: Roles[]; // Adjust according to your role structure
  children: React.ReactNode;
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles, children }) => {
  const role = useRole(); // Use useRole hook from AuthContext

  if (!allowedRoles.includes(role as Roles)) {
    return <Navigate to="/log-in" />;
  }

  let Layout;
  switch (role) {
    case Roles.student:
      Layout = LayoutStudent;
      break;
    default:
      Layout = LayoutGuest;
  }

  return <Layout>{children}</Layout>;
};

export default RequireAuth;
