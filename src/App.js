import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import PassContext from "./components/utils/PassContext";

import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import "./App.css";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Layout from "./components/layout";
import LayoutSimple from "./components/layout/LayoutSimple";
import Error from "./pages/Error";

import Auth from "./pages/Auth";
import Login from "./pages/Auth/components/Login";
import Register from "./pages/Auth/components/Register";

import About from "./pages/About"
import Contact from "./pages/Contact"
import Terms from "./pages/Terms"
import Packages from "./pages/Packages";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const handleReturningUser = () => {
    if (localStorage.getItem("jordanToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jordanToken"));
      if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jordanToken");
        setLoggedUser("");
      } else {
        setLoggedUser("user");
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  const BrowserRouter = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/auth",
          element: <Auth />,
          children: [
            {
              path: "/auth/login",
              element: <Login />,
            },
            {
              path: "/auth/register",
              element: <Register />,
            },
          ],
        },
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [],
        },
        {
          path: "/about-us",
          element: <About />,
        },
        {
          path: "/contact-us",
          element: <Contact />,
        },
        {
          path: "/terms",
          element: <Terms />,
        },
      ],
      errorElement: <Error />,
    },
    {
      path: "/packages",
      element: <LayoutSimple />,
      children: [
        {
          path: "/packages",
          element: <Packages />,
        },
      ],
      errorElement: <Error />,
    },
  ]);

  return (
    <PassContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={BrowserRouter} />
    </PassContext.Provider>
  );
}

export default App;
