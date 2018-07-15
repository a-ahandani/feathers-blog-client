import { takeEvery } from "redux-saga/effects";
import * as actionTypes from "../actions/types";


import {
  getDataSaga,
  deleteItemSaga,
  updateItemSaga
} from "./sagas";

export function* watchAdmin() {
  yield takeEvery(actionTypes.GET_DATA, getDataSaga);
  yield takeEvery(actionTypes.DELETE_ITEM, deleteItemSaga);
  yield takeEvery(actionTypes.UPDATE_ITEM, updateItemSaga);
}