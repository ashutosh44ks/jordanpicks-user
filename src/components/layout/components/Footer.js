import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PassContext from "../../utils/PassContext";

const Header = () => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(PassContext);

  const routes = [
    {
      name: "Packages",
      link: "/packages",
      protected: false,
    },
    {
      name: "My Purchases",
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
    {
      name: "Terms & Conditions",
      link: "/terms",
      protected: false,
    },
  ];

  return (
    <footer className="relative">
      <div className="absolute top-[-4rem]">
        <img src="/assets/logo.png" alt="logo" className="h-28 w-28" />
      </div>
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
      <hr
        className="w-full my-4"
        style={{
          border: "solid 1px var(--grey)",
        }}
      />
      <div className="text-sm">Copyright © 2023. All right reserved</div>
    </footer>
  );
};

export default Header;
