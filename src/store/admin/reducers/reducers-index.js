import { combineReducers } from 'redux';

import adminReducer from './reducers';
//import adminItemsReducer from "./items-reducer";

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
  posts: createNamedWrapperReducer(adminReducer, 'posts'),
  post: createNamedWrapperReducer(adminReducer, 'post'),

  users: createNamedWrapperReducer(adminReducer, 'users'),
  user: createNamedWrapperReducer(adminReducer, 'user'),

  files: createNamedWrapperReducer(adminReducer, 'files'),
  file: createNamedWrapperReducer(adminReducer, 'file')
});

export default index;
