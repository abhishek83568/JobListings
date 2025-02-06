import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import { jobReducer } from "./reducers";

const rootReducers = combineReducers({
  jobList: jobReducer,
});

export const store = legacy_createStore(rootReducers, applyMiddleware(thunk));
