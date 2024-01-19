import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../../../components/common/Button";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState("dashboard");
  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActive(path);
  }, [location]);

  return (
    <div>
      <h3 className="font-medium">My Account</h3>
      <div className="flex gap-2 sm:gap-6 my-8 flex-wrap">
        <Button
          theme={active === "my-packages" ? "pink" : "transparent"}
          size="md-rect"
          rounded="sm"
          onClick={() => navigate("/my-account/my-packages")}
        >
          My Packages
        </Button>
        <Button
          theme={active === "transactions" ? "pink" : "transparent"}
          size="md-rect"
          rounded="sm"
          onClick={() => navigate("/my-account/transactions")}
        >
          Transactions
        </Button>
        <Button
          theme={active === "account-details" ? "pink" : "transparent"}
          size="md-rect"
          rounded="sm"
          onClick={() => navigate("/my-account/account-details")}
        >
          Account Details
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
