import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  
  // return children;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={user?.is_admin ? "" : "/auth/sign-in"} />
  );
};

export default ProtectedRoute;
