import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import api from "../../components/utils/api";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";
import { GoDotFill } from "react-icons/go";

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
        navigate("/my-account/transactions");
      }, 5000);
    } catch (error) {
      console.log(error);
      setStatus("failed");
    }
  };
  const [numberOfDots, setNumberOfDots] = useState(0);
  useEffect(() => {
    validatePayment();
    const myInterval = setInterval(() => {
      setNumberOfDots((numberOfDots) => (numberOfDots + 1) % 4);
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="mb-8">
        Payment <span className="text-yellow">Validation</span>
      </h2>
      {status === "" ? (
        <div>
          <h3 className="flex justify-center mb-2">
            <GoDotFill className="text-yellow" />
            <GoDotFill
              className={`text-yellow ${
                numberOfDots >= 1 ? "opacity-100" : "opacity-50"
              }`}
            />
            <GoDotFill
              className={`text-yellow ${
                numberOfDots >= 2 ? "opacity-100" : "opacity-50"
              }`}
            />
            <GoDotFill
              className={`text-yellow ${
                numberOfDots >= 3 ? "opacity-100" : "opacity-50"
              }`}
            />
          </h3>
          <p className="text-center">
            Please wait while we validate your payment.
          </p>
          <p className="text-center">Do NOT refresh the page or go back.</p>
        </div>
      ) : status === "succeeded" ? (
        <div>
          <h3 className="font-medium flex justify-center items-center gap-2 mb-2">
            <RiCheckboxCircleLine className="text-yellow" />
            Payment Successful
          </h3>
          <p className="text-center text-lightgrey2">
            You will be redirected to your dashboard shortly.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="font-medium flex justify-center items-center gap-2 mb-2">
            <RxCrossCircled className="text-yellow" />
            Payment Failed
          </h3>
          <p className="text-center text-lightgrey2">
            Please copy the url and mention it while you raise an issue in the
            support page.
          </p>
          <p className="text-center text-lightgrey2">
            We will get back to you shortly.
          </p>
        </div>
      )}
    </div>
  );
};

export default Payment;
