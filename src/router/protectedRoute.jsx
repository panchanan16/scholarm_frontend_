import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { 
  selectIsAuthenticated, 
  selectHasRole, 
  selectIsLoading 
} from '@/store/feature/auth/authSlice';

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

const UnauthorizedPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="text-6xl mb-4">🚫</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-4">You don't have permission to access this page.</p>
      <button 
        onClick={() => window.history.back()}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go Back
      </button>
    </div>
  </div>
);

export const ProtectedRoute = ({ 
  children, 
  fallback = null,
  redirectTo = '/' 
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate 
      to={redirectTo} 
      state={{ from: location }} 
      replace 
    />;
  }

  return fallback || children;
};

export const RoleProtectedRoute = ({ 
  children, 
  requiredRole, 
  fallback = <UnauthorizedPage />,
  redirectTo = '/unauthorized' 
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const hasRole = useSelector(selectHasRole(requiredRole));
  const isLoading = useSelector(selectIsLoading);
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate 
      to="/login" 
      state={{ from: location }} 
      replace 
    />;
  }

  if (!hasRole) {
    if (redirectTo) {
      return <Navigate to={redirectTo} replace />;
    }
    return fallback;
  }

  return children;
};

export const AdminRoute = ({ children, ...props }) => (
  <ProtectedRoute requiredRole="admin" {...props}>
    {children}
  </ProtectedRoute>
);

export const ManagerRoute = ({ children, ...props }) => (
  <RoleProtectedRoute requiredRole="manager" {...props}>
    {children}
  </RoleProtectedRoute>
);

export const EmployeeRoute = ({ children, ...props }) => (
  <RoleProtectedRoute requiredRole="employee" {...props}>
    {children}
  </RoleProtectedRoute>
);