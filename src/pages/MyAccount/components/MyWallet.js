import React from "react";
import { useOutletContext } from "react-router-dom";

const MyWallet = () => {
  const { user } = useOutletContext();
  return (
    <div className="bg-white rounded-xl p-6 w-full border border-lightgrey4">
      <div className="mb-4">
        <h3>Your wallet balance</h3>
        <p>
          You can use your wallet balance to buy our packages.
        </p>
      </div>
      <h2>${user.wallet.toFixed(2)}</h2>
    </div>
  );
};

export default MyWallet;
