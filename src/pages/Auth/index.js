import { Outlet } from "react-router-dom";
import "./auth.css";

const Login = () => {

  return (
    <div className="min-h-[80vh] mt-8 mb-16 flex justify-center items-center">
      <Outlet />
    </div>
  );
};

export default Login;
