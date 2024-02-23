import { useContext, useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const Login = () => {
  const { loggedUser, setLoggedUser } = useContext(PassContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("jordanUser"));
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
  }, []);
  const [rememberMe, setRememberMe] = useState(false);
  const loginUser = async () => {
    try {
      const { data } = await api.post(`/user/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("jordanToken", data.dta.token);
      localStorage.setItem("jordanTokenRefresh", data.dta.refreshToken);
      if (rememberMe)
        localStorage.setItem(
          "jordanUser",
          JSON.stringify({
            email,
            password,
          })
        );
      const decodedToken = jwtDecode(data.dta.token);
      setLoggedUser({ ...loggedUser, _id: decodedToken.id });
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
      else navigate("/");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
      className="max-w-[26rem]"
    >
      <div className="mb-6">
        <h2 className="font-medium text-center mb-2">Welcome Back!</h2>
        <p className="text-center text-lightgrey2">
          Welcome Back to the Winning Zone! Your Next Jackpot Awaits - Let the
          Games Begin!
        </p>
      </div>
      <div className="mb-6 w-full">
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
      </div>
      <div className="relative mb-4 w-full">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem] pr-14"
          required
        />
        <span
          className="absolute right-0 text-xl cursor-pointer p-5"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </span>
      </div>
      <div className="w-full flex justify-between mb-4">
        <span className="text-sm flex gap-2 items-center" onClick={() => {}}>
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember Me
        </span>
        <span
          className="cursor-pointer text-sm"
          onClick={() => {
            navigate("/auth/forgot-password");
          }}
        >
          Forgot Password ?
        </span>
      </div>
      <div className="w-full">
        <Button theme="yellow" className="w-full font-semibold" type="submit">
          Sign In
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
              navigate(
                `/auth/register?redirect=${searchParams.get("redirect")}`
              );
            else navigate("/auth/register");
          }}
        >
          Register
        </Button>
      </div>
    </form>
  );
};

export default Login;
