import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PassContext from "../../../components/utils/PassContext";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedUser } = useContext(PassContext);

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
      navigate("/");
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
      <h4 className="mb-6">Enter Your Credentials</h4>
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
      <div className="w-full mb-4">
        <Button theme="pink" className="w-full" type="submit">
          Login
        </Button>
      </div>
      <div className="w-full">
        Don't have an account ?{" "}
        <span
          className="cursor-pointer text-blue font-medium"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </span>
      </div>
    </form>
  );
};

export default Login;
