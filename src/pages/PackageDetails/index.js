import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "./components/Banner";
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
      // setPackageDetails(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPackageDetails();
  }, []);

  return (
    <div>
      <Banner />
      <div className="p-16">
        <h3 className="mb-4">Package Details</h3>
        <div
          className="limit-to-5-lines"
          dangerouslySetInnerHTML={{ __html: packageDetails.description }}
        ></div>
      </div>
    </div>
  );
};

export default PackageDetails;
