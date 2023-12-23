import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PassContext from "../../utils/PassContext";
import {
  RiLoginBoxLine,
  RiUserAddFill,
  RiAccountCircleFill,
  RiLogoutBoxFill,
} from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser } = useContext(PassContext);

  const tabsProtected = [
    {
      name: "My Account",
      icon: <RiAccountCircleFill />,
      func: () => {
        navigate("/my-account/dashboard");
      },
    },
    {
      name: "Logout",
      icon: <RiLogoutBoxFill />,
      func: () => {
        localStorage.removeItem("jordanToken");
        localStorage.removeItem("jordanTokenRefresh");
        setLoggedUser("");
        navigate("/auth/login");
      },
    },
  ];
  const tabsPublic = [
    {
      name: "Login",
      icon: <RiLoginBoxLine />,
      func: () => {
        navigate("/auth/login");
      },
    },
    {
      name: "Register",
      icon: <RiUserAddFill />,
      func: () => {
        navigate("/auth/register");
      },
    },
  ];

  const routes = [
    {
      name: "Packages",
      link: "/packages",
      protected: false,
    },
    {
      name: "My Orders",
      link: "/my-account/orders",
      protected: true,
    },
    {
      name: "About Us",
      link: "/about-us",
      protected: false,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      protected: false,
    },
  ];

  const [tabs, setTabs] = useState([]);
  useEffect(() => {
    if (loggedUser) setTabs(tabsProtected);
    else setTabs(tabsPublic);
  }, [loggedUser]);

  return (
    <header>
      <img
        src="/assets/logo.png"
        alt="logo"
        className="h-20 w-20 cursor-pointer"
        onClick={() => {
          navigate("/");
        }}
      />
      <div className="flex gap-6">
        {routes.map((route, index) => (
          <div
            key={index}
            className={
              route.protected
                ? loggedUser
                  ? "cursor-pointer"
                  : "hidden"
                : "cursor-pointer"
            }
            onClick={() => {
              navigate(route.link);
            }}
          >
            {route.name}
          </div>
        ))}
      </div>
      <div className="flex gap-6">
        {tabs.map((tab, index) => (
          <div key={index} className="header-tabs" onClick={tab.func}>
            {tab.icon}
            {tab.name}
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;
