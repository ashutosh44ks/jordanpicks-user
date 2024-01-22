import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showSidebar, activeRoute, loggedUser, logout }) => {
  const navigate = useNavigate();
  const data = [
    {
      name: "Home",
      link: "/",
      func: () => navigate("/"),
      show: true,
    },
    {
      name: "Contact Us",
      link: "/contact-us",
      func: () => navigate("/contact-us"),
      show: true,
    },
    {
      name: "FAQs",
      link: "/faq",
      func: () => navigate("/faq"),
      show: true,
    },
    {
      name: "Login",
      link: "/auth/login",
      func: () => navigate("/auth/login"),
      show: !loggedUser,
    },
    {
      name: "Register",
      link: "/auth/register",
      func: () => navigate("/auth/register"),
      show: !loggedUser,
    },
    {
      name: "Logout",
      func: logout,
      link: "#",
      show: loggedUser,
    },
  ];
  return (
    <aside className={`routes-sidebar ${showSidebar ? "show" : ""}`}>
      {data.map((route, index) => (
        <div
          key={index}
          className={`${route.show ? "block" : "hidden"} ${
            activeRoute === route.link ? "active" : "cursor-pointer"
          } text-center py-8 text-2xl`}
          onClick={route.func}
        >
          {route.name}
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;
