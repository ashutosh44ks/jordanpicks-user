import axios from "axios";

const updateToken = async (runSetter, setter) => {
  const refreshToken = localStorage.getItem("jordanTokenRefresh");
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}user/refreshToken`,
      {
        refreshToken,
      }
    );
    localStorage.setItem("jordanToken", data.dta);
    console.log("token updated");
    if (runSetter) setter("user");
  } catch (e) {
    console.log(e);
    localStorage.removeItem("jordanToken");
    localStorage.removeItem("jordanTokenRefresh");
    if (runSetter) setter("");
  }
};

export default updateToken;