import { Outlet } from "react-router-dom";
import Tabs from "./components/Tabs";
import "./myaccount.css";

const MyAccount = () => {
  return (
    <div>
      <Tabs />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
