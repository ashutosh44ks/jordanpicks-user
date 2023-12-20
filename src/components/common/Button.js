import React from "react";
import "./button.css"

const Button = ({
  className = "",
  onClick = () => {},
  theme = "blue",
  size = "md",
  rounded = "md",
  type = "button",
  children,
}) => {
  return (
    <button
      className={`btn btn-${theme} btn-${size} btn-rounded-${rounded} ${className}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
