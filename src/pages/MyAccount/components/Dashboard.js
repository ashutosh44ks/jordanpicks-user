import React from "react";
import { useOutletContext } from "react-router-dom";
import { RiAwardFill } from "react-icons/ri";
import { AiFillCloseSquare } from "react-icons/ai";
import { TiEquals } from "react-icons/ti";

const Dashboard = () => {
  const user = useOutletContext();
  return (
    <div>
      <h3>Dashboard</h3>
      {!user?.user?.bonus && (
        <div className="mt-4 mb-8 text-sm bg-white rounded-xl p-4 w-full border border-lightgrey4">
          You have
          <span className="font-medium text-pink"> $25 bonus </span>
          (check registered email to claim bonus)
        </div>
      )}
      <div className="flex flex-gap gap-6 my-8 flex-wrap">
        <div className="dashboard-item">
          <label>
            <RiAwardFill />
          </label>
          <h2 className="text-center">{user.totalWins}</h2>
          <p className="text-center font-medium">Total Wins</p>
        </div>
        <div className="dashboard-item">
          <label>
            <AiFillCloseSquare />
          </label>
          <h2 className="text-center">{user.totalLosses}</h2>
          <p className="text-center font-medium">Total Losses</p>
        </div>
        <div className="dashboard-item">
          <label>
            <TiEquals />
          </label>
          <h2 className="text-center">{user.totalTies}</h2>
          <p className="text-center font-medium">Total Ties</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
