import { useUserContext } from "../../../components/utils/useUserContext";
import { useCountdown } from "../../../components/utils/useCountdown";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import Button from "../../../components/common/Button";

const RenderPrice = ({ price, loading, wallet, defaultDiscount }) => {
  if (loading) return null;

  if (defaultDiscount === 0)
    return (
      <div className="flex items-start">
        <h4 className="mt-1">$</h4>
        <h1 className="text-yellow">
          {(price - wallet <= 0 ? price : price - wallet).toFixed(2)}
        </h1>
      </div>
    );
  else {
    const newPrice = price - price * (defaultDiscount / 100);
    return (
      <>
        <div className="flex items-start line-through">
          <h4 className="mt-1">$</h4>
          <h1 className="text-yellow">
            {(price - wallet <= 0 ? price : price - wallet).toFixed(2)}
          </h1>
        </div>
        <div className="flex items-start">
          <h4 className="mt-1">$</h4>
          <h1 className="text-yellow">
            {(newPrice - wallet <= 0 ? newPrice : newPrice - wallet).toFixed(2)}
          </h1>
        </div>
      </>
    );
  }
};
const Banner = ({ loading, packageDetails, wallet, setPaymentRoute }) => {
  const { diffTimeData } = useCountdown(packageDetails.endDate);
  const { loggedUser, getProfileShort } = useUserContext();

  const addToCart = async (packageId) => {
    try {
      const { data } = await api.post("/user/addItemToCart", { packageId });
      console.log(data);
      getProfileShort();
      myToast(data.msg, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };

  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full py-4">
        <h4 className="font-medium text-yellow">
          {!loading && diffTimeData.diffDay} days{" "}
          {!loading && diffTimeData.diffHour} hours{" "}
          {!loading && diffTimeData.diffMin} mins{" "}
          {!loading && diffTimeData.diffSec} secs left
        </h4>
        <h3 className="my-8">{!loading && packageDetails.name}</h3>
        <div className="flex gap-4 items-end">
          {wallet > 0 && wallet < packageDetails.price && (
            <div className="flex items-start line-through">
              <h6 className="mt-1">$</h6>
              <h2>{!loading && packageDetails.price}</h2>
            </div>
          )}
          <RenderPrice
            price={packageDetails.price}
            loading={loading}
            defaultDiscount={packageDetails.defaultDiscount}
            wallet={wallet}
          />
        </div>
        <div className="mt-4 mb-8 text-lightgrey2 text-sm">
          {packageDetails.defaultDiscount > 0 && (
            <p>{packageDetails.defaultDiscount}% premium discount applied</p>
          )}
          <p>(After using your wallet balance of ${wallet.toFixed(2)})</p>
        </div>
        <div className="flex flex-col gap-4 items-center">
          {packageDetails.isBought ? (
            <Button
              theme="dark"
              size="lg"
              className="w-full font-semibold cursor-default"
              rounded="md"
            >
              Already Purchased
            </Button>
          ) : (
            <>
              <Button
                theme="yellow"
                size="md"
                className="w-full font-semibold"
                rounded="md"
                onClick={() => {
                  if (wallet >= packageDetails.price) setPaymentRoute("wallet");
                  else setPaymentRoute("stripe");
                }}
              >
                {wallet >= packageDetails.price
                  ? "Buy Now with Wallet"
                  : "Buy Now with Card"}
              </Button>
              <Button
                theme={
                  loggedUser.cart.find(
                    (cartItem) => cartItem === packageDetails._id
                  )
                    ? "lightgrey"
                    : "yellow"
                }
                size="md"
                className="w-full font-semibold"
                rounded="md"
                onClick={() => {
                  if (
                    loggedUser.cart.find(
                      (cartItem) => cartItem === packageDetails._id
                    )
                  )
                    return;
                  addToCart(packageDetails._id);
                }}
              >
                {loggedUser.cart.find(
                  (cartItem) => cartItem === packageDetails._id
                )
                  ? "Added to Cart"
                  : "Add to Cart"}
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
