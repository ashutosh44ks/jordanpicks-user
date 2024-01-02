import { useState, useEffect, useContext } from "react";
import PassContext from "../../components/utils/PassContext";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import "./contact.css";

const Contact = () => {
  const { loggedUser } = useContext(PassContext);

  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [msg, setMsg] = useState("");

  const sendMsg = async () => {
    try {
      const { data } = await api.post("/user/contact", {
        fName,
        lName,
        email,
        mobile: phone,
        message: msg,
      });
      myToast(data.msg, "success");
    } catch (err) {
      console.log(err);
      myToast(err?.response?.data?.error || "Something went wrong", "failure");
    }
  };
  const getProfile = async () => {
    try {
      const { data } = await api.get("/user/getProfile");
      console.log(data);
      if (data?.dta?.user?._id) {
        setFName(data.dta.user.name.split(" ")[0]);
        setLName(data.dta.user.name.split(" ")[1] || "");
        setEmail(data.dta.user.email);
        setPhone(data.dta.user.mobile);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (loggedUser) getProfile();
  }, []);
  return (
    <div className="contact-page">
      <div>
        <h2 className="text-center mb-4">How can we help you?</h2>
        <h4 className="text-center">Get In Touch!</h4>
      </div>
      <form
        className="my-8"
        onSubmit={(e) => {
          e.preventDefault();
          sendMsg();
        }}
      >
        <div className="input-group">
          <input
            className="min-w-[20rem] w-full"
            type="text"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="First Name"
            required
          />
          <input
            className="min-w-[20rem] w-full"
            type="text"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div className="input-group">
          <input
            className="min-w-[20rem] w-full"
            type="text"
            value={phone}
            onChange={(e) => {
              if (!isNaN(e.target.value)) setPhone(e.target.value);
            }}
            maxLength={10}
            placeholder="Mobile No."
            required
          />
          <input
            className="min-w-[20rem] w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div className="mb-4">
          <textarea
            className="min-w-[20rem] w-full"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Message"
            rows={8}
            required
          />
        </div>
        <div>
          <Button
            theme="pink"
            type="submit"
            rounded="none"
            className="w-full md:w-[8rem]"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
