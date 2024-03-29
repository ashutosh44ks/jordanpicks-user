import { useState } from "react";
import Button from "./Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const PaymentCard = ({ isLoading, submitFn }) => {
  const handleCardNumberChange = (event) => {
    // Get the user's input
    const userInput = event.target.value;

    // Remove any existing spaces for cleaner formatting
    const numberWithoutSpaces = userInput.replace(/\s/g, "");

    // Return if it contains any non-digit characters
    if (/\D/.test(numberWithoutSpaces)) return;

    // Limit input length to prevent exceeding typical card number length of 16
    const limitedNumber = numberWithoutSpaces.slice(0, 16);

    // Add spaces after every 4th digit (except the last 4)
    let formattedNumber = "";
    for (let i = 0; i < limitedNumber.length; i += 4) {
      const chunk = limitedNumber.slice(i, i + 4);
      formattedNumber += chunk;
      if (i < limitedNumber.length - 4) {
        formattedNumber += " "; // Add space except for the last 4 digits
      }
    }

    // Update the state with the formatted card number
    setCardNumber(formattedNumber);
  };
  const handleCardExpiryChange = (event) => {
    // Get the user's input
    const userInput = event.target.value;

    // Remove any non-digit characters
    const numberOnly = userInput.replace(/\D/g, "");

    // If the user is deleting characters, remove the last character
    if (userInput.length < cardExpiryDate?.length) {
      setCardExpiryDate(numberOnly);
      return;
    }

    // Format the input as MM/YY
    if (numberOnly.length <= 2) {
      if (parseInt(numberOnly) > 12) {
        setCardExpiryDate(`0${numberOnly.slice(0, 1)}/${numberOnly.slice(1)}`);
      } else {
        setCardExpiryDate(numberOnly);
      }
    } else {
      if (parseInt(numberOnly.slice(0, 2)) > 12) {
        setCardExpiryDate(
          `0${numberOnly.slice(0, 1)}/${numberOnly.slice(1, 4)}`
        );
      } else {
        setCardExpiryDate(
          `${numberOnly.slice(0, 2)}/${numberOnly.slice(2, 4)}`
        );
      }
    }
  };
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiryDate, setCardExpiryDate] = useState(null);
  const [cardCvc, setCardCvc] = useState(null);
  const [message, setMessage] = useState(null);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        let formattedCardNumber = cardNumber.replace(/\s/g, "");
        let formattedCardExpiryDate = cardExpiryDate.replace(/\//g, "");

        if (formattedCardNumber.length !== 16) {
          setMessage("Card number must be 16 digits.");
          return;
        }
        if (formattedCardExpiryDate.length !== 4) {
          setMessage("Expiry date must be in MM/YY format.");
          return;
        }
        if (cardCvc.length !== 3) {
          setMessage("CVC must be 3 digits.");
          return;
        }
        // const currentYear = +new Date().getFullYear().toString().slice(-2);
        // const currentMonth = new Date().getMonth() + 1;
        // const cardYear = +formattedCardExpiryDate.slice(2, 4);
        // const cardMonth = +formattedCardExpiryDate.slice(0, 2);
        // if (
        //   cardYear < currentYear ||
        //   (cardYear === currentYear && cardMonth < currentMonth)
        // ) {
        //   setMessage("Card is expired.");
        //   return;
        // }

        submitFn(formattedCardNumber, formattedCardExpiryDate, cardCvc);
      }}
    >
      <div className="mb-4">
        <label className="text-sm">Card Number</label>
        <input
          type="text"
          className="py-2 px-4 w-full"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm">Expiration</label>
          <input
            type="text"
            className="py-2 px-4 w-full"
            value={cardExpiryDate}
            onChange={handleCardExpiryChange}
            onClick={(e) => e.target.select()}
          />
        </div>
        <div className="flex-1">
          <label className="text-sm">CVC</label>
          <input
            type="password"
            className="py-2 px-4 w-full"
            value={cardCvc}
            onChange={(e) => {
              if (/^\d*$/.test(e.target.value)) setCardCvc(e.target.value);
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
      {message && <p className="text-lightgrey2 mt-2">{message}</p>}
    </form>
  );
};

export default PaymentCard;
