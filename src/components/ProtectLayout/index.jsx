import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../MainLayout';

const ProtectedLayout = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <MainLayout />;
};
export default ProtectedLayout;
