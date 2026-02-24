import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const loginStore = useAuthStore(state => state.login);
  const logoutStore = useAuthStore(state => state.logout);
  const navigate = useNavigate();

  const login = async data => {
    loginStore(data);
    navigate('/', { replace: true });
  };

  const logout = () => {
    logoutStore();
    navigate('/login', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
