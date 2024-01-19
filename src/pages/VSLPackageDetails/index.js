import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCountdown } from "../../components/utils/useCountdown";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Stripe from "./components/Stripe";
import Banner from "./components/Banner";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import ProfitGuarantee from "../Packages/components/ProfitGuarantee";
import { PiShootingStarBold } from "react-icons/pi";
import "./vslpackagedetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState({});
  const [isLive, setIsLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const getPackageDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getVslPackage/${id}`);
      console.log(data);
      setPackageDetails({ ...data.dta, isBought: data.isBought });
      setIsLive(new Date(data.dta.startDate).getTime() < new Date().getTime());
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  const [wallet, setWallet] = useState(0);
  const getProfile = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      setWallet(data.dta.user.wallet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getPackageDetails();
  }, []);

  const [cardDeduction, setCardDeduction] = useState(0);
  const [walletDeduction, setWalletDeduction] = useState(0);
  useEffect(() => {
    if (wallet && packageDetails._id) {
      if (wallet < packageDetails.discountedPrice) {
        setCardDeduction(packageDetails.discountedPrice - wallet);
        setWalletDeduction(wallet);
      }
    }
  }, [packageDetails, wallet]);

  const [paymentRoute, setPaymentRoute] = useState("");
  const [walletLoading, setWalletLoading] = useState(false);
  const payWithWallet = async () => {
    setWalletLoading(true);
    try {
      const { data } = await api.post("/user/walletWithdrawVslPackage", {
        packageId: packageDetails._id,
      });
      console.log(data);
      navigate("/my-account/orders");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setWalletLoading(false);
  };
  const dialogRef = useRef();
  useEffect(() => {
    if (paymentRoute === "wallet" || paymentRoute === "stripe")
      dialogRef.current.showModal();
  }, [paymentRoute]);

  const startTimer = useCountdown(packageDetails.startDate);
  const endTimer = useCountdown(packageDetails.endDate);

  return (
    <>
      <div>
        <Banner
          packageDetails={packageDetails}
          setPaymentRoute={setPaymentRoute}
          wallet={wallet}
          loading={loading}
          isLive={isLive}
        />
        <div className="vsl-divider">
          <div className="flex justify-between items-center gap-2">
            <PiShootingStarBold className="text-3xl" />
            <h2>Limited Time Offer</h2>
            <PiShootingStarBold
              className="text-3xl"
              style={{
                transform: "scale(-1, 1)",
              }}
            />
          </div>
          <div className="flex justify-center mt-2">
            {isLive ? (
              <h4 className="text-center">
                Ends in {!loading && endTimer?.diffTimeData?.diffDay} days{" "}
                {!loading && endTimer?.diffTimeData?.diffHour} hours{" "}
                {!loading && endTimer?.diffTimeData?.diffMin} mins{" "}
                {!loading && endTimer?.diffTimeData?.diffSec} secs
              </h4>
            ) : (
              <h4 className="text-center">
                Starts in {!loading && startTimer?.diffTimeData?.diffDay} days{" "}
                {!loading && startTimer?.diffTimeData?.diffHour} hours{" "}
                {!loading && startTimer?.diffTimeData?.diffMin} mins{" "}
                {!loading && startTimer?.diffTimeData?.diffSec} secs
              </h4>
            )}
          </div>
        </div>
        <div className="pack-details">
          <div>
            <h4 className="mb-2">Package Details</h4>
            {!loading && (
              <div
                className="limit-to-5-lines"
                dangerouslySetInnerHTML={{ __html: packageDetails.description }}
              ></div>
            )}
          </div>
          <div className="my-8">
            <h4 className="mb-2">Bets</h4>
            {packageDetails.isBought ? (
              <ul className="list-disc ml-4">
                {packageDetails.bets.map((bet, index) => (
                  <li key={index} className="my-2">
                    {bet}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                Bets will shown here after purchase only.{" "}
                <Link to="/contact-us" className="text-pink font-medium">
                  Contact us
                </Link>{" "}
                for more details.
              </div>
            )}
          </div>
          <div className="text-lightgrey2">
            <h4 className="mb-2 font-medium text-pink">
              Profit Guarantee Rule
            </h4>
            <ProfitGuarantee />
          </div>
        </div>
      </div>
      {paymentRoute === "stripe" && (
        <Modal
          ref={dialogRef}
          title="Pay with Card"
          content={
            <Stripe
              packageId={packageDetails._id}
              packageName={packageDetails.name}
              cardDeduction={cardDeduction}
              walletDeduction={walletDeduction}
            />
          }
          closeDialog={() => {
            setPaymentRoute("");
          }}
        />
      )}
      {paymentRoute === "wallet" && (
        <Modal
          ref={dialogRef}
          title="Confim Payment"
          content={
            <div>
              <p>Are you sure you want to pay with wallet?</p>
              <p>
                After payment, ${packageDetails.discountedPrice} will be
                deducted from your wallet.
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  theme="pink"
                  rounded="none"
                  onClick={payWithWallet}
                  disabled={walletLoading}
                >
                  Confirm
                </Button>
              </div>
            </div>
          }
          closeDialog={() => {
            setPaymentRoute("");
          }}
        />
      )}
    </>
  );
};

export default PackageDetails;
