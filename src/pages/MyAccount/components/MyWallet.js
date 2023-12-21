import React from "react";
import { useOutletContext } from "react-router-dom";

const MyWallet = () => {
  const { user } = useOutletContext();
  return (
    <div>
      <h3>Your wallet balance</h3>
      <h2>${user.wallet.toFixed(2)}</h2>
    </div>
  );
};

export default MyWallet;
