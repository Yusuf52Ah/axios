import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import useAuthStore from "@/store/useAuthStore";

const ProtectedRoutes = () => {
  const { isAuthenticated, checkAuth } = useAuthStore();
  const location = useLocation();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const token = localStorage.getItem("access_token");

  if (!token && !isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoutes;
