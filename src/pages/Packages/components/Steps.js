import { useState, useRef } from "react";
import Button from "../../../components/common/Button";
import Modal from "../../../components/common/Modal";
import ProfitGuarantee from "./ProfitGuarantee";

const Steps = () => {
  const dialogRef = useRef();

  const data = [
    {
      imgPath: "/assets/step1.png",
      title: (
        <>
          1. Select a <span className="text-yellow">Package</span>
        </>
      ),
      desc: "Tailor your winning journey by choosing the perfect package that suits your betting ambitions and preferences.",
    },
    {
      imgPath: "/assets/step2.png",
      title: (
        <>
          2. Receive <span className="text-yellow">Expert Tips</span>
        </>
      ),
      desc: "Gain a competitive edge with insights from our seasoned experts, arming you with strategies for success.",
    },
    {
      imgPath: "/assets/step3.png",
      title: (
        <>
          3. Apply to <span className="text-yellow">Bets and Win!</span>
        </>
      ),
      desc: "Put your newfound knowledge into action as you apply our expert tips to your bets, paving the way for triumphant victories!",
    },
  ];

  const [modalData, setModalData] = useState({});
  return (
    <>
      <div>
        <h3 className="text-center">
          Swift
          <span className="text-yellow"> Wins </span>, Effortless
          <span className="text-yellow"> Play </span>
          on Our
          <span className="text-yellow"> Platform!</span>
        </h3>
        <div className="flex flex-col md:flex-row gap-6 xl:gap-8 my-8 md:overflow-auto">
          {data.map((item) => (
            <div
              className="bg-dark2 px-6 py-8 rounded-lg xs:min-w-[23rem]"
              key={item.imgPath}
            >
              <img src={item.imgPath} alt={item.title} className="h-10" />
              <h4 className="text-xl font-medium my-4">{item.title}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-center">
          Experience the thrill of quick victories with ease on our dynamic
          gaming platform, where every play is a seamless journey to success!
        </p>
        <div className="flex justify-center gap-6 xl:gap-8 flex-wrap mt-8">
          <Button
            theme="yellow"
            size="md-rect"
            rounded="md"
            className="font-medium"
            onClick={() => {
              setModalData({
                title: "WATCH VIDEO",
                content: (
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/v7Iy5ikDy4A"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                ),
              });
              dialogRef.current.showModal();
            }}
          >
            Watch Video
          </Button>
          <Button
            theme="lightgrey"
            size="md-rect"
            rounded="md"
            className="font-medium"
            onClick={() => {
              setModalData({
                title: "PROFIT GUARANTEE RULE",
                content: <ProfitGuarantee />,
              });
              dialogRef.current.showModal();
            }}
          >
            Profit Guarantee
          </Button>
        </div>
      </div>
      <Modal
        ref={dialogRef}
        title={modalData.title}
        content={modalData.content}
      />
    </>
  );
};

export default Steps;
