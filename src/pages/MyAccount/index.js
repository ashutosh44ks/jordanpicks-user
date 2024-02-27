import { Outlet } from "react-router-dom";
import Banner from "./components/Banner";
import Tabs from "./components/Tabs";
import "./myaccount.css";

const MyAccount = () => {
  return (
    <div>
      <Banner />
      <Tabs />
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MyAccount;
