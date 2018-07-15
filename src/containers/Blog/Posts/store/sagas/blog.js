import { put } from "redux-saga/effects";
import * as actions from "../actions/index";
import { fetchBlogsFailed, setPosts } from "../actions/blog";
import { services } from "../../../../../feathers";


export function* initPostsSaga(action) {
  try {
    const response = yield services.posts.find({
      query: {
        $limit: 10,
        $sort: {
          createdAt: -1
        }
      }
    });
    yield put(actions.setPosts(response.data));
  } catch (e) {
    yield put(actions.fetchBlogsFailed());

  }


}
