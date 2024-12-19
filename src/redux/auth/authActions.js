import { config } from "../../config/config";
import { LOGIN_SUCCESS, LOGOUT } from "./authTypes";
import axios from "axios";

export const loginUser = (credentials, navigate) => async (dispatch) => {

  try {
    const response = await axios.post(
      config.apiBaseUrl + "/api/user/login",
      credentials
    );
    const { authToken, email, userId } = response.data;

    localStorage.setItem("token", authToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userId", userId);
    dispatch({ type: LOGIN_SUCCESS, payload: authToken });

    // Navigate to dashboard
    navigate("/booklist");
  } catch (error) {
    console.error("Login failed:", error.response.data);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};
