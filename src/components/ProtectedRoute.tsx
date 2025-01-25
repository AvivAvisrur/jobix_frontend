import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { validateSession } from "../redux/slices/authSlice";

const ProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (loading) {
      dispatch(validateSession());
    }
  }, [dispatch, loading, isAuthenticated]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
