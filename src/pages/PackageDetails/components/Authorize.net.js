import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../components/utils/api";
import PaymentCard from "../../../components/common/PaymentCard";
import encryptData from "../../../components/utils/encryptData";

const Authorize = ({
  packageId,
  cardDeduction,
  walletDeduction,
  loggedUser,
}) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const authorizePayment = async (cardNumber, cardExpiryDate, cardCvc) => {
    setIsLoading(true);
    const encryptedCardDetails = encryptData(
      `${cardNumber},${cardExpiryDate},${cardCvc}`
    );
    try {
      const { data } = await api.post("/user/buyPackageAuthorize", {
        packageId,
        encryptedCardDetails,
        cardDeduction,
        walletDeduction,
      });
      console.log(data);
      navigate(
        `/payment/${packageId}?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}&userId=${loggedUser._id}&status=success`
      );
    } catch (error) {
      console.log(error);
      navigate(
        `/payment/${packageId}?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}&userId=${loggedUser._id}&status=failed&message=${error?.response?.data?.error}`
      );
    }
    setIsLoading(false);
  };

  return <PaymentCard isLoading={isLoading} submitFn={authorizePayment} />;
};

export default Authorize;
