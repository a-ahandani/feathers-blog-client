import { takeEvery } from 'redux-saga/effects';
import * as actionTypes from '../actions/types';

import {
  findDataSaga,
  getDataSaga,
  deleteItemSaga,
  updateItemSaga,
  createItemSaga
} from './sagas';

export function* watchAdmin() {
  yield takeEvery(actionTypes.GET_DATA, getDataSaga);
  yield takeEvery(actionTypes.FIND_DATA, findDataSaga);
  yield takeEvery(actionTypes.DELETE_ITEM, deleteItemSaga);
  yield takeEvery(actionTypes.UPDATE_ITEM, updateItemSaga);
  yield takeEvery(actionTypes.CREATE_ITEM, createItemSaga);
}
