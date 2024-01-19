import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import Button from "../../../components/common/Button";
import { AiOutlineLoading } from "react-icons/ai";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const resetPassword = async () => {
    try {
      const { data } = await api.post(`/user/resetPass`, {
        email,
        otp: +otp,
        password,
      });
      console.log(data);
      myToast(data.msg, "success");
      setTimeout(() => {
        navigate("/auth/login");
      }, 1000);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const initiateResetPass = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/user/resetPassOTP`, {
        email,
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
          initiateResetPass();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <h2 className="font-medium text-center mb-2">Reset Password</h2>
          <p className="text-center text-lightgrey2">
            Enter your registered email to receive a password reset OTP
          </p>
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full">
          <Button
            theme="pink"
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
              className="cursor-pointer text-pink"
              onClick={() => {
                initiateResetPass();
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
          resetPassword();
        }}
        className="max-w-[26rem]"
      >
        <div className="mb-6">
          <h2 className="font-medium text-center mb-2">Reset Password</h2>
          <p className="text-center text-lightgrey2">
            Enter the OTP sent to your email and your new password
          </p>
        </div>
        <div className="mb-4 w-full">
          <input
            type="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="mb-4 w-full">
          <input
            type="text"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full min-w-[20rem]"
            required
          />
        </div>
        <div className="w-full mb-4">
          <Button theme="pink" className="w-full" type="submit">
            Change Password
          </Button>
        </div>
      </form>
    );
};

export default ForgotPassword;
