import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/Login';

export default function PrivateRoute() {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
