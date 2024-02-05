import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";

const PackageBox = ({ item }) => {
  const navigate = useNavigate();

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
          <div className="flex justify-center items-start mb-4">
            <h4 className="mt-1">$</h4>
            <h1 className="text-pink">{item.price.toFixed(2)}</h1>
          </div>
          <h2 className="text-center limit-to-2-lines">{item.name}</h2>
          <h5 className="text-center mt-4 limit-to-2-lines">{item.gamePreview}</h5>
        </div>
        <hr className="my-6 mx-6 border-black" />
        <div
          className="text-center limit-to-5-lines break-words h-[6rem]"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
        <div className="mt-8">
          <Button
            className="w-full font-medium"
            theme="pink"
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
