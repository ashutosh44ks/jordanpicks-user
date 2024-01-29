import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import PassContext from "../../utils/PassContext";
import Breadcrumbs from "../../common/Breadcrumbs";
import Button from "../../common/Button";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUser, setLoggedUser } = useContext(PassContext);

  const [name, setName] = useState("User Name");
  const [wallet, setWallet] = useState(0);
  const getWallet = async () => {
    try {
      const { data } = await api.get("/user/getProfileShort");
      console.log(data);
      setWallet(data.dta.wallet);
      setName(data.dta.name);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("jordanToken");
    localStorage.removeItem("jordanTokenRefresh");
    setLoggedUser("");
    navigate("/auth/login");
  };

  const routes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "FAQs",
      link: "/faq",
    },
  ];

  const [showSidebar, setShowSidebar] = useState(false);
  useEffect(() => {
    if (showSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [showSidebar]);

  const [activeRoute, setActiveRoute] = useState("");
  useEffect(() => {
    setActiveRoute(location.pathname);
    if (showSidebar) setShowSidebar(false);
  }, [location]);

  useEffect(() => {
    if (loggedUser) getWallet();
  }, [loggedUser]);

  return (
    <>
      <header>
        <img
          src="/assets/nLogo.png"
          alt="logo"
          className="h-[4.5rem] cursor-pointer"
          onClick={() => {
            navigate("/");
          }}
        />
        <div className="hidden sm:flex items-center md:gap-10 lg:gap-16">
          <div className="header-section nav">
            {routes.map((route, index) => (
              <div
                key={index}
                className={
                  activeRoute === route.link ? "active" : "cursor-pointer"
                }
                onClick={() => {
                  navigate(route.link);
                }}
              >
                {route.name}
              </div>
            ))}
          </div>
          {!loggedUser ? (
            <div className="header-section">
              <Button
                theme="transparent"
                onClick={() => {
                  navigate("/auth/login");
                }}
                size="md-rect"
              >
                Login
              </Button>
              <Button
                theme="pink"
                onClick={() => {
                  navigate("/auth/register");
                }}
                size="md-rect"
              >
                Register
              </Button>
            </div>
          ) : (
            <div className="header-section">
              <Button
                theme="dark"
                onClick={() => {
                  navigate("/my-account/dashboard");
                }}
                className="font-medium"
              >
                ${wallet.toFixed(2)} USD
              </Button>
              <div className="flex gap-2 items-center user-dd-menu-trigger py-4">
                <FaRegUserCircle />
                <div className="flex gap-1 items-center">
                  {name}
                  <MdKeyboardArrowDown className="text-xl" />
                </div>
                <ul className="user-dd-menu">
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-pink"
                    onClick={() => navigate("/my-account/account-details")}
                  >
                    My Profile
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-pink rounded-bl-sm rounded-br-sm"
                    onClick={logout}
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
        <div
          className="p-4 sm:p-6 text-xl sm:hidden text-white cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose /> : <GiHamburgerMenu />}
        </div>
      </header>
      <Breadcrumbs />
      <Sidebar
        showSidebar={showSidebar}
        activeRoute={activeRoute}
        loggedUser={loggedUser}
        logout={logout}
      />
    </>
  );
};

export default Header;
