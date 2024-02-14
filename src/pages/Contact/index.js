import { useState, useEffect, useContext } from "react";
import PassContext from "../../components/utils/PassContext";
import api from "../../components/utils/api";
import myToast from "../../components/utils/myToast";
import Button from "../../components/common/Button";
import { IoIosArrowDown } from "react-icons/io";
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
      setFName("");
      setLName("");
      setEmail("");
      setPhone("");
      setMsg("");
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

  const [terms, setTerms] = useState(false);
  return (
    <div className="contact-page">
      <div>
        <p className="text-center text-yellow">Contact Us</p>
        <h2 className="text-center font-medium my-4">Get in Touch</h2>
        <p className="text-center text-lightgrey2">
          We’d love to hear from you. Please fill out this form.
        </p>
      </div>
      <form
        className="my-10"
        onSubmit={(e) => {
          e.preventDefault();
          sendMsg();
        }}
      >
        <div className="input-group">
          <div>
            <div className="text-sm mb-2 text-lightgrey2">First Name</div>
            <input
              className="min-w-[20rem] w-full type2"
              type="text"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <div className="text-sm mb-2 text-lightgrey2">Last Name</div>
            <input
              className="min-w-[20rem] w-full type2"
              type="text"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              placeholder="Last Name"
              required
            />
          </div>
        </div>
        <div className="mb-5">
          <div className="text-sm mb-2 text-lightgrey2">Email</div>
          <div>
            <input
              className="min-w-[20rem] w-full type2"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
        </div>
        <div>
          <div className="text-sm mb-2 text-lightgrey2">Phone Number</div>
          <div className="input-group">
            <div className="absolute px-4 py-3 text-lightgrey2">US +1</div>
            <input
              style={{
                paddingLeft: "4rem",
              }}
              className="min-w-[20rem] w-full type2"
              type="text"
              value={phone}
              onChange={(e) => {
                if (!isNaN(e.target.value)) setPhone(e.target.value);
              }}
              maxLength={10}
              placeholder="(555) 000-0000"
              required
            />
          </div>
        </div>
        <div>
          <div className="text-sm mb-2 text-lightgrey2">Message</div>
          <textarea
            className="min-w-[20rem] w-full type2"
            type="text"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            rows={5}
            required
          />
        </div>
        <div className="my-4 w-full text-lightgrey2">
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
            You agree to our friendly{" "}
            <span
              className="cursor-pointer text-yellow font-medium"
              onClick={() => {
                window.open("https://www.jordanspicks.com/terms", "_blank");
              }}
            >
              privacy policy
            </span>
          </label>
        </div>
        <div>
          <Button
            theme="yellow"
            type="submit"
            className="w-full"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
