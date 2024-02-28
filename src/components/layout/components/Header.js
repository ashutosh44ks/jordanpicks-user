import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PassContext from "../../utils/PassContext";
import Breadcrumbs from "../../common/Breadcrumbs";
import Button from "../../common/Button";
import Sidebar from "./Sidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdClose } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbShoppingCartDollar } from "react-icons/tb";
import { PiWallet } from "react-icons/pi";

const Menu = ({ route, activeRoute }) => {
  const navigate = useNavigate();
  return (
    <div
      key={route.link}
      className={activeRoute === route.link ? "active" : "cursor-pointer"}
      onClick={() => {
        navigate(route.link);
      }}
    >
      {route.name}
    </div>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedUser, setLoggedUser, getProfileShort } =
    useContext(PassContext);

  const logout = () => {
    localStorage.removeItem("jordanToken");
    localStorage.removeItem("jordanTokenRefresh");
    setLoggedUser({
      _id: "",
      name: "",
      wallet: 0,
      defaultDiscount: 0,
      cart: [],
    });
    navigate("/auth/login");
  };

  const publicRoutes = [
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
  const protectedRoutes = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "My Packages",
      link: "/my-account/my-packages",
    },
    {
      name: "Store",
      link: "/store",
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
    if (loggedUser._id !== "") getProfileShort();
  }, [loggedUser._id]);

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
        <div className="header-section nav">
          {loggedUser._id === ""
            ? publicRoutes.map((route) => (
                <Menu route={route} activeRoute={activeRoute} />
              ))
            : protectedRoutes.map((route) => (
                <Menu route={route} activeRoute={activeRoute} />
              ))}
        </div>
        <div className="hidden sm:block">
          {loggedUser._id === "" ? (
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
                theme="yellow"
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
                  navigate("/store");
                }}
                className="font-medium flex items-center gap-2"
              >
                <PiWallet />
                {location.pathname.includes("payment") ? (
                  <AiOutlineLoading3Quarters className="animate-spin text-white" />
                ) : (
                  `$${loggedUser?.wallet?.toFixed(2)}`
                )}{" "}
                credits
              </Button>
              {loggedUser.id !== "" && (
                <div className="flex gap-2 items-center cursor-pointer">
                  <TbShoppingCartDollar />
                  Cart
                </div>
              )}
              <div className="flex gap-2 items-center user-dd-menu-trigger py-4">
                <FaRegUserCircle />
                <div className="flex gap-1 items-center">
                  {loggedUser.name}
                  <MdKeyboardArrowDown className="text-xl" />
                </div>
                <ul className="user-dd-menu">
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium"
                    onClick={() => navigate("/my-account/account-details")}
                  >
                    My Profile
                  </li>
                  {/* <li
                    className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium"
                    onClick={() => navigate("/cart")}
                  >
                    Cart
                  </li> */}
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium"
                    onClick={() => navigate("/store")}
                  >
                    Store
                  </li>
                  <li
                    className="cursor-pointer px-4 py-2 hover:bg-yellow hover:text-darkblack font-medium rounded-bl-sm rounded-br-sm"
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
