import { Navigate } from 'react-router-dom';

const RoleBasedRedirect = () => {
  // Check if user is logged in
  const userInfoStr = localStorage.getItem('user_info');
  
  if (!userInfoStr) {
    return <Navigate to="/login" replace />;
  }
  
  try {
    const userInfo = JSON.parse(userInfoStr);
    const role = userInfo.role;
    
    // Redirect based on role
    switch(role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'cd':
        return <Navigate to="/chef-departement/dashboard" replace />;
      case 'cf':
        return <Navigate to="/chef-filiere/dashboard" replace />;
      case 'prof':
        return <Navigate to="/prof/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  } catch (error) {
    console.error('Error parsing user info:', error);
    return <Navigate to="/login" replace />;
  }
};

export default RoleBasedRedirect;