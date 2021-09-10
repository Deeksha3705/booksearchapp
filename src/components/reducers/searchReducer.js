import defaultState from "./defaultState";
import {
  FETCH_SEARCH_REQUEST,
  FETCH_SEARCH_SUCCESS,
  FIRST_SCREEN_TOGGLE,
  SORT_DATE,
  SORT_BY_TITLE_Z_A,
  SORT_BY_TITLE_A_Z,
  FETCH_AUTHOR_SUCCESS
} from "../constants";

const incdecReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FETCH_SEARCH_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case FIRST_SCREEN_TOGGLE:
      return {
        ...state,

        firstScreen: false,
      };
      case FETCH_AUTHOR_SUCCESS:
        return {
          ...state,
          authorData: action.payload,
        };
      case SORT_BY_TITLE_A_Z: 
      return {
        ...state,
        data: state.data.sort(function(a, b){
          if(a.title < b.title) { return -1; }
          if(a.title > b.title) { return 1; }
          return 0;
      })
      };
      case SORT_BY_TITLE_Z_A: 
      return {
        ...state,
        data: state.data.sort(function(a, b){
          if(a.title > b.title) { return -1; }
          if(a.title < b.title) { return 1; }
          return 0;
      })
      };
      case SORT_DATE: 
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default incdecReducer;
