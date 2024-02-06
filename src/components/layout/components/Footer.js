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
      link: "/faq",
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
      <div className="flex justify-between items-center gap-x-8 w-full flex-col md:flex-row md:mb-4">
        <img
          src="/assets/nLogo.png"
          alt="logo"
          className="h-20 cursor-pointer"
          onClick={() => navigate("/")}
        />
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
      <div className="flex items-center justify-between gap-2 my-4 md:mb-4 flex-col-reverse md:flex-row">
        <div className="text-sm md:w-3/4">
          <p className="text-center md:text-left">
            If you or someone you know has a gambling problem, crisis counseling
            and referral services can be accessed by calling 1-800-GAMBLER
            (1-800-426-2537).
          </p>
          <p className="text-center md:text-left mt-1">
            Before using this site and any featured services, please ensure you
            understand and comply with your local laws. Jordans Picks doesn’t
            guide on the legality of online betting or gambling in your area.
            You’re responsible for adhering to laws applicable to you. Jordans
            Picks isn’t liable for your use of this site or its information. By
            using this site, you agree to not hold the site owner accountable
            for any claims related to services on featured third-party sites.
          </p>
        </div>
        <div className="md:w-1/4 flex justify-end">
          <div className="py-3 px-4 border-2 border-pink rounded-full text-pink flex flex-col items-center">
            <div className="font-bold text-xl">21+</div>
            <div className="text-xs">ONLY</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center gap-x-8 gap-y-2 w-full flex-col-reverse md:flex-row">
        <p className="text-sm">Copyright Jordanspicks. All Rights Reserved.</p>
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
