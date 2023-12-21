import React from 'react'
import { useOutletContext } from "react-router-dom";

const Orders = () => {
  const user = useOutletContext();
  return (
    <div>Orders</div>
  )
}

export default Orders