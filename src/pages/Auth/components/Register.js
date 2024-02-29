import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const Register = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [refBy, setRefBy] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const registerUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/user/signup`, {
        name,
        email,
        mobile: phone,
        password,
        ...(refBy && { refBy }),
      });
      console.log(data);
      navigate(`/auth/verify-account?email=${email}`);
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (password !== cPassword)
          return myToast("Passwords do not match", "failure");
        else registerUser();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-6 flex flex-col justify-center items-center">
        <div className="mb-6">
          <h2 className="font-medium text-center mb-2">
            Register Your Account
          </h2>
          <p className="text-center text-lightgrey2">
            Secure Your Spot! After registering you'll instantly receive your
            $25 bonus credits
          </p>
        </div>
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Mobile No."
          value={phone}
          onChange={(e) => {
            if (!isNaN(e.target.value)) setPhone(e.target.value);
          }}
          className="w-full min-w-[20rem]"
          maxLength={10}
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Confirm Password"
          value={cPassword}
          onChange={(e) => setCPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={refBy}
          onChange={(e) => setRefBy(e.target.value)}
          className="w-full min-w-[20rem]"
        />
      </div>
      <div className="mb-4 w-full">
        <input
          type="checkbox"
          value={terms}
          onChange={(e) => {
            if (e.target.checked) setTerms(false);
            else setTerms(true);
          }}
          required
          className="mr-2"
        />
        <label>
          I have read and agree to{" "}
          <span
            className="cursor-pointer text-yellow font-medium"
            onClick={() => {
              window.open("https://www.jordanspicks.com/terms", "_blank");
            }}
          >
            Terms and Conditions
          </span>
        </label>
      </div>
      <div className="mb-4 w-full text-xs">
        By submitting your mobile phone number, you're authorising us (opting
        in) to send you informational and marketing related texts. Message/data
        rates apply. Reply STOP to unsubscribe.
      </div>
      <div className="w-full mb-4">
        <Button
          theme="yellow"
          className="w-full font-semibold flex justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
      <div className="flex items-center gap-2 my-4">
        <hr className="w-full border-black" />
        <span className="text-sm">or</span>
        <hr className="w-full border-black" />
      </div>
      <div className="w-full">
        <Button
          theme="lightgrey"
          className="w-full font-semibold"
          type="button"
          onClick={() => {
            if (searchParams.get("redirect"))
              navigate(`/auth/login?redirect=${searchParams.get("redirect")}`);
            else navigate("/auth/login");
          }}
        >
          Sign In
        </Button>
      </div>
    </form>
  );
};

export default Register;
