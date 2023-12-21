import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

const PackageBox = ({ item }) => {
  const navigate = useNavigate();

  return (
    <div className="package-box">
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
            className="w-32"
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
          className="my-8 limit-to-5-lines"
          dangerouslySetInnerHTML={{ __html: item.description }}
        ></div>
        <div>
          <Button className="w-48" theme="blue3" rounded="none" size="lg">
            Profit Gurantee
          </Button>
        </div>
      </div>
      <h5 className="package-box-footer">{item.gamePreview}</h5>
    </div>
  );
};

export default PackageBox;
