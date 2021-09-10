import { combineReducers } from "redux";
import searchReducer from "./components/reducers/searchReducer";

const rootReducer = combineReducers({
  data: searchReducer
});

export default rootReducer;
