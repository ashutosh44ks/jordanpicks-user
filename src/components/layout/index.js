import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./layout.css";

const Layout = () => {
  return (
    <div>
      <Header />
      <div className="page-layout">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
