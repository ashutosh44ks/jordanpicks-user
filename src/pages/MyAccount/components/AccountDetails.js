import React from 'react'
import { useOutletContext } from "react-router-dom";

const AccountDetails = () => {
  const user = useOutletContext();
  return (
    <div>AccountDetails</div>
  )
}

export default AccountDetails