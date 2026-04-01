import tokenManager from "@shared/utils/tokenManager";
import { Navigate, Outlet } from "react-router-dom";

const GuestGuard = () => {
  const token = tokenManager.getAccessToken();

  if (token) {
    // Nếu đã login thì không cho vào lại trang login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default GuestGuard;
