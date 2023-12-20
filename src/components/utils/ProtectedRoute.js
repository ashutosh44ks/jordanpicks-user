import { useEffect, useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import PassContext from "./PassContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(PassContext);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loggedUser !== "user") {
      setLoading(false);
      navigate("/auth/login");
    } else {
      setLoading(false);
    }
  }, [navigate, loggedUser]);

  if (!loading) return <Outlet />;
};

export default ProtectedRoute;
