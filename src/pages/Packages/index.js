import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
import PackageBox from "./components/PackageBox";
import { RiLoader4Line } from "react-icons/ri";
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
      <Banner />
      <Steps />
      <div className="my-16 flex flex-wrap gap-x-8 gap-y-16 justify-center">
        {loading
          ? [1, 2, 3, 4].map((item) => (
              <div className="package-box skeleton" key={item}>
                <RiLoader4Line className="text-4xl animate-spin text-grey" />
              </div>
            ))
          : packages.map((item) => <PackageBox item={item} key={item._id} />)}
      </div>
    </div>
  );
};

export default Packages;
