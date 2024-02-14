import { Outlet } from "react-router-dom";
import "./auth.css";

const Login = () => {
  return (
    <div className="min-h-[60vh] mt-8 mb-16 flex justify-center items-start">
      <Outlet />
    </div>
  );
};

export default Login;
