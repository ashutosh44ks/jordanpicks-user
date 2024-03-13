import Button from "../../../components/common/Button";

const Banner = ({ loading, packageDetails, showModal }) => {
  return (
    <div className="package-details-banner">
      <iframe
        height="360"
        src={packageDetails.videoURL}
        title="Welcome video"
      ></iframe>
      <div className="w-full py-4">
        <h4 className="font-medium text-yellow">PREMIUM PACKAGE</h4>
        <h3 className="my-8">{!loading && packageDetails.name}</h3>
        <div className="flex items-start">
          <h4 className="mt-1">$</h4>
          <h1 className="text-yellow">
            {!loading && packageDetails.price.toFixed(2)}
          </h1>
        </div>
        <p className="mt-4 mb-8 text-lightgrey2 text-sm">
          {packageDetails.gamePreview}
        </p>
        <div>
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
            <Button
              theme="yellow"
              size="md"
              className="w-full font-semibold"
              rounded="md"
              onClick={() => {
                showModal();
              }}
            >
              Buy Now with Card
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
