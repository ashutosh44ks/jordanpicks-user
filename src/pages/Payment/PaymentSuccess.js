import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../components/utils/api";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const [status, setStatus] = useState("");
  const validatePayment = async () => {
    try {
      const { data } = await api.post("/user/validatePayment", {
        paymentIntentId: paymentIntentId,
      });
      console.log(data);
      setStatus(data.status);
      setTimeout(() => {
        navigate("/my-account/orders");
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    validatePayment();
  }, []);

  return (
    <div>
      <h1>Payment</h1>
      {status === "" ? (
        <p>
          Please wait while we validate your payment. You will be redirected to
          your dashboard shortly.
        </p>
      ) : status === "succeeded" ? (
        <p>
          Payment Successful. You will be redirected to your dashboard shortly.
        </p>
      ) : (
        <p>Payment Failed. You will be redirected to your dashboard shortly.</p>
      )}
    </div>
  );
};

export default Payment;
