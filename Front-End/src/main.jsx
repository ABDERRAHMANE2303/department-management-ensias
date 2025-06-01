import  ReactDOM   from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LandingPage from './pages/LandingPage.jsx'
import Login from './pages/Login.jsx';
import './index.css'
import Departement from './pages/Department.jsx';
import DepartmentDashboard from './pages/DepartmentDashboard.jsx';  


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
    path: "/departement/details",
    element: <Departement />,
  },
    {
    path: "/chef-departement/dashboard",
    element: <DepartmentDashboard />,
  },
]);
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);