import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const AccountDetails = () => {
  const navigate = useNavigate();
  const { userData, getDashboard } = useOutletContext();
  const user = userData?.user;
  const handleSaveProfile = async () => {
    try {
      const { data } = await api.patch("/user/updateProfile", {
        name,
      });
      myToast(data.msg, "success");
      getDashboard();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  const handleChangePassword = async () => {
    let passObj = {};
    if (cPass !== "" && newPass !== "")
      passObj = { currentPassword: cPass, newPassword: newPass };
    try {
      const { data } = await api.patch("/user/updateProfile", {
        ...passObj,
      });
      myToast(data.msg, "success");
      getDashboard();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [name, setName] = useState(user.name);
  const [cPass, setCPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div className="my-8 flex gap-16 md:flex-row flex-col">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
      >
        <h5 className="font-medium">Personal Details</h5>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="name">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full type2 mt-1"
          />
        </div>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="email">
            Email
          </label>
          <input value={user.email} className="w-full type2 mt-1" disabled />
        </div>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="phone">
            Phone
          </label>
          <input value={user.mobile} className="w-full type2 mt-1" disabled />
        </div>
        <div>
          <Button
            className="font-medium w-full"
            theme="pink"
            rounded="sm"
            size="md-rect"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleChangePassword();
        }}
      >
        <div className="flex justify-between">
          <h5 className="font-medium">Change Your Password</h5>
          <span
            className="cursor-pointer text-pink font-medium text-sm"
            onClick={() => {
              navigate("/auth/forgot-password");
            }}
          >
            Forgot Password?
          </span>
        </div>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="cPass">
            Current Password
          </label>
          <input
            type="password"
            name="cPass"
            id="cPass"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            className="w-full type2 mt-1"
          />
        </div>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="newPass">
            New Password
          </label>
          <input
            type="password"
            name="newPass"
            id="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full type2 mt-1"
          />
        </div>
        <div className="my-4">
          <label className="text-sm text-lightgrey2" htmlFor="confirmPass">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPass"
            id="confirmPass"
            value={confirmPass}
            onChange={(e) => setConfirmPass(e.target.value)}
            className="w-full type2 mt-1"
          />
        </div>
        <div>
          <Button
            className="font-medium w-full"
            theme="pink"
            rounded="sm"
            size="md-rect"
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
