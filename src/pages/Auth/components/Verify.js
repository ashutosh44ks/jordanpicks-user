import { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PassContext from "../../../components/utils/PassContext";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import Button from "../../../components/common/Button";
import { AiOutlineLoading } from "react-icons/ai";

const VerifyAccount = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loggedUser, setLoggedUser } = useContext(PassContext);

  const [emailInput, setEmailInput] = useState("");
  useEffect(() => {
    setEmailInput(searchParams.get("email"));
  }, [searchParams]);

  const [otp, setOtp] = useState("");
  const verifyAccount = async () => {
    try {
      const { data } = await api.post(`/user/verifyAccount`, {
        emailInput,
        otp: +otp,
      });
      console.log(data);
      myToast(data.msg, "success");
      if (loggedUser === "user") navigate("/");
      else {
        localStorage.setItem("jordanToken", data.dta.token);
        localStorage.setItem("jordanTokenRefresh", data.dta.refreshToken);
        setLoggedUser("user");
        if (searchParams.get("redirect"))
          navigate(searchParams.get("redirect"));
        else navigate("/");
      }
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const initiateVerify = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/user/generateOTP`, {
        emailInput,
      });
      console.log(data);
      myToast(data.msg, "success");
      setPage(1);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
      setShowResend(true);
    }
    setLoading(false);
  };

  const [page, setPage] = useState(0);

  if (page === 0)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          initiateVerify();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <h2 className="font-medium text-center mb-2">Verify Account</h2>
          <p className="text-center text-lightgrey2">
            Enter your registered email to receive a verification OTP
          </p>
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full">
          <Button
            theme="yellow"
            className="w-full flex gap-2 justify-center items-center font-medium"
            type="submit"
            disabled={loading}
          >
            {loading && <AiOutlineLoading className="animate-spin" size={16} />}
            Send OTP
          </Button>
        </div>
        {showResend && (
          <div className="w-full flex justify-end gap-1 font-medium text-sm mt-2">
            Did not receive OTP?
            <span
              className="cursor-pointer text-yellow"
              onClick={() => {
                initiateVerify();
              }}
            >
              Resend
            </span>
          </div>
        )}
      </form>
    );
  else if (page === 1)
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          verifyAccount();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <h2 className="font-medium text-center mb-2">Verify Account</h2>
          <p className="text-center text-lightgrey2">
            Enter the OTP sent to your email
          </p>
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            value={emailInput}
            className="w-full min-w-[20rem]"
            disabled
            required
          />
        </div>
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="Enter OTP sent in your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full mb-4">
          <Button theme="yellow" className="w-full" type="submit">
            Submit
          </Button>
        </div>
      </form>
    );
};

export default VerifyAccount;
