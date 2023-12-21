import React from "react";
import { useOutletContext } from "react-router-dom";

const PaymentMethods = () => {
  const {user} = useOutletContext();
  return (
    <div>
      <h3>Transaction History</h3>
      <div className="my-8">
        static
      </div>
    </div>
  );
};

export default PaymentMethods;
