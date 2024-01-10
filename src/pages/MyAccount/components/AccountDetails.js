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
    let passObj = {};
    if (cPass !== "" && newPass !== "")
      passObj = { currentPassword: cPass, newPassword: newPass };
    try {
      const { data } = await api.patch("/user/updateProfile", {
        name,
        mobile: phone,
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
  const [phone, setPhone] = useState(user.mobile);
  const [cPass, setCPass] = useState("");
  const [newPass, setNewPass] = useState("");

  return (
    <div>
      <h3>Account Details</h3>
      <form
        className="my-8"
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveProfile();
        }}
      >
        <div className="my-4">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <p>{user?.username}</p>
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <p>{user?.email}</p>
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <div className="flex justify-between items-center">
            <label className="font-medium" htmlFor="cPass">
              Current Password
            </label>
            <span
              className="cursor-pointer text-blue font-medium text-sm mt-1"
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
            >
              Forgot Password ? Reset it
            </span>
          </div>
          <input
            type="password"
            name="cPass"
            id="cPass"
            value={cPass}
            onChange={(e) => setCPass(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="newPass">
            New Password
          </label>
          <input
            type="password"
            name="newPass"
            id="newPass"
            value={newPass}
            onChange={(e) => setNewPass(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <Button theme="pink" rounded="none" type="submit">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
