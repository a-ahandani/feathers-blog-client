import { put, select } from 'redux-saga/effects';
import * as adminActions from '../actions/actions';
import { services } from '../../../feathers';

export function* getDataSaga(payload) {
  try {
    const getQuery = state => state.admin[payload.nameSpace].query;
    const query = yield select(getQuery);
    yield put(
      adminActions.fetchDataStart(payload.nameSpace, payload.serviceName)
    );

    const response = yield services[payload.serviceName].get(query.id);
    yield put(
      adminActions.getDataSuccess(
        payload.nameSpace,
        payload.serviceName,
        response
      )
    );
  } catch (error) {
    yield put(
      adminActions.fetchDataFailed(
        payload.nameSpace,
        payload.serviceName,
        error
      )
    );
  }
}

export function* findDataSaga(payload) {
  try {
    const getQuery = state => state.admin[payload.nameSpace].query;
    const query = yield select(getQuery);
    yield put(
      adminActions.fetchDataStart(payload.nameSpace, payload.serviceName)
    );
    //  const query = payload.query;
    const response = yield services[payload.serviceName].find({ query });
    yield put(
      adminActions.setPagination(payload.nameSpace, payload.serviceName, {
        total: response.total,
        pageSize: response.limit,
        defaultPageSize: response.limit
      })
    );
    yield put(
      adminActions.findDataSuccess(
        payload.nameSpace,
        payload.serviceName,
        response.data
      )
    );
  } catch (error) {
    yield put(
      adminActions.fetchDataFailed(
        payload.nameSpace,
        payload.serviceName,
        error
      )
    );
  }
}

export function* updateItemSaga(payload) {
  console.log('update', payload);
  try {
    const response = yield services[payload.serviceName].update(
      payload.id,
      payload.data
    );

    yield put(
      adminActions.updateItemSuccess(
        payload.nameSpace,
        payload.serviceName,
        response
      )
    );
  } catch (error) {
    yield put(
      adminActions.fetchDataFailed(
        payload.nameSpace,
        payload.serviceName,
        error
      )
    );
  }
}

export function* createItemSaga(payload) {
  try {
    const response = yield services[payload.serviceName].create(payload.data);

    yield put(
      adminActions.createItemSuccess(
        payload.nameSpace,
        payload.serviceName,
        response
      )
    );
  } catch (error) {
    yield put(
      adminActions.fetchDataFailed(
        payload.nameSpace,
        payload.serviceName,
        error
      )
    );
  }
}

export function* deleteItemSaga(payload) {
  try {
    const response = yield services[payload.serviceName].remove(
      payload.item.id
    );

    yield put(
      adminActions.deleteItemSuccess(
        payload.nameSpace,
        payload.serviceName,
        response
      )
    );
  } catch (error) {
    yield put(
      adminActions.fetchDataFailed(
        payload.nameSpace,
        payload.serviceName,
        error
      )
    );
  }
}
