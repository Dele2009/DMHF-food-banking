import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Spinner } from "@heroui/react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Spinner color="warning" size="lg" classNames={{base: "scale-[1.5]"}} />
      </div>
    );
  }
  // return children;
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={user?.is_admin ? "" : "/auth/sign-in"} />
  );
};

export default ProtectedRoute;
