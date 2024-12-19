import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import { thunk } from "redux-thunk"; // Correctly import `thunk`
import authReducer from "./auth/authReducer";
import bookReducer from "./books/bookReducers";

const rootReducer = combineReducers({
  auth: authReducer,
  book: bookReducer
});

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)) // Use named import `thunk`
);

export default store;
