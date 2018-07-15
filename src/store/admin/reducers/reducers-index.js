import { combineReducers } from "redux";

import adminPostsReducer from "./reducers";



function createNamedWrapperReducer(reducerFunction, reducerName) {
  return (state, action) => {
    const { nameSpace } = action;
    const isInitializationCall = state === undefined;
    if (nameSpace !== reducerName && !isInitializationCall) {
      return state;

    } else {
      return reducerFunction(state, action);

    }

  };
}


const index = combineReducers({
  posts:createNamedWrapperReducer(adminPostsReducer,"posts"),
  post:createNamedWrapperReducer(adminPostsReducer,"post"),
  users:createNamedWrapperReducer(adminPostsReducer,"users")
});

export default index;