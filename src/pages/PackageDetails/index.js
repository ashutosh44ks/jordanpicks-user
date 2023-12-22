import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Banner from "./components/Banner";
import Stripe from "./components/Stripe";
import api from "../../components/utils/api";

const PackageDetails = () => {
  const { id } = useParams();

  const [packageDetails, setPackageDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getPackageDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getPackage/${id}`);
      console.log(data);
      // check for package id in api not userid @ankit
      setPackageDetails(data.dta);
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

  return (
    <>
      <div>
        <Banner
          packageDetails={packageDetails}
          wallet={wallet}
          loading={loading}
        />
        <div className="p-16">
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
            Bets will shown after purchase only.{" "}
            <Link to="/contact-us" className="text-blue2 font-medium">
              Contact us
            </Link>{" "}
            for more details.
          </div>
        </div>
      </div>
      <div className="my-64">
        <Stripe
          amount={wallet - packageDetails.price}
          packageId={packageDetails._id}
          packageName={packageDetails.name}
        />
      </div>
    </>
  );
};

export default PackageDetails;
