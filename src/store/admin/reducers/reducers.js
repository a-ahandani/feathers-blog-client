import * as commonTypes from '../actions/types';

const initialState = {
  datasource: null,
  selectedItem: null,
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
      createdAt: -1
    }
  },
  loading: false,
  error: false,
  notification: null,
  isNew: false,
  redirectPath: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case commonTypes.FETCH_DATA_START:
      return {
        ...state,
        loading: true,
        error: false,
        notification: null,
        redirectPath: null
      };
    case commonTypes.FIND_DATA_SUCCESS:
      return {
        ...state,
        datasource: action.data,
        loading: false,
        error: false,
        isNew: false,
        redirectPath: null,
        notification: null
      };
    case commonTypes.GET_DATA_SUCCESS:
      return {
        ...state,
        selectedItem: action.data,
        loading: false,
        error: false,
        isNew: false,
        redirectPath: null,
        notification: null
      };
    case commonTypes.SET_QUERY:
      return {
        ...state,
        query: action.query,
        notification: null,
        redirectPath: null
      };
    case commonTypes.CREATE_ITEM_SUCCESS:
      const updatePosts = state.datasource
        ? [action.item, ...state.datasource]
        : null;
      return {
        ...state,
        datasource: updatePosts,
        selectedItem: action.item,
        loading: false,
        error: false,
        redirectPath:
          '/admin/' + action.serviceName + '/edit/' + action.item.id,
        notification: {
          type: 'success',
          message: 'Item added!'
        }
      };

    case commonTypes.FETCH_DATA_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
        notification: {
          type: 'error',
          message: action.error.message
        }
      };
    case commonTypes.DELETE_ITEM_SUCCESS:
      const datasourceCopy = [...state.datasource];
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
          type: 'success',
          message: 'Item deleted!'
        }
      };
    case commonTypes.UPDATE_ITEM_SUCCESS:
      return {
        ...state,
        selectedItem: action.item,
        loading: false,
        error: false,
        isNew: false,
        redirectPath: null,
        notification: {
          type: 'success',
          message: 'Item updated!'
        }
      };

    case commonTypes.SET_NEW:
      return {
        ...state,
        selectedItem: null,
        loading: false,
        error: false,
        isNew: false,
        redirectPath: null,
        notification: null
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
