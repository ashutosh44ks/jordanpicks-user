import { useState } from "react";
import { useNavigate } from "react-router-dom";
import encryptData from "../../../components/utils/encryptData";
import api from "../../../components/utils/api";
import PaymentCard from "../../../components/common/PaymentCard";

const Authorize = ({ cardDeduction, walletDeduction, loggedUser }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const authorizePayment = async (cardNumber, cardExpiryDate, cardCvc) => {
    setIsLoading(true);
    const encryptedCardDetails = encryptData(
      `${cardNumber},${cardExpiryDate},${cardCvc}`
    );
    try {
      const { data } = await api.post("/user/paymentCartAuthorize", {
        encryptedCardDetails,
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
        `/payment/cart?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}userId=${loggedUser._id}&status=failed&message=${error?.response?.data?.error}`
      );
    }
    setIsLoading(false);
  };

  return <PaymentCard isLoading={isLoading} submitFn={authorizePayment} />;
};

export default Authorize;
