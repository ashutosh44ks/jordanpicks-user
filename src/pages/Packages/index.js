import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
import PackageContainer from "./components/PackageContainer";
import PackageMenu from "./components/PackageMenu";
// import Testimonials from "./components/Testimonials";
import "./packages.css";

const Packages = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);

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
      console.log(data.dta);
      // show only packages that have not expired
      const temp = data.dta.filter(
        (item) => +new Date(item.endDate) >= +new Date()
      );
      setPackages(temp);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getPackages();
  }, []);

  const sports = ["All", "NBA", "NHL", "NFL", "NCAAB", "Others"];
  const [activeSportsIndex, setActiveSportsIndex] = useState(0);

  useEffect(() => {
    if (activeSportsIndex === 0) setFilteredPackages(packages);
    else
      setFilteredPackages(
        packages.filter((item) => item.sports === sports[activeSportsIndex])
      );
  }, [activeSportsIndex, packages]);

  return (
    <div>
      <Banner />
      <Steps />
      <div className="my-20">
        <div>
          <h2 className="font-medium text-center mb-2">
            Get Started with <span className="text-yellow">Our Packages</span>
          </h2>
          <p className="text-center text-lightgrey2">
            Embark on your winning adventure now! Explore our tailored packages
            to kickstart your gaming journey with an unbeatable edge.
          </p>
        </div>
        <div className="flex justify-center mt-12">
          <PackageMenu
            sports={sports}
            activeSportsIndex={activeSportsIndex}
            setActiveSportsIndex={setActiveSportsIndex}
            />
        </div>
        <PackageContainer
          loading={loading}
          filteredPackages={filteredPackages}
        />
      </div>
      {/* Removed by Client */}
      {/* <Testimonials /> */}
    </div>
  );
};

export default Packages;
