import React from "react";
import { useOutletContext } from "react-router-dom";

const MyWallet = () => {
  const { user } = useOutletContext();
  return (
    <div>
      <h5>Your wallet balance</h5>
      <h3>{user.wallet}</h3>
    </div>
  );
};

export default MyWallet;
