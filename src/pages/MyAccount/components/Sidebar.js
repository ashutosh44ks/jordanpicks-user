import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActive(path);
  }, [location]);

  return (
    <div className="sidebar">
      <h3 className="ml-5 mt-1 mb-5">My Account</h3>
      <ul>
        <li
          className={active === "dashboard" ? "active" : ""}
          onClick={() => navigate("/my-account/dashboard")}
        >
          Dashboard
        </li>
        <li
          className={active === "my-wallet" ? "active" : ""}
          onClick={() => navigate("/my-account/my-wallet")}
        >
          My Wallet
        </li>
        <li
          className={active === "orders" ? "active" : ""}
          onClick={() => navigate("/my-account/orders")}
        >
          Orders
        </li>
        {/* <li
          className={active === "payment-methods" ? "active" : ""}
          onClick={() => navigate("/my-account/payment-methods")}
        >
          Payment Methods
        </li> */}
        <li
          className={active === "account-details" ? "active" : ""}
          onClick={() => navigate("/my-account/account-details")}
        >
          Account Details
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
