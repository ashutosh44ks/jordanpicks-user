import PackageBox from "./PackageBox";
import { RiLoader4Line } from "react-icons/ri";

const PackageContainer = ({ loading, filteredPackages, discountPer }) => {
  return (
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
          <PackageBox item={item} key={item._id} discountPer={discountPer} />
        ))
      ) : (
        <div className="text-lightgrey2">
          No packages available for this sport
        </div>
      )}
    </div>
  );
};

export default PackageContainer;
