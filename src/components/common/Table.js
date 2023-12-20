import React from "react";
import "./table.css";

const Table = ({ tHead = [], wrapperClass = "", children }) => {
  return (
    <div className={`w-full overflow-x-auto ${wrapperClass}`}>
      <table className="w-full">
        <thead>
          <tr>
            {tHead.map((item, index) => (
              <th key={index}>{item}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
