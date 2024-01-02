import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";
import Button from "../../../components/common/Button";

const ForgotPassword = () => {
  const [getParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const resetPassword = async () => {
    try {
      const { data } = await api.post(`/user/resetPassword`, {
        password,
        token: getParams.get("token"),
      });
      console.log(data);
      myToast(data.msg, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        resetPassword();
      }}
      className="auth-card"
    >
      <h4 className="mb-6">Reset Password</h4>
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
