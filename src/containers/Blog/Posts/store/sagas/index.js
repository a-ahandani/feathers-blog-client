import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";

import {
  initPostsSaga
} from "./blog";

export function* watchBlog() {
  yield takeEvery(actionTypes.INIT_POSTS, initPostsSaga);
}