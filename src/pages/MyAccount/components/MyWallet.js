import React from 'react'
import { useOutletContext } from "react-router-dom";

const MyWallet = () => {
  const user = useOutletContext();
  return (
    <div>MyWallet</div>
  )
}

export default MyWallet