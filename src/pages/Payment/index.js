import { useState, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import PassContext from "../../components/utils/PassContext";
import axios from "axios";
import PaymentUI from "./components/PaymentUI";

const Payment = () => {
  const location = useLocation();
  const { getProfileShort } = useContext(PassContext);
  const { id } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const paymentIntentId = searchParams.get("payment_intent");
  const cardDeduction = searchParams.get("cardDeduction");
  const walletDeduction = searchParams.get("walletDeduction");
  const userId = searchParams.get("userId");
  const [status, setStatus] = useState("");
  const validatePayment = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BASE_API_URL}user/validatePaymentPackage?id=${userId}`,
        {
          paymentIntentId: paymentIntentId,
          packageId: id,
          walletDeduction,
          cardDeduction,
        }
      );
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
