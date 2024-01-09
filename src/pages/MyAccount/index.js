import { useEffect, useState } from "react";
import api from "../../components/utils/api";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import "./myaccount.css";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const getDashboard = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      setUser(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <div className="my-account-layout">
      <Sidebar />
      <div className="w-full">
        {loading ? (
          <h3>Loading...</h3>
        ) : (
          <Outlet context={{ userData: user, getDashboard }} />
        )}
      </div>
    </div>
  );
};

export default MyAccount;
