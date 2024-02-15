import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import PassContext from "./components/utils/PassContext";
import updateToken from "./components/utils/updateToken";

import "react-simple-toasts/dist/theme/success.css";
import "react-simple-toasts/dist/theme/failure.css";
import "./App.css";
import ProtectedRoute from "./components/utils/ProtectedRoute";
import Layout from "./components/layout";
import Error from "./pages/Error";

import Auth from "./pages/Auth";
import Login from "./pages/Auth/components/Login";
import Register from "./pages/Auth/components/Register";

import About from "./pages/About";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Packages from "./pages/Packages";
import Orders from "./pages/MyAccount/components/Orders";
import MyPackages from "./pages/MyAccount/components/MyPackages";
import AccountDetails from "./pages/MyAccount/components/AccountDetails";
import Referrals from "./pages/MyAccount/components/Referrals";
import MyAccount from "./pages/MyAccount";
import PackageDetails from "./pages/PackageDetails";
import VSLPackageDetails from "./pages/VSLPackageDetails";
import Payment from "./pages/Payment";
import VSLPayment from "./pages/VSLPayment";
import StorePayment from "./pages/Store/Payment";
// import AddReward from "./pages/AddReward";
import ForgotPassword from "./pages/Auth/components/ForgotPassword";
import Faq from "./pages/Faq";
import Store from "./pages/Store";
import VerifyAccount from "./pages/Auth/components/Verify";

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loading, setLoading] = useState(true);
  const handleReturningUser = async () => {
    if (localStorage.getItem("jordanToken")) {
      const decodedToken = jwtDecode(localStorage.getItem("jordanToken"));
      if (decodedToken.exp * 1000 < Date.now()) {
        const userId = await updateToken();
        setLoggedUser(userId);
      } else {
        console.log("back user", decodedToken, decodedToken.id);
        setLoggedUser(decodedToken.id);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    handleReturningUser();
  }, []);

  if (loading) return null;

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
            {
              path: "/auth/forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "/auth/verify-account",
              element: <VerifyAccount />,
            },
          ],
        },
        {
          path: "/",
          element: <Packages />,
        },
        {
          path: "/packages",
          element: <Packages />,
        },
        {
          path: "/packages/:id/payment",
          element: <Payment />,
        },
        {
          path: "/packages/:id",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/packages/:id",
              element: <PackageDetails />,
            },
          ],
        },
        {
          path: "/vsl-packages/:id",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/vsl-packages/:id",
              element: <VSLPackageDetails />,
            },
          ],
        },
        {
          path: "/vsl-packages/:id/payment",
          element: <VSLPayment />,
        },
        {
          path: "/my-account",
          element: <ProtectedRoute />,
          children: [
            {
              path: "/my-account",
              element: <MyAccount />,
              children: [
                {
                  path: "/my-account/my-packages",
                  element: <MyPackages />,
                },
                {
                  path: "/my-account/transactions",
                  element: <Orders />,
                },
                {
                  path: "/my-account/account-details",
                  element: <AccountDetails />,
                },
                {
                  path: "/my-account/referrals",
                  element: <Referrals />,
                },
              ],
            },
          ],
        },
        {
          path: "/store",
          element: <Store />,
        },
        {
          path: "/store/payment",
          element: <StorePayment />,
        },
        {
          path: "/faq",
          element: <Faq />,
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
  ]);

  return (
    <PassContext.Provider value={{ loggedUser, setLoggedUser }}>
      <RouterProvider router={BrowserRouter} />
    </PassContext.Provider>
  );
}

export default App;
