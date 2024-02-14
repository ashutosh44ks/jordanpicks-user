import { useRouteError, Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="lg:p-32 md:p-16 p-8 flex flex-col justify-center items-center h-screen">
      <div className="mb-6">
        <h2 className="font-medium text-center mb-2">Error</h2>
        {err.status && (
          <h3 className="text-center">
            {err.status}: {err.statusText}
          </h3>
        )}
        <p className="text-center text-lightgrey2 my-2">({err.data})</p>
      </div>
      <Link to="/">
        <Button theme="yellow" rounded="md" >
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
