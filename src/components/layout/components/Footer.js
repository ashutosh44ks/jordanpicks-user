import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();

  const routes = [
    {
      name: "About Us",
      link: "/about-us",
    },
    {
      name: "Contact Us",
      link: "/contact-us",
    },
    {
      name: "FAQs",
      link: "#",
    },
    {
      name: "Terms & Conditions",
      link: "/terms",
    },
  ];
  const socials = [
    <FaFacebookF />,
    <FaTwitter />,
    <FaInstagram />,
    <FaYoutube />,
  ];

  return (
    <footer>
      <div className="flex justify-between items-center gap-x-8 w-full flex-col md:flex-row mb-4">
        <img src="/assets/nLogo.png" alt="logo" className="h-16" />
        <ul className="xs:flex">
          {routes.map((route) => (
            <li
              key={route.name}
              className="route-item"
              onClick={() => navigate(route.link)}
            >
              {route.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-between items-center gap-x-8 gap-y-2 w-full flex-col-reverse md:flex-row">
        <p>Copyright Jordanspicks. All Rights Reserved.</p>
        <ul className="flex items-center">
          {socials.map((social, index) => (
            <li key={index} className="route-item">
              {social}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Header;
