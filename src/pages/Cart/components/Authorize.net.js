import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../components/utils/api";
import PaymentCard from "../../../components/common/PaymentCard";

const Authorize = ({ cardDeduction, walletDeduction, loggedUser }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const authorizePayment = async (cardNumber, cardExpiryDate, cardCvc) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/user/paymentCartAuthorize", {
        cardNumber,
        cardExpiryDate,
        cardCvc,
        cardDeduction,
        walletDeduction,
      });
      console.log(data);
      navigate(
        `/payment/cart?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}userId=${loggedUser._id}&status=success`
      );
    } catch (error) {
      console.log(error);
      navigate(
        `/payment/cart?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}userId=${loggedUser._id}&status=failed`
      );
    }
    setIsLoading(false);
  };

  return <PaymentCard isLoading={isLoading} submitFn={authorizePayment} />;
};

export default Authorize;
