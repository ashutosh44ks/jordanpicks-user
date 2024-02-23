import { useContext } from "react";
import PassContext from "../../../components/utils/PassContext";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const PackageBox = ({ item }) => {
  const navigate = useNavigate();
  const { loggedUser } = useContext(PassContext);

  const { diffTimeData } = useCountdown(item.endDate);

  return (
    <div className="package-box">
      <div className="package-box-header limit-to-1-line">
        {item._id ? diffTimeData.diffDay : 0} days{" "}
        {item._id ? diffTimeData.diffHour : 0} hours{" "}
        {item._id ? diffTimeData.diffMin : 0} mins{" "}
        {item._id ? diffTimeData.diffSec : 0} secs left
      </div>
      <div className="package-box-body">
        <div className="h-[12rem] flex flex-col justify-center">
          <div className="flex justify-center items-center gap-4 mb-4">
            <div
              className={`flex items-start ${
                loggedUser.defaultDiscount !== 0 ? "line-through" : ""
              }`}
            >
              <h4 className="mt-1">$</h4>
              <h1 className="text-yellow">{item.price.toFixed(2)}</h1>
            </div>
            {loggedUser.defaultDiscount !== 0 && (
              <div className="flex items-start">
                <h4 className="mt-1">$</h4>
                <h1 className="text-yellow">
                  {(
                    item.price -
                    item.price * (loggedUser.defaultDiscount / 100)
                  ).toFixed(2)}
                </h1>
              </div>
            )}
          </div>
          <h2 className="text-center limit-to-2-lines">{item.name}</h2>
          <h5 className="text-center mt-4 limit-to-2-lines">
            {item.gamePreview}
          </h5>
        </div>
        <hr className="my-6 mx-6 border-black" />
        <div
          className="text-center limit-to-5-lines break-words h-[6rem]"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
        <div className="mt-8">
          <Button
            className="w-full font-medium"
            theme="yellow"
            rounded="md"
            size="md"
            onClick={() => {
              navigate("/packages/" + item._id);
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PackageBox;
