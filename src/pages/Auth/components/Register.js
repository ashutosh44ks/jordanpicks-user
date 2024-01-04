import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const Register = () => {
  const { setLoggedUser } = useContext(PassContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const registerUser = async () => {
    setLoading(true);
    try {
      const { data } = await api.post(`/user/signin`, {
        name,
        username,
        email,
        mobile: phone,
        password,
      });
      console.log(data);
      localStorage.setItem("jordanToken", data.dta.token);
      localStorage.setItem("jordanTokenRefresh", data.dta.refreshToken);
      setLoggedUser("user");
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
      else navigate("/onboarding");
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
      className="auth-card"
    >
      <div className="mb-6 flex flex-col justify-center items-center">
        <h4>Register</h4>
        <p className="text-grey">
          Register now and get
          <span className="text-pink font-medium"> $25 bonus!</span>
        </p>
        <p className="text-grey">See your growth and get betting support</p>
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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
            className="cursor-pointer text-blue font-medium"
            onClick={() => navigate("/terms")}
          >
            Terms and Conditions
          </span>
        </label>
      </div>
      <div className="w-full mb-4">
        {loading ? (
          <Button theme="grey" className="w-full" type="button" disabled>
            Loading...
          </Button>
        ) : (
          <Button theme="pink" className="w-full" type="submit">
            Create Account
          </Button>
        )}
      </div>
      <div className="w-full">
        Already have an account ?{" "}
        <span
          className="cursor-pointer text-blue font-medium"
          onClick={() => navigate("/auth/login")}
        >
          Sign In
        </span>
      </div>
    </form>
  );
};

export default Register;
