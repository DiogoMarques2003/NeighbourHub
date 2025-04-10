import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getToken } from '../utils/helperFunctions';

const AuthGuard = () => {
  const token = getToken();
  const location = useLocation();

  // If no token found, redirect to login with the return url
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  
  return <Outlet />;
};

export default AuthGuard;