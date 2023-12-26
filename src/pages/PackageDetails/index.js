import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Banner from "./components/Banner";
import Stripe from "./components/Stripe";
import api from "../../components/utils/api";
import Modal from "../../components/common/Modal";
import "./packagedetails.css";

const PackageDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [packageDetails, setPackageDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getPackageDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getPackage/${id}`);
      console.log(data);
      setPackageDetails({ ...data.dta, isBought: data.isBought });
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
      if (wallet < packageDetails.price) {
        setCardDeduction(packageDetails.price - wallet);
        setWalletDeduction(wallet);
      }
    }
  }, [packageDetails, wallet]);

  const [paymentRoute, setPaymentRoute] = useState("");
  const payWithWallet = async () => {
    try {
      // confirm payment first from user only then if he says yes then make the api call
      const confirmation = window.confirm(
        `Are you sure you want to pay with wallet?
        You have $${wallet} in your wallet.
        $${packageDetails.price} will be deducted from your wallet.
        `
      );
      if (!confirmation) {
        setPaymentRoute("");
        return;
      }
      const { data } = await api.post("/user/walletWithdraw", {
        packageId: packageDetails._id,
      });
      console.log(data);
      navigate("/my-account/orders");
    } catch (err) {
      console.log(err);
    }
  };
  const dialogRef = useRef();
  useEffect(() => {
    if (paymentRoute === "wallet") payWithWallet();
    else if (paymentRoute === "stripe") dialogRef.current.showModal();
  }, [paymentRoute]);

  return (
    <>
      <div>
        <Banner
          packageDetails={packageDetails}
          setPaymentRoute={setPaymentRoute}
          wallet={wallet}
          loading={loading}
        />
        <div className="pack-details">
          <div>
            <h3>Package Details</h3>
            <hr className="my-4" />
            <div
              className="limit-to-5-lines"
              dangerouslySetInnerHTML={{ __html: packageDetails.description }}
            ></div>
          </div>
          <div className="my-8">
            <h3>Bets</h3>
            <hr className="my-2" />
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
                Bets will shown after purchase only.{" "}
                <Link to="/contact-us" className="text-blue2 font-medium">
                  Contact us
                </Link>{" "}
                for more details.
              </div>
            )}
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
    </>
  );
};

export default PackageDetails;
