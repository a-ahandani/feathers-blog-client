import * as actionTypes from "./actionTypes";


export const setPosts = (posts) => {
  return {
    type: actionTypes.SET_POSTS,
    posts: posts
  };
};

export const setNewPosts = (post) => {
  return {
    type: actionTypes.SET_NEW_POSTS,
    post: post
  };
};

export const fetchBlogsFailed = () => {
  return {
    type: actionTypes.FETCH_BLOGS_FAILED
  };
};


export const initPosts = () => {
  return {
    type: actionTypes.INIT_POSTS
  };
};




