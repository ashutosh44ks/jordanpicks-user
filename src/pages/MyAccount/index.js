import { useEffect, useState } from "react";
import api from "../../components/utils/api";
import { Outlet, Link } from "react-router-dom";

const MyAccount = () => {
  const [user, setUser] = useState({});
  const getDashboard = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);
  return (
    <div className="flex gap-8">
      <div className="sidebar bg-pink">
        <ul>
          <li>
            <Link to="/my-account/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/my-account/my-wallet">My Wallet</Link>
          </li>
          <li>
            <Link to="/my-account/orders">Orders</Link>
          </li>
          <li>
            <Link to="/my-account/payment-methods">Payment Methods</Link>
          </li>
          <li>
            <Link to="/my-account/account-details">Account Details</Link>
          </li>
        </ul>
      </div>
      <div>
        <Outlet context={user} />
      </div>
    </div>
  );
};

export default MyAccount;
