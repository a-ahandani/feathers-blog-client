import * as commonTypes from "../actions/types";

const initialState = {

  datasource: null,
  notification: null,
  pagination: {
    total: null,
    pageSize: 10,
    defaultPageSize: 10,
    current: 1
  },
  query: {
    $skip: 0,
    $limit: 10,
    $sort: {
      "createdAt": -1
    }
  },
  loading: false,
  error: false,
  notification: null

};

const reducer = (state = initialState, action) => {

  switch (action.type) {

    case commonTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: false,
        notification: null
      };
    case commonTypes.SET_DATA:
      return {
        ...state,
        datasource: action.data,
        loading: false,
        error: false,
        notification: null
      };
    case commonTypes.SET_QUERY:
    console.log("reducer->",action.query)
      return {
        ...state,
        query: action.query,
        notification: null
      };
    case commonTypes.SET_NEW_ITEM:
      const updatePosts = [
        action.item,
        ...state.datasource
      ];
      return {
        ...state,
        datasource: updatePosts,
        loading: false,
        error: false,
        notification: null
      };
    case commonTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        notification: {
          type: "error",
          message: action.error.message
        }
      };
    case commonTypes.DELETE_ITEM_SUCCESS:
      const datasourceCopy = [
        ...state.datasource
      ];
      const updatedPosts = [];
      datasourceCopy.map((item, index) => {
        if (item.id !== action.item.id) {
          updatedPosts.push(item);
        }
      });
      return {
        ...state,
        datasource: updatedPosts,
        loading: false,
        error: false,
        notification: {
          type: "success",
          message: 'Item deleted!'
        }
      };
    case commonTypes.SET_PAGINATION:
      return {
        ...state,
        pagination: action.pagination,
        notification: null
      };
    default:
      return state;
  }

};


export default reducer;