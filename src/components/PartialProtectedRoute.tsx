import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { validateSession } from "../redux/slices/authSlice";
import { Navigate, Outlet } from "react-router";

const PartialProtectedRoute: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (loading) {
      dispatch(validateSession());
      // validateSession can just check if user is logged in
      // but does NOT fail if is2faVerified = false
    }
  }, [dispatch, loading]);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

export default PartialProtectedRoute;
