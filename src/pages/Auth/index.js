import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./auth.css";

const Auth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname === "/auth") navigate("/auth/login");
  }, [pathname]);

  return (
    <div className="min-h-[60vh] mt-8 mb-16 flex justify-center items-start">
      <Outlet />
    </div>
  );
};

export default Auth;
