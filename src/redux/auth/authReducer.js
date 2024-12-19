import { LOGIN_SUCCESS, LOGOUT } from "./authTypes";

const initialState = {
  token: localStorage.getItem("token") || null,
};

const authReducer = (state = initialState, action) => {
    console.log("Action received:", action); // Debug action
    switch (action.type) {
      case LOGIN_SUCCESS:
        console.log("State updated:", { ...state, token: action.payload });
        return { ...state, token: action.payload };
      case LOGOUT:
        return { ...state, token: null };
      default:
        return state;
    }
  };
  

export default authReducer;
