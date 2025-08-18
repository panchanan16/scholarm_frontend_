import { createSlice } from '@reduxjs/toolkit';

export const USER_ROLES = {
  USER: 'user',
  EMPLOYEE: 'employee', 
  MANAGER: 'manager',
  ADMIN: 'admin',
};

export const ROLE_HIERARCHY = {
  [USER_ROLES.USER]: 1,
  [USER_ROLES.EMPLOYEE]: 2,
  [USER_ROLES.MANAGER]: 3,
  [USER_ROLES.ADMIN]: 4,
};

const getInitialState = () => {
  try {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
      return {
        user: JSON.parse(user),
        token,
        isAuthenticated: true,
        isLoading: false,
      };
    }
  } catch (error) {
    console.error('Error parsing stored auth data:', error);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
  
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      state.isLoading = false;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    },
    
    clearCredentials: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
});

export const { setCredentials, clearCredentials, setLoading, updateUser } = authSlice.actions;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUserRole = (state) => state.auth.user?.role;

export const selectHasRole = (requiredRole) => (state) => {
  const userRole = selectUserRole(state);
  if (!userRole) return false;
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
};

export const selectHasAnyRole = (requiredRoles) => (state) => {
  const userRole = selectUserRole(state);
  if (!userRole) return false;
  return requiredRoles.includes(userRole);
};

export const selectCanAccess = (requiredPermissions) => (state) => {
  const user = selectCurrentUser(state);
  if (!user || !user.permissions) return false;
  return requiredPermissions.every(permission => 
    user.permissions.includes(permission)
  );
};

export default authSlice.reducer;