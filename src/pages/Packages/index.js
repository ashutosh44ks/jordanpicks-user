import { useState, useEffect } from "react";
import api from "../../components/utils/api";
import Banner from "./components/Banner";
import Steps from "./components/Steps";
import PackageBox from "./components/PackageBox";
// import Testimonials from "./components/Testimonials";
import { RiLoader4Line } from "react-icons/ri";
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
          <div className="border border-yellow rounded-lg flex items-center xs:flex-row flex-col">
            {sports.map((sport, index) => (
              <>
                <div
                  className={`py-2 px-6 text-center w-full xs:w-auto ${
                    activeSportsIndex === index
                      ? "bg-yellow text-darkblack font-medium"
                      : "cursor-pointer hover:bg-dark"
                  } ${index === 0 ? "rounded-l-lg xs:rounded-r-none rounded-r-lg" : ""} ${
                    index === sports.length - 1 ? "rounded-r-lg xs:rounded-l-none rounded-l-lg" : ""
                  }`}
                  onClick={() => setActiveSportsIndex(index)}
                  key={sport}
                >
                  {sport}
                </div>
                {index !== sports.length - 1 && (
                  <div
                    key={sport + "divider"}
                    className={
                      (activeSportsIndex === index ||
                      activeSportsIndex === index + 1
                        ? `invisible`
                        : `text-white`) + " hidden xs:block"
                    }
                  >
                    |
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-8 gap-y-16 justify-center mt-16">
          {loading ? (
            [1, 2, 3, 4].map((item) => (
              <div
                className="package-box skeleton flex justify-center items-center"
                key={item}
              >
                <RiLoader4Line className="text-4xl animate-spin text-grey" />
              </div>
            ))
          ) : filteredPackages.length > 0 ? (
            filteredPackages.map((item) => (
              <PackageBox item={item} key={item._id} />
            ))
          ) : (
            <div className="text-lightgrey2">
              No packages available for this sport
            </div>
          )}
        </div>
      </div>
      {/* Removed by Client */}
      {/* <Testimonials /> */}
    </div>
  );
};

export default Packages;
