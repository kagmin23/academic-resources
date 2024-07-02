import { useRole } from 'context/AuthContext';
import React from 'react';
import { Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
  allowedRoles: string[]; // Adjust according to your role structure
  children: JSX.Element;
}

const ProtectedRouter: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const role = useRole(); // Use useRole from AuthContext

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouter;
