import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const AccountDetails = () => {
  const { user } = useOutletContext();
  const handleSaveProfile = async () => {
    try {
      const { data } = await api.put("/user/profile", {
        name,
        username,
        email,
        mobile: phone,
        current_password: cPass,
        new_password: newPass,
      });
      myToast(data.message, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
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
          <label className="font-medium" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e)}
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
            onChange={(e) => setPhone(e)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <label className="font-medium" htmlFor="cPass">
            Current Password
          </label>
          <input
            type="password"
            name="cPass"
            id="cPass"
            value={cPass}
            onChange={(e) => setCPass(e)}
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
            onChange={(e) => setNewPass(e)}
            className="w-full"
          />
        </div>
        <div className="my-4">
          <Button theme="pink" rounded="none">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AccountDetails;
