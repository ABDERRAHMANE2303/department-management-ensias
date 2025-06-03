import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";  // Fix the import path
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx';
import './index.css'
import Departement from './pages/Department.jsx';
import DepartmentDashboard from './pages/DepartmentDashboard.jsx';  
import AdminDashboard from './pages/AdminDashboard.jsx';
import FormationDashboard from './pages/FormationDashboard.jsx';
import ProfessorDashboard from './pages/ProfessorDashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import RoleBasedRedirect from './components/RoleBasedRedirect.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
  path: "/dashboard",
  element: <RoleBasedRedirect />
},
  {
    path: "/departement/details",
    element: <Departement />,
  },
  {
    path: "/chef-departement/dashboard",
    element: <ProtectedRoute 
              element={<DepartmentDashboard />} 
              requiredRole="cd" 
            />,
  },
  {
    path: "/admin/dashboard",
    element: <ProtectedRoute 
              element={<AdminDashboard />} 
              requiredRole="admin" 
            />,
  },
  {
    path: "/chef-filiere/dashboard",
    element: <ProtectedRoute 
              element={<FormationDashboard />} 
              requiredRole="cf" 
            />,
  },
  {
    path: "/prof/dashboard",
    element: <ProtectedRoute 
              element={<ProfessorDashboard />} 
              requiredRole="prof" 
            />,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);