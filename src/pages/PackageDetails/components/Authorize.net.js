import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../components/utils/api";
import Button from "../../../components/common/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Authorize = ({
  packageId,
  cardDeduction,
  walletDeduction,
  loggedUser,
}) => {
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState(null);
  const [cardExpiryDate, setCardExpiryDate] = useState(null);
  const [cardCvc, setCardCvc] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const authorizePayment = async () => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/user/buyPackageAuthorize", {
        packageId,
        cardNumber,
        cardExpiryDate,
        cardCvc,
        cardDeduction,
        walletDeduction,
      });
      console.log(data);
      setMessage("Payment succeeded!");
      navigate(
        `packages/${packageId}/payment?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}&userId=${loggedUser._id}`
      );
    } catch (error) {
      console.log(error);
      setMessage(error?.response?.data?.error);
    }
    setIsLoading(false);
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => {
        e.preventDefault();
        authorizePayment();
      }}
    >
      <div className="mb-4">
        <label className="text-sm">Card Number</label>
        <input
          type="text"
          className="py-2 px-4 w-full"
          value={cardNumber}
          onChange={(e) => {
            let newVal = e.target.value;
            if (newVal.length <= 16 && !isNaN(newVal)) setCardNumber(newVal);
          }}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm">Expiration</label>
          <input
            type="text"
            className="py-2 px-4 w-full"
            value={cardExpiryDate}
            onChange={(e) => {
              let newVal = e.target.value;
              setCardExpiryDate(newVal);
            }}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm">CVC</label>
          <input
            className="py-2 px-4 w-full"
            value={cardCvc}
            onChange={(e) => {
              if(!isNaN(e.target.value))
              setCardCvc(e.target.value);
            }}
            maxLength={3}
          />
        </div>
      </div>
      <Button
        theme="yellow"
        className="w-full font-medium mt-4 flex justify-center"
        id="submit"
        disabled={isLoading}
        type="submit"
      >
        <span id="button-text">
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            "Pay now"
          )}
        </span>
      </Button>
      {message && <div>{message}</div>}
    </form>
  );
};

export default Authorize;
