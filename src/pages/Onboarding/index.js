import { useState } from "react";
import { useNavigate } from "react-router-dom";
import IntroText from "./components/IntroText";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Steps from "./components/Steps";
import { IoIosArrowDropright } from "react-icons/io";

const Onboarding = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);

  if (page === 0)
    return (
      <Card size="lg" className="mb-10">
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
      <Card size="lg" className="mb-10">
        <Steps page={page} />
        <div className="flex justify-end gap-4 w-full relative top-4">
          <Button
            theme="blue"
            className="w-[7rem]"
            onClick={() => setPage((page) => page - 1)}
          >
            Previous
          </Button>
          {page !== 3 ? (
            <Button
              theme="pink"
              className="min-w-[7rem]"
              onClick={() => setPage((page) => page + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              theme="pink"
              className="min-w-[7rem]"
              onClick={() => navigate("/packages")}
            >
              View Packages
            </Button>
          )}
        </div>
      </Card>
    );
  return <div>Onboarding</div>;
};

export default Onboarding;
