import { put, select } from "redux-saga/effects";
import * as adminActions from "../actions/actions";
import { services } from "../../../feathers";

export function* getDataSaga(payload) {
  try {
    const getQuery = (state) => state.admin[payload.nameSpace].query;
    const query = yield select(getQuery);
    yield put(adminActions.fetchDataStart(payload.nameSpace, payload.serviceName));

    const response = yield services[payload.serviceName].find({ query });
    yield put(adminActions.setPagination(payload.nameSpace, payload.serviceName,
      {
        total: response.total,
        pageSize: response.limit,
        defaultPageSize: response.limit
      }
    ));
    yield put(adminActions.setData(payload.nameSpace, payload.serviceName, response.data));
  } catch (error) {

    yield put(adminActions.fetchDataFailed(payload.nameSpace, payload.serviceName, error));

  }
}



export function* updateItemSaga(payload) {
  console.log('----->',payload)
  try {
    const response = yield services[payload.serviceName].update(payload.id,payload.data);
  } catch (error) {
   yield put(adminActions.fetchDataFailed(payload.nameSpace, payload.serviceName, error));

  }
}





export function* deleteItemSaga(payload) {
  try {
    const response = yield services[payload.serviceName].remove(payload.item.id);
  } catch (error) {
    yield put(adminActions.fetchDataFailed(payload.nameSpace, payload.serviceName, error));

  }
}


