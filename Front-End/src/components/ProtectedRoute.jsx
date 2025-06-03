import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, requiredRole }) => {
  // Check if user is logged in
  const token = localStorage.getItem('auth_token');
  const userInfoStr = localStorage.getItem('user_info');
  
  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // If we need to check roles
  if (requiredRole) {
    try {
      const userInfo = JSON.parse(userInfoStr);
      const userRole = userInfo.role;
      
      // Check if user has required role
      if (userRole !== requiredRole) {
        // Redirect to appropriate dashboard based on role or to login
        return <Navigate to="/login" replace />;
      }
    } catch (error) {
      console.error('Error parsing user info:', error);
      // If user info is invalid, redirect to login
      return <Navigate to="/login" replace />;
    }
  }
  
  // If authenticated and has proper role, render the element
  return element;
};

export default ProtectedRoute;