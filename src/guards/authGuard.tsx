import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthGuard = () => {
  // const token = tokenManager.getAccessToken();
  const token = 'àgu'
  const location = useLocation();

  if (!token) {
    // Chưa login -> chuyển sang trang login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // render các route con bên trong
};

export default AuthGuard;
