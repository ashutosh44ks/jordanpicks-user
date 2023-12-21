import { useEffect, useState } from "react";
import api from "../../components/utils/api";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./myaccount.css";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const getDashboard = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      setUser(data.dta)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <div className="flex gap-8">
      <Sidebar />
      <div>
        <Outlet context={user} />
      </div>
    </div>
  );
};

export default MyAccount;
