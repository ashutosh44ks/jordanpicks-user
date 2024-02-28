import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  PaymentElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import api from "../../../components/utils/api";
import PassContext from "../../../components/utils/PassContext";

const CheckoutForm = ({ loggedUser, cardDeduction, walletDeduction }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
    if (!clientSecret) {
      console.log("No client secret found in query string");
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Stripe.js hasn't yet loaded.
    // Make sure to disable form submission until Stripe.js has loaded.
    if (!stripe || !elements) return;

    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.REACT_APP_BASE_URL}cart/payment?cardDeduction=${cardDeduction}&walletDeduction=${walletDeduction}&userId=${loggedUser._id}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    console.log(error);
    if (error.type === "card_error" || error.type === "validation_error")
      setMessage(error.message);
    else setMessage("An unexpected error occurred.");

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" options={paymentElementOptions} />
      <button
        className="w-full font-medium mt-4 btn btn-yellow btn-md hover:bg-yellow2 rounded-md"
        disabled={isLoading || !stripe || !elements}
        id="submit"
      >
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const StripeComponent = ({ cardDeduction, walletDeduction }) => {
  const { loggedUser } = useContext(PassContext);
  const [clientSecret, setClientSecret] = useState("");

  const createIntent = async () => {
    try {
      const { data } = await api.post("/user/createIntentCart", {
        amount: cardDeduction.toFixed(2),
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    createIntent();
  }, []);

  const appearance = {
    theme: "night",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm
            loggedUser={loggedUser}
            cardDeduction={cardDeduction}
            walletDeduction={walletDeduction}
          />
        </Elements>
      )}
    </>
  );
};
export default StripeComponent;
