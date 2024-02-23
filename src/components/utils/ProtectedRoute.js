import { useEffect, useContext, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import updateToken from "./updateToken";
import PassContext from "./PassContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUser, setLoggedUser } = useContext(PassContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loggedUser._id === "") {
      // if User is not logged in
      // Check if user has a token and refresh token
      if (
        localStorage.getItem("jordanToken") &&
        localStorage.getItem("jordanTokenRefresh")
      ) {
        // if user has a token and refresh token, check if token is expired
        const decodedToken = jwtDecode(localStorage.getItem("jordanToken"));
        if (decodedToken.exp * 1000 < Date.now()) {
          // if token is expired, update token
          updateToken();
        } else {
          // if token is not expired, set loggedUser to userId or "user"
          console.log(decodedToken.id);
          setLoggedUser({ ...loggedUser, _id: decodedToken.id });
        }
        setLoading(false);
      } else {
        // if user doesn't have a token and refresh token, set loading to false and direct to login page
        setLoading(false);
        navigate(`/auth/login?redirect=${location.pathname + location.search}`);
      }
    } else {
      // if User is logged in, set loading to false and later direct to the requested page
      setLoading(false);
    }
  }, [navigate, loggedUser]);

  if (!loading) return <Outlet />;
};

export default ProtectedRoute;
