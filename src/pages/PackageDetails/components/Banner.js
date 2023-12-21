import { useEffect, useState } from "react";
import api from "../../../components/utils/api";
import Button from "../../../components/common/Button";

const Banner = () => {
  const [wallet, setWallet] = useState(0);
  const getProfile = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      setWallet(data.dta.user.wallet);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="flex">
      <iframe
        width="600"
        height="415"
        src="https://www.youtube.com/embed/2tR6eN--ieU"
        title="Welcome video"
      ></iframe>
      <div className="bg-blue2 text-white w-full p-16 flex flex-col justify-center">
        <h2 className="mb-4">00 Days 00 Hours 00 Minutes 00 Seconds</h2>
        <h3 className="mb-2">Package Name</h3>
        <h1>$ 99.99</h1>
        <div className="my-4">
          <p>Your wallet balance is ${wallet.toFixed(2)}</p>
          <p>Pay remaining amount of just ${99.99 - wallet}</p>
        </div>
        <div>
          <Button
            theme="pink"
            size="lg"
            className="w-48"
            rounded="none"
            onClick={() => {}}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
