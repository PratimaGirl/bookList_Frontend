import { LOGIN_SUCCESS, LOGOUT } from "./authTypes";
import axios from "axios";

export const loginUser = (credentials, navigate) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/user/login",
      credentials
    );
    const { authToken, email, userId } = response.data;
    console.log("data::::::::", response.data);

    // Save token to local storage
    localStorage.setItem("token", authToken);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userId", userId);
    // Dispatch login success
    dispatch({ type: LOGIN_SUCCESS, payload: authToken });
console.log("Dispatched LOGIN_SUCCESS:", authToken);


    // Navigate to dashboard
    navigate("/dashboard");
  } catch (error) {
    console.error("Login failed:", error.response.data);
  }
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  return { type: LOGOUT };
};
