import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathnames = location.pathname
    .split("/")
    .filter((path) => path !== "" && path.length !== 24);
  return (
    <ul className="flex gap-2 text-sm">
      <li>Admin</li>
      <li>/</li>
      {pathnames.length > 0 ? (
        pathnames.map((path, index) => (
          <ul className="flex gap-2 text-sm" key={path}>
            <li
              className={`capitalize ${
                index + 1 !== pathnames.length ? "cursor-pointer" : ""
              }`}
              onClick={() => {
                if (index + 1 !== pathnames.length) {
                  let x = pathnames.slice(0, index + 1).join("/");
                  navigate(x);
                }
              }}
            >
              {path.replaceAll("-", " ")}
            </li>
            {index + 1 !== pathnames.length && <li>/</li>}
          </ul>
        ))
      ) : (
        <li>Dashboard</li>
      )}
    </ul>
  );
};

export default Breadcrumbs;
