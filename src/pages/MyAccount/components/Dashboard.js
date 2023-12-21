import React from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const user = useOutletContext();
  return <div>Dashboard</div>;
};

export default Dashboard;
