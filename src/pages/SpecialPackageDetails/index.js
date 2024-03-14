import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../../components/utils/api";
import Stripe from "./components/Stripe";
import Banner from "./components/Banner";
import Modal from "../../components/common/Modal";
import SkeletonLines from "../../components/common/SkeletonLines";
import ProfitGuarantee from "../Packages/components/ProfitGuarantee";
import "./specialpackagedetails.css";

const PackageDetails = () => {
  const { id } = useParams();

  const [packageDetails, setPackageDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const getPackageDetails = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/user/getSpecialPackage/${id}`);
      console.log(data);
      setPackageDetails({ ...data.dta, isBought: data.isBought });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getPackageDetails();
  }, []);

  const dialogRef = useRef();
  const [plan, setPlan] = useState("");

  return (
    <>
      <div>
        <Banner
          packageDetails={packageDetails}
          showModal={(plan) => {
            setPlan(plan);
            dialogRef.current.showModal();
          }}
          loading={loading}
        />
        <div className="pack-details">
          <div>
            <h4 className="mb-2">Package Details</h4>
            {loading ? (
              <SkeletonLines lines={5} />
            ) : (
              <div>
                <div
                  className="limit-to-5-lines"
                  dangerouslySetInnerHTML={{
                    __html: packageDetails.description,
                  }}
                ></div>

                {packageDetails.discount > 0 && (
                  <div>
                    Upon purchase, you will get a discount of{" "}
                    {packageDetails.discount}%.
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="my-8">
            <h4 className="mb-2">Links</h4>
            {packageDetails.isBought ? (
              <ul className="list-disc ml-4">
                {packageDetails.links.map((link, index) => (
                  <li key={index} className="my-2">
                    {link}
                  </li>
                ))}
              </ul>
            ) : (
              <div>
                Links will shown here after purchase only.{" "}
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
      <Modal
        ref={dialogRef}
        title="Pay with Card"
        content={
          <Stripe
            packageId={packageDetails._id}
            packageName={packageDetails.name}
            plan={plan}
          />
        }
      />
    </>
  );
};

export default PackageDetails;
