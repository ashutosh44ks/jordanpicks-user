import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../components/utils/api";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const cardDeduction = searchParams.get("cardDeduction");
  const walletDeduction = searchParams.get("walletDeduction");
  const [status, setStatus] = useState("");
  const validatePayment = async () => {
    try {
      const { data } = await api.post("/user/validatePaymentPackage", {
        paymentIntentId: paymentIntentId,
        packageId: id,
        walletDeduction,
        cardDeduction,
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
    <div className="p-16">
      <h2 className="mb-8">Payment Redirection</h2>
      {status === "" ? (
        <div className="mb-4">
          <p>Please wait while we validate your payment.</p>
          <p>
            Do NOT refresh the page or go back. In case of any issues, please
            contact us.
          </p>
        </div>
      ) : status === "succeeded" ? (
        <p className="font-medium text-blue">Payment Successful</p>
      ) : (
        <p className="font-medium text-red-600">Payment Failed</p>
      )}
      <p>You will be redirected to your dashboard shortly.</p>
    </div>
  );
};

export default Payment;
