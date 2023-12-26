import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../../components/utils/useCountdown";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import ProfitGuarantee from "./ProfitGuarantee";

const PackageBox = ({ item }) => {
  const navigate = useNavigate();

  const dialogRef = useRef();
  const { loggedUser } = useContext(PassContext);

  const { diffTimeData } = useCountdown(item.endDate);

  const isExpired = () => {
    let expired = false;
    if (diffTimeData.diffDay < 0) {
      expired = true;
    } else if (diffTimeData.diffDay === 0) {
      if (diffTimeData.diffHour < 0) {
        expired = true;
      } else if (diffTimeData.diffHour === 0) {
        if (diffTimeData.diffMin < 0) {
          expired = true;
        } else if (diffTimeData.diffMin === 0) {
          if (diffTimeData.diffSec < 0) {
            expired = true;
          }
        }
      }
    }
    return expired;
  };

  return (
    <>
      <div className={`package-box ${isExpired(diffTimeData) ? "hidden" : ""}`}>
        <div className="package-box-header limit-to-1-line">
          <h3>{item.name.slice(0, 20)}</h3>
          <div className="sticker">JORDAN PICKS</div>
        </div>
        <div className="package-box-body">
          <div className="flex justify-center items-start">
            <h4 className="mt-1">$</h4>
            <h1 className="mb-4">{item.price.toFixed(2)}</h1>
          </div>
          <div>
            <Button
              className="w-32 uppercase font-medium"
              theme="blue3"
              rounded="none"
              size="lg"
              onClick={() => {
                navigate("/packages/" + item._id);
              }}
            >
              Buy Now
            </Button>
          </div>
          <hr
            className="my-4"
            style={{ borderTop: "1px solid var(--lightgrey3)" }}
          />
          <div
            className="my-8 limit-to-5-lines break-words h-[9rem]"
            dangerouslySetInnerHTML={{ __html: item.description }}
          ></div>
          <div>
            <Button
              className="w-48 font-medium"
              theme="blue3"
              rounded="none"
              size="lg"
              onClick={() => {
                dialogRef.current.showModal();
              }}
            >
              Profit Gurantee
            </Button>
          </div>
        </div>
        <div className="package-box-footer">
          <p>{item.gamePreview}</p>
          <hr className="my-1 mx-6 border-lightblue" />
          <h5>
            {item._id ? diffTimeData.diffDay : 0} days{" "}
            {item._id ? diffTimeData.diffHour : 0} hours{" "}
            {item._id ? diffTimeData.diffMin : 0} mins{" "}
            {item._id ? diffTimeData.diffSec : 0} secs left
          </h5>
        </div>
      </div>
      <Modal
        ref={dialogRef}
        title="PROFIT GUARANTEE RULE"
        content={<ProfitGuarantee />}
      />
    </>
  );
};

export default PackageBox;
