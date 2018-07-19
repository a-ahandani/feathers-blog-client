import * as adminActionTypes from "./types";

export const fetchDataStart = (nameSpace, serviceName) => {
  return {
    type: adminActionTypes.FETCH_DATA_START,
    nameSpace, serviceName
  };
};
export const setData = (nameSpace, serviceName, data) => {
  return {
    type: adminActionTypes.SET_DATA,
    data,
    nameSpace,serviceName
  };
};
export const setNewItem = (nameSpace, serviceName, item) => {
  return {
    type: adminActionTypes.SET_NEW_ITEM,
    item,
    nameSpace, serviceName
  };
};

export const setQuery = (nameSpace, serviceName, query) => {
  return {
    type: adminActionTypes.SET_QUERY,
    query,
    nameSpace, serviceName
  };
};

export const setPagination = (nameSpace, serviceName, pagination) => {
  return {
    type: adminActionTypes.SET_PAGINATION,
    pagination,
    nameSpace, serviceName
  };
};

export const fetchDataFailed = (nameSpace, serviceName, error) => {
  return {
    type: adminActionTypes.FETCH_DATA_FAILED,
    error,
    nameSpace, serviceName
  };
};


export const getData = (nameSpace, serviceName) => {

  return {
    type: adminActionTypes.GET_DATA,
    nameSpace, serviceName
  };
};

export const deleteItem = (nameSpace, serviceName, item) => {
  return {
    type: adminActionTypes.DELETE_ITEM,
    item,
    nameSpace, serviceName
  };
};



export const deleteItemSuccess = (nameSpace, serviceName, item) => {
  return {
    type: adminActionTypes.DELETE_ITEM_SUCCESS,
    item,
    nameSpace, serviceName
  };
};


export const updateItem = (nameSpace, serviceName, id, data) => {
  return {
    type: adminActionTypes.UPDATE_ITEM,
    id,
    data,
    nameSpace, serviceName
  };
};



