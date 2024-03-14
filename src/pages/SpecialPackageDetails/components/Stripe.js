import React, { useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import api from "../../../components/utils/api";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CheckoutForm = ({ packageId, loggedUser, plan }) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [cardNumberElement, setCardNumberElement] = useState(null);
  const [cardExpiryElement, setCardExpiryElement] = useState(null);
  const [cardCvcElement, setCardCvcElement] = useState(null);

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const createSubscription = async () => {
    setIsLoading(true);
    try {
      // create a payment method
      const cardNumberElement = elements?.getElement(CardNumberElement);
      const cardExpiryElement = elements?.getElement(CardExpiryElement);
      const cardCvcElement = elements?.getElement(CardCvcElement);

      if (cardNumberElement && cardExpiryElement && cardCvcElement) {
        const paymentMethod = await stripe?.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
          billing_details: {
            name: loggedUser.name,
            email: loggedUser.email,
          },
        });
        if (paymentMethod.error) {
          setMessage(paymentMethod.error.message);
          setIsLoading(false);
          return;
        }
        let url = "";
        if (plan === "monthly") url = "/user/createReccuringOrderMonthly";
        else if (plan === "yearly") url = "/user/createReccuringOrderYearly";
        const { data } = await api.post(url, {
          specialPackageId: packageId,
          paymentMethod: paymentMethod?.paymentMethod?.id,
        });
        const confirmPayment = await stripe?.confirmCardPayment(data.dta);

        if (confirmPayment?.error) {
          setMessage(confirmPayment.error.message);
        } else {
          const paymentIntentId = confirmPayment.paymentIntent.id;
          window.location.href = `${process.env.REACT_APP_BASE_URL}special-packages/${packageId}/payment?payment_intent=${paymentIntentId}&userId=${loggedUser._id}&plan=${plan}`;
        }
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const paymentElementOptions = {
    style: {
      base: {
        color: "white",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#888",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form
      id="payment-form"
      onSubmit={(e) => {
        e.preventDefault();
        createSubscription();
      }}
    >
      <div>
        <label className="text-sm">Card Number</label>
        <div
          className="bg-[#30313D] p-3 rounded mb-4"
          onClick={() => {
            cardNumberElement?.focus();
          }}
        >
          <CardNumberElement
            options={paymentElementOptions}
            onReady={(element) => {
              setCardNumberElement(element);
            }}
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="text-sm">Expiration</label>
          <div
            className="bg-[#30313D] p-3 rounded mb-4"
            onClick={() => {
              cardExpiryElement?.focus();
            }}
          >
            <CardExpiryElement
              options={paymentElementOptions}
              onReady={(element) => {
                setCardExpiryElement(element);
              }}
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-sm">CVC</label>
          <div
            className="bg-[#30313D] p-3 rounded mb-4"
            onClick={() => {
              cardCvcElement?.focus();
            }}
          >
            <CardCvcElement
              options={paymentElementOptions}
              onReady={(element) => {
                setCardCvcElement(element);
              }}
            />
          </div>
        </div>
      </div>
      <Button
        theme="yellow"
        className="w-full font-medium mt-4 flex justify-center"
        id="submit"
        disabled={isLoading || !stripe || !elements}
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
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeComponent = ({ packageId, plan }) => {
  const { loggedUser } = useContext(PassContext);

  if (stripePromise)
    return (
      <Elements stripe={stripePromise}>
        <CheckoutForm
          packageId={packageId}
          loggedUser={loggedUser}
          plan={plan}
        />
      </Elements>
    );
};
export default StripeComponent;
