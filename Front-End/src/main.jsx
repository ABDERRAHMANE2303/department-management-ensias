import  ReactDOM   from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LandingPage from './pages/LandingPage.jsx'
import './index.css'
import Departement from './pages/Department.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/departement/details",
    element: <Departement />,
  }
]);
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);