import { useRouteError, Link } from "react-router-dom";
import Button from "../../components/common/Button";

const Error = () => {
  const err = useRouteError();

  return (
    <div className="lg:p-32 md:p-16 p-8 flex flex-col justify-center items-center h-screen">
      <h1>Error</h1>
      {err.status && (
        <h3>
          {err.status}: {err.statusText}
        </h3>
      )}
      <p className="color-black my-2">({err.data})</p>
      <Link to="/" className="my-4">
        <Button theme="pink" rounded="none">
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default Error;
