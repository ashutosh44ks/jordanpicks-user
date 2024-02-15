import axios from "axios";
import { jwtDecode } from "jwt-decode";

const updateToken = async () => {
  const refreshToken = localStorage.getItem("jordanTokenRefresh");
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_API_URL}user/refreshToken`,
      {
        refreshToken,
      }
    );
    localStorage.setItem("jordanToken", data.dta);
    const decodedToken = jwtDecode(data.dta);
    console.log("token updated");
    return decodedToken.id;
  } catch (e) {
    console.log(e);
    localStorage.removeItem("jordanToken");
    localStorage.removeItem("jordanTokenRefresh");
    return null;
  }
};

export default updateToken;
