import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import ProfitGuarantee from "./ProfitGuarantee";

const Steps = () => {
  const navigate = useNavigate();

  const data = [
    {
      imgPath: "/assets/step1.png",
      title: (
        <>
          Create your <span className="text-yellow">JordansPicks</span> Account
        </>
      ),
      desc: (
        <div>
          <ol className="list-decimal ml-6">
            <li className="mb-2">
              Register your account using the signup button below
            </li>
            <li className="mb-2">
              Verify your email using the OTP that we send to your email during
              the process
            </li>
            <li className="mb-2">
              Use your $25 bonus credits to purchase any package on JordansPicks
            </li>
          </ol>
          <Button
            theme="yellow"
            size="md-rect"
            rounded="md"
            className="font-medium mt-4"
            onClick={() => {
              navigate("/auth/register");
            }}
          >
            Register Now
          </Button>
        </div>
      ),
    },
    {
      imgPath: "/assets/step3.png",
      title: (
        <>
          Benefit from our <span className="text-yellow">Profit Guarantee</span>{" "}
          program
        </>
      ),
      desc: <ProfitGuarantee />,
    },
  ];

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-6 xl:gap-8 my-8 md:overflow-auto">
        {data.map((item) => (
          <div
            className="bg-dark2 px-6 py-8 rounded-lg xs:min-w-[23rem] w-full md:w-1/2"
            key={item.imgPath}
          >
            <img src={item.imgPath} alt={item.title} className="h-10" />
            <h4 className="text-xl font-medium my-4">{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Steps;
