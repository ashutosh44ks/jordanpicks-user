import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const Login = () => {
  const { setLoggedUser } = useContext(PassContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginUser = async () => {
    try {
      const { data } = await api.post(`/user/login`, {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem("jordanToken", data.dta.token);
      localStorage.setItem("jordanTokenRefresh", data.dta.refreshToken);
      setLoggedUser("user");
      if (searchParams.get("redirect")) navigate(searchParams.get("redirect"));
      else navigate("/");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        loginUser();
      }}
      className="auth-card"
    >
      <h4 className="mb-6">Login</h4>
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
      <div className="mb-3 w-full">
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full min-w-[20rem]"
          required
        />
        <div className="w-full flex justify-end">
          <span
            className="cursor-pointer text-blue font-medium text-sm mt-1"
            onClick={()=>{
              navigate("/auth/forgot-password")
            }}
          >
            Forgot Password ?
          </span>
        </div>
      </div>
      <div className="w-full mb-4">
        <Button theme="pink" className="w-full" type="submit">
          Login
        </Button>
      </div>
      <div className="w-full text-sm">
        Don't have an account ?{" "}
        <span
          className="cursor-pointer text-blue font-medium"
          onClick={() => {
            if (searchParams.get("redirect"))
              navigate(
                `/auth/register?redirect=${searchParams.get("redirect")}`
              );
            else navigate("/auth/register");
          }}
        >
          Create now
        </span>
      </div>
    </form>
  );
};

export default Login;
