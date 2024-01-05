import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroText from "./components/IntroText";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Steps from "./components/Steps";
import {
  IoIosArrowDropright,
  IoIosArrowDropleft,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const Onboarding = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  if (page === 0)
    return (
      <Card size="lg" className="mb-10 w-auto sm:w-[75vw] mx-auto">
        <IntroText />
        <div className="flex justify-end w-full relative top-4">
          <Button
            theme="pink"
            className="flex gap-2 items-center"
            onClick={() => setPage(1)}
          >
            Here's how it works
            <IoIosArrowDropright className="text-xl" />
          </Button>
        </div>
      </Card>
    );
  if (page > 0)
    return (
      <Card size="lg" className="mb-10 w-auto sm:w-[75vw] mx-auto relative">
        <div className="flex justify-between items-center gap-4 w-full absolute top-[2.1rem] px-8">
          <div
            className="p-4 cursor-pointer"
            onClick={() => setPage((page) => page - 1)}
          >
            <IoIosArrowDropleft className="text-2xl lg:text-3xl text-blue" />
          </div>
          {page !== 3 ? (
            <div
              className="p-4 cursor-pointer"
              onClick={() => setPage((page) => page + 1)}
            >
              <IoIosArrowDropright className="text-2xl lg:text-3xl text-pink" />
            </div>
          ) : (
            <div
              className="p-4 cursor-pointer"
              onClick={() => navigate("/packages")}
            >
              <IoIosArrowDroprightCircle className="text-2xl lg:text-3xl text-pink" />
            </div>
          )}
        </div>
        <Steps page={page} />
      </Card>
    );
  return <div>Onboarding</div>;
};

export default Onboarding;
