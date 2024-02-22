import SpecialPackageBox from "./SpecialPackageBox";
import { RiLoader4Line } from "react-icons/ri";

const SpecialPackageContainer = ({ loading, specialPackages }) => {
  return (
    <div className="flex flex-wrap gap-x-8 gap-y-16 justify-center mt-16">
      {loading ? (
        [1, 2].map((item) => (
          <div
            className="package-box skeleton flex justify-center items-center"
            key={item}
          >
            <RiLoader4Line className="text-4xl animate-spin text-grey" />
          </div>
        ))
      ) : specialPackages.length > 0 ? (
        specialPackages.map((item) => (
          <SpecialPackageBox item={item} key={item._id} />
        ))
      ) : (
        <div className="text-lightgrey2">
          No special packages available at this moment
        </div>
      )}
    </div>
  );
};

export default SpecialPackageContainer;
