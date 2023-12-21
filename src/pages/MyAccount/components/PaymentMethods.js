import React from 'react'
import { useOutletContext } from "react-router-dom";

const PaymentMethods = () => {
  const user = useOutletContext();
  return (
    <div>PaymentMethods</div>
  )
}

export default PaymentMethods