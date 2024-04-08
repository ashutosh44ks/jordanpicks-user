import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { PiSealCheck } from "react-icons/pi";
// import SocialLoginBtnGroup from "./SocialLoginBtnGroup";

const RenderReferral = ({ refBy, setRefBy }) => {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.get("referralCode")) {
      setRefBy(searchParams.get("referralCode"));
    }
  }, [searchParams]);
  const [showReferral, setShowReferral] = useState(false);

  if (searchParams.get("referralCode")) {
    return (
      <p className="text-yellow text-sm mb-4 flex gap-1 items-center">
        <PiSealCheck /> Referral Code Applied
      </p>
    );
  }
  if (showReferral)
    return (
      <div className="mb-4 w-full">
        <input
          type="text"
          placeholder="Referral Code (optional)"
          value={refBy}
          onChange={(e) => setRefBy(e.target.value)}
          className="w-full min-w-[20rem]"
        />
      </div>
    );
  return (
    <p
      className="cursor-pointer text-yellow text-sm mb-4"
      onClick={() => setShowReferral(true)}
    >
      Do you have a referral code?
    </p>
  );
};

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
      myToast(err?.response?.data?.error, "failure");
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
      <div className="mb-12">
        <h2 className="font-medium text-center mb-2">Register Your Account</h2>
        <p className="text-center text-lightgrey2">
          Secure Your Spot! After registering you'll instantly receive your $25
          bonus credits
        </p>
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
      <RenderReferral refBy={refBy} setRefBy={setRefBy} />
      <div className="w-full">
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
      <div className="text-sm mt-2">
        Already have an account?{" "}
        <span
          className="font-semibold text-yellow cursor-pointer"
          onClick={() => {
            if (searchParams.get("redirect"))
              navigate(`/auth/login?redirect=${searchParams.get("redirect")}`);
            else navigate("/auth/login");
          }}
        >
          Login
        </span>
      </div>
      {/* <div className="flex items-center gap-2 my-4">
        <hr className="w-full border-black" />
        <span className="text-sm">OR</span>
        <hr className="w-full border-black" />
      </div>
      <SocialLoginBtnGroup /> */}
    </form>
  );
};

export default Register;
