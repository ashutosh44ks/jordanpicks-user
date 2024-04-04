import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../../components/utils/useUserContext";
import Button from "../../../components/common/Button";
import api from "../../../components/utils/api";
import myToast from "../../../components/utils/myToast";

const AccountDetails = () => {
  const navigate = useNavigate();
  const { getProfileShort } = useUserContext();

  const [isVerified, setIsVerified] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [currentPass, setCurrentPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, setNewPass] = useState("");

  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");

  const getDashboard = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      setName(data.dta.user.name);
      setMobile(data.dta.user.mobile);
      setEmail(data.dta.user.email);
      setIsVerified(data.dta.user.isVerified);
      setCompany(data.dta.user.company);
      setAddress(data.dta.user.address);
      setCity(data.dta.user.city);
      setState(data.dta.user.state);
      setZip(data.dta.user.zip);
      setCountry(data.dta.user.country);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDashboard();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const { data } = await api.patch("/user/updateProfile", {
        name,
        mobile,
      });
      myToast(data.msg, "success");
      getDashboard();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };
  const handleChangePassword = async () => {
    let passObj = {};
    if (currentPass !== "" && newPass !== "" && confirmPass !== "") {
      if (newPass !== confirmPass)
        return myToast("Passwords do not match", "failure");
      passObj = { currentPassword: currentPass, newPassword: newPass };
    }
    try {
      const { data } = await api.patch("/user/updateProfile", {
        ...passObj,
        name,
        mobile,
      });
      myToast(data.msg, "success");
      getDashboard();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };

  const handleChangeCustomerDetails = async () => {
    try {
      const { data } = await api.patch("/user/updateAddress", {
        ...(company && { company }),
        address,
        city,
        state,
        zip,
        country,
      });
      myToast(data.msg, "success");
      getDashboard();
      getProfileShort();
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error, "failure");
    }
  };

  return (
    <div className="my-8">
      {!isVerified && (
        <div className="mb-10 flex justify-center items-center flex-col border border-yellow rounded-lg p-4 md:p-6">
          <h3 className="mb-4 font-medium">Verify Your Account</h3>
          <p className="text-center">
            Your account is unverfied. Please verify your account now to get 5
            web credits in your Jordan's Picks wallet.
          </p>
          <Button
            theme="yellow"
            className="mt-4 flex items-center gap-2"
            size="md-rect"
            onClick={() => {
              navigate(`/auth/verify-account?email=${email}`);
            }}
          >
            Verify Now
          </Button>
        </div>
      )}
      <div className="flex gap-16 md:flex-row flex-col">
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
            <input value={email} className="w-full type2 mt-1" disabled />
          </div>
          <div className="my-4">
            <label className="text-sm text-lightgrey2" htmlFor="phone">
              Phone
            </label>
            <input value={mobile} className="w-full type2 mt-1" disabled />
          </div>
          <div>
            <Button
              className="font-medium w-full"
              theme="yellow"
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
              className="cursor-pointer text-yellow font-medium text-sm"
              onClick={() => {
                navigate("/auth/forgot-password");
              }}
            >
              Forgot Password?
            </span>
          </div>
          <div className="my-4">
            <label className="text-sm text-lightgrey2" htmlFor="currentPass">
              Current Password
            </label>
            <input
              type="password"
              name="currentPass"
              id="currentPass"
              value={currentPass}
              onChange={(e) => setCurrentPass(e.target.value)}
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
              theme="yellow"
              rounded="sm"
              size="md-rect"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
      <div className="flex mt-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleChangeCustomerDetails();
          }}
          className="max-w-[38rem]"
        >
          <h4 className="font-medium">Saved Credit Card Details</h4>
          <p className="text-lightgrey2">
            For your security, we don't store credit card details. However, we
            do offer functionality to save customer addresses for efficient
            checkouts.
          </p>
          <div className="my-4">
            <label className="text-sm text-lightgrey2" htmlFor="address">
              Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full type2 mt-1"
              required
            />
          </div>
          <div className="my-4 flex gap-4 items-center flex-wrap">
            <div className="flex-1">
              <label className="text-sm text-lightgrey2" htmlFor="city">
                City
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full type2 mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-lightgrey2" htmlFor="state">
                State
              </label>
              <input
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full type2 mt-1"
                required
              />
            </div>
          </div>
          <div className="my-4 flex gap-4 items-center">
            <div className="flex-1">
              <label className="text-sm text-lightgrey2" htmlFor="zip">
                Zip
              </label>
              <input
                type="text"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                className="w-full type2 mt-1"
                required
              />
            </div>
            <div className="flex-1">
              <label className="text-sm text-lightgrey2" htmlFor="country">
                Country
              </label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full type2 mt-1"
                required
              />
            </div>
          </div>
          <div className="my-4">
            <label className="text-sm text-lightgrey2" htmlFor="company">
              Company Name (optional)
            </label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="w-full type2 mt-1"
            />
          </div>
          <div>
            <Button
              className="font-medium w-full"
              theme="yellow"
              rounded="sm"
              size="md-rect"
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AccountDetails;
