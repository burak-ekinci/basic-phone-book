import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import BaseLayout from "./components/layouts/BaseLayout.jsx";
import NavbarComponent from "./components/ui/NavbarComponent.jsx";
import Login from "./components/ui/Login.jsx";
import Register from "./components/ui/Register.jsx";
import AddMates from "./components/ui/AddMates.jsx";
import SearchMates from "./components/ui/SearchMates.jsx";
import Settings from "./components/ui/Settings.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./App.jsx";
// import "./styles/footer.css";
// import "./styles/navbar.css";
import Home from "./components/ui/Home.jsx";
import AllMates from "./components/ui/AllMates.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BaseLayout children={<Home />} />,
  },
  {
    path: "/login",
    element: <BaseLayout children={<Login />} />,
  },
  {
    path: "/register",
    element: <BaseLayout children={<Register />} />,
  },
  {
    path: "/add-mates",
    element: <BaseLayout children={<AddMates />} />,
  },
  {
    path: "/all-mates",
    element: <BaseLayout children={<AllMates />} />,
  },
  {
    path: "/search-mates",
    element: <BaseLayout children={<SearchMates />} />,
  },
  {
    path: "/settings",
    element: <BaseLayout children={<Settings />} />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
    <ToastContainer theme="colored" />
  </StrictMode>
);
