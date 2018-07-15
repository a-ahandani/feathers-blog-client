import * as actionTypes from "../actions/actionTypes";

const initialState = {
  posts: null,
  error: false
};

const blog = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_POSTS:
      return {
        ...state,
        posts: action.posts,
        error: false
      };
    case actionTypes.SET_NEW_POSTS:
      const updatePosts = [
        action.post,
        ...state.posts
      ];
      return {
        ...state,
        posts: updatePosts,
        error: false
      };
    case actionTypes.FETCH_BLOGS_FAILED:
      return {
        ...state,
        error: true
      };
    default:
      return state;
  }

};
export default blog;