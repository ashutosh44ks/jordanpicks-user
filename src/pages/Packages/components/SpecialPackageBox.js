import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

const SpecialPackageBox = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="special package-box">
      <div className="package-box-header tracking-widest">
        PREMIUM SUBSCRIPTION
      </div>
      <div className="package-box-body">
        <div className="h-[8rem] flex flex-col justify-center">
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
            theme="yellow"
            rounded="md"
            size="md"
            onClick={() => {
              navigate("/special-packages/" + item._id);
            }}
          >
            View Pricings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SpecialPackageBox;
