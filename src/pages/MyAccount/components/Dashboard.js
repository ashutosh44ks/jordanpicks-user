import React from "react";
import { useOutletContext } from "react-router-dom";

const Dashboard = () => {
  const user = useOutletContext();
  return (
    <div>
      <h3>Dashboard</h3>
      <div className="flex flex-gap gap-6 my-8">
        <div>
          <h4>Total Wins</h4>
          <h2 className="text-center">{user.totalWins}</h2>
        </div>
        <div>
          <h4>Total Losses</h4>
          <h2 className="text-center">{user.totalLosses}</h2>
        </div>
        <div>
          <h4>Total Ties</h4>
          <h2 className="text-center">{user.totalTies}</h2>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
