import { useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import PassContext from "../../components/utils/PassContext";
import PaymentUI from "./components/PaymentUI";

const Payment = () => {
  const location = useLocation();
  const { getProfileShort } = useContext(PassContext);

  const searchParams = new URLSearchParams(location.search);
  const [status, setStatus] = useState("");
  const validatePayment = () => {
    setTimeout(() => setStatus(searchParams.get("status")), 2500);
    getProfileShort();
  };

  return (
    <PaymentUI
      status={status}
      validatePayment={validatePayment}
      message={searchParams.get("message")}
    />
  );
};

export default Payment;
