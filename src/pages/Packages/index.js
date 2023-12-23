import { useState, useEffect } from "react";
import Banner from "./components/Banner";
import api from "../../components/utils/api";
import PackageBox from "./components/PackageBox";
import "./packages.css";

const Packages = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  // const limitDescription = (description) => {
  //   let htmlTagRegex = /(<[^>]*>.*?<\/[^>]*>)|(<[^>]*>)/g;
  //   let matches = description.match(htmlTagRegex);
  //   let result = "";
  //   let i = 0;

  //   while (i < matches.length && result.length + matches[i].length <= 100) {
  //     result += matches[i];
  //     i++;
  //   }

  //   // If the next tag is not complete and adding it would exceed 100 characters
  //   if (
  //     i < matches.length &&
  //     !matches[i].endsWith(">") &&
  //     result.length + matches[i].length > 150
  //   ) {
  //     // Continue adding until a complete tag is found
  //     while (i < matches.length && !matches[i].endsWith(">")) {
  //       result += matches[i];
  //       i++;
  //     }
  //     // Add the complete tag
  //     if (i < matches.length) {
  //       result += matches[i];
  //     }
  //   }

  //   return result;
  // };

  const getPackages = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/user/allPackage");
      setPackages(data.dta);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPackages();
  }, []);

  return (
    <div>
      <div>
        <Banner />
        <div className="w-full flex justify-center">
          <iframe
            className="home-welcome-iframe"
            width="600"
            height="415"
            src="https://www.youtube.com/embed/v7Iy5ikDy4A"
            title="Welcome video"
          ></iframe>
        </div>
      </div>
      <div className="package-box-container">
        <h2 className="text-center">GET STARTED WITH OUR PACKAGES</h2>
        <div className="my-16 flex flex-wrap gap-x-8 gap-y-16 justify-center">
          {loading ? (
            <div>Loading...</div>
          ) : (
            packages.map((item) => <PackageBox item={item} key={item._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Packages;
