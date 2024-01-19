import { useEffect, useState } from "react";
import api from "../../components/utils/api";
import { Outlet } from "react-router-dom";
import Tabs from "./components/Tabs";
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
    <div>
      <Tabs />
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
