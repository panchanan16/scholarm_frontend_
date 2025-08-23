import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/services/features/auth/slice';
import { 
  clearCredentials,
  selectCurrentUser,
  selectCurrentToken,
  selectIsAuthenticated,
  selectUserRole,
  selectHasRole,
  USER_ROLES,
} from '@/store/feature/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userRole = useSelector(selectUserRole);
  
  const [logoutMutation] = useLogoutMutation();

  const logout = async (redirectTo = '/') => {
    try {
      await logoutMutation({role: userRole}).unwrap();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      dispatch(clearCredentials());
      navigate(redirectTo, { replace: true });
    }
  };

  const hasRole = (role) => {
    return useSelector(selectHasRole(role));
  };

  return {
    user,
    token,
    userRole,
    isAuthenticated,
    hasRole,
    logout,
    ROLES: USER_ROLES,
  };
};