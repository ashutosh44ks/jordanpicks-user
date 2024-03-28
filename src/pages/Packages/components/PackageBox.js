import { useContext, useState } from "react";
import PassContext from "../../../components/utils/PassContext";
import { useNavigate } from "react-router-dom";
import { useCountdown } from "../../../components/utils/useCountdown";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const PackageBox = ({ item }) => {
  const navigate = useNavigate();
  const { loggedUser, getProfileShort } = useContext(PassContext);

  const { diffTimeData } = useCountdown(item.endDate);

  const [cartText, setCartText] = useState("Add to Cart");

  const addToCart = async (packageId) => {
    try {
      const { data } = await api.post("/user/addItemToCart", { packageId });
      console.log(data);
      getProfileShort();
      myToast(data.msg, "success");
      setCartText("Added in Cart");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
      if (err?.response?.data?.error === "Item already in cart")
        setCartText("Already in Cart");
    }
  };

  return (
    <div className="package-box">
      <div className="package-box-header limit-to-1-line">
        {item._id ? diffTimeData.diffDay : 0} days{" "}
        {item._id ? diffTimeData.diffHour : 0} hours{" "}
        {item._id ? diffTimeData.diffMin : 0} mins{" "}
        {item._id ? diffTimeData.diffSec : 0} secs left
      </div>
      <div className="package-box-body">
        <div className="h-[10rem] xs:h-[12rem] flex flex-col justify-center">
          <div className="flex justify-center items-center gap-4">
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
          <h2 className="text-center limit-to-2-lines my-2 xs:my-4">
            {item.name}
          </h2>
          <h5 className="text-center limit-to-2-lines">{item.gamePreview}</h5>
        </div>
        <hr className="my-4 xs:my-6 mx-6 border-black hidden xs:block" />
        <div
          className="text-center limit-to-5-lines break-words xs:h-[6rem] h-0"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
        <div className="mt-4 xs:mt-8 flex flex-row xs:flex-col gap-4">
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
          {loggedUser._id !== "" && (
            <Button
              className="w-full font-medium"
              theme="dark"
              rounded="md"
              size="md"
              onClick={() => {
                addToCart(item._id);
              }}
            >
              {cartText}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackageBox;
