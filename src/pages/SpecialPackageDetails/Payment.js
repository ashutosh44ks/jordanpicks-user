import { useState } from "react";
import { useUserContext } from "../../components/utils/useUserContext";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import PaymentUI from "../Payment/components/PaymentUI";

const Payment = () => {
  const location = useLocation();
  const { id } = useParams();
  const { getProfileShort } = useUserContext();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const userId = searchParams.get("userId");
  const plan = searchParams.get("plan");
  const [status, setStatus] = useState("");
  const validatePayment = async () => {
    let url = "";
    if (plan === "monthly")
      url = `${process.env.REACT_APP_BASE_API_URL}user/validPaymentReccuringOrderMonthly`;
    else if (plan === "yearly")
      url = `${process.env.REACT_APP_BASE_API_URL}user/validPaymentReccuringOrderYearly`;
    try {
      const { data } = await axios.post(`${url}?id=${userId}`, {
        paymentIntentId,
        packageId: id,
      });
      console.log(data);
      setStatus(data.status);
      getProfileShort();
    } catch (error) {
      console.log(error);
      setStatus("failed");
    }
  };

  return <PaymentUI status={status} validatePayment={validatePayment} />;
};

export default Payment;
