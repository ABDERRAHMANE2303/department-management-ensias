import  ReactDOM   from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import LandingPage from './pages/LandingPage.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
]);
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);