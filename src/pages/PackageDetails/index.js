import { useState, useEffect, useRef, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import PassContext from "../../components/utils/PassContext";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Stripe from "./components/Stripe";
import Banner from "./components/Banner";
import Modal from "../../components/common/Modal";
import Button from "../../components/common/Button";
import SkeletonLines from "../../components/common/SkeletonLines";
import ProfitGuarantee from "../Packages/components/ProfitGuarantee";
import "./packagedetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const { loggedUser, getProfileShort } = useContext(PassContext);
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getPackageDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getPackage/${id}`);
      console.log(data);
      setPackageDetails({
        ...data.dta,
        isBought: data.isBought,
        defaultDiscount: loggedUser.defaultDiscount,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loggedUser._id) getPackageDetails();
  }, [loggedUser]);

  const [cardDeduction, setCardDeduction] = useState(0);
  const [walletDeduction, setWalletDeduction] = useState(0);
  useEffect(() => {
    if (
      loggedUser.wallet !== undefined &&
      loggedUser.defaultDiscount !== undefined &&
      packageDetails._id
    ) {
      const newPrice =
        packageDetails.price -
        packageDetails.price * (loggedUser.defaultDiscount / 100);
      if (loggedUser.wallet < newPrice) {
        setCardDeduction(newPrice - loggedUser.wallet);
        setWalletDeduction(loggedUser.wallet);
      }
    }
  }, [packageDetails, loggedUser.wallet, loggedUser.defaultDiscount]);

  const [paymentRoute, setPaymentRoute] = useState("");
  const [walletLoading, setWalletLoading] = useState(false);
  const payWithWallet = async () => {
    setWalletLoading(true);
    try {
      const { data } = await api.post("/user/walletWithdrawPackage", {
        packageId: packageDetails._id,
        amount:
          packageDetails.price -
          packageDetails.price * (loggedUser.defaultDiscount / 100),
      });
      console.log(data);
      getProfileShort();
      navigate("/my-account/transactions");
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

  return (
    <>
      <div>
        <Banner
          packageDetails={packageDetails}
          setPaymentRoute={setPaymentRoute}
          wallet={loggedUser.wallet}
          loading={loading}
        />
        <div className="pack-details">
          <div>
            <h4 className="mb-2">Package Details</h4>
            {loading ? (
              <SkeletonLines lines={5} />
            ) : (
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
                <Link to="/contact-us" className="text-yellow font-medium">
                  Contact us
                </Link>{" "}
                for more details.
              </div>
            )}
          </div>
          <div className="text-lightgrey2">
            <h4 className="mb-2 font-medium text-yellow">
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
                After payment, $
                {(
                  packageDetails.price -
                  packageDetails.price * (loggedUser.defaultDiscount / 100)
                ).toFixed(2)}{" "}
                will be deducted from your wallet.
              </p>
              <div className="flex justify-end mt-4">
                <Button
                  theme="yellow"
                  size="md"
                  className="w-full font-semibold"
                  rounded="md"
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
