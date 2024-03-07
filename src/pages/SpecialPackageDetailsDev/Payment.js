import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PaymentUI from "../Payment/components/PaymentUI";

const Payment = () => {
  const location = useLocation();
  const { id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const userId = searchParams.get("userId");
  const plan = searchParams.get("plan");
  const [status, setStatus] = useState("");
  const validatePayment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}user/validatePaymentSpecialPackage?id=${userId}`,
        {
          paymentIntentId: paymentIntentId,
          packageId: id,
          plan,
        }
      );
      console.log(data);
      setStatus(data.status);
    } catch (error) {
      console.log(error);
      setStatus("failed");
    }
  };

  return <PaymentUI status={status} validatePayment={validatePayment} />;
};

export default Payment;