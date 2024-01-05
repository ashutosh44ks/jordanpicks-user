import React from "react";

const SkeletonLines = ({ height, lines = 1, gap }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: gap || "0.5rem",
      }}
    >
      {[...Array(lines).keys()].map((_, index) => (
        <div
          style={{
            animation: `skeleton 0.5s ease-in-out ${index * 0.1}s forwards`,
            height: height || "1rem",
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default SkeletonLines;
