import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Helper/Helper';
import notificationHandler from '../../hoc/NotificationHandler/NotificationHandler';

import * as adminActions from '../../store/admin/actions/actions';
//import { services } from "../../../feathers";

import Datagrid from '../../components/Admin/Datagrid';

class adminListView extends Component {
  componentDidMount() {
    const query = {
      ...this.props.forceQuery,
      $skip: 0,
      $limit: 10,
      $sort: {
        createdAt: -1
      }
    };
    this.props.onSetQuery(this.props.nameSpace, this.props.serviceName, query);
    this.props.onFindData(this.props.nameSpace, this.props.serviceName);
  }
  componentWillUnmount() {}
  render() {
    return (
      <Aux>
        <Datagrid {...this.props} />
      </Aux>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    datasource: state.admin[props.nameSpace].datasource,
    pagination: state.admin[props.nameSpace].pagination,
    query: state.admin[props.nameSpace].query,
    loading: state.admin[props.nameSpace].loading,
    error: state.admin[props.nameSpace].error,
    notification: state.admin[props.nameSpace].notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFindData: (nameSpace, serviceName) =>
      dispatch(adminActions.findData(nameSpace, serviceName)),
    onDeleteItem: (nameSpace, serviceName, item) =>
      dispatch(adminActions.deleteItem(nameSpace, serviceName, item)),
    onDeleteItemSuccess: (nameSpace, serviceName, item) =>
      dispatch(adminActions.deleteItemSuccess(nameSpace, serviceName, item)),
    onSetPagination: (nameSpace, serviceName, pagination) =>
      dispatch(adminActions.setPagination(nameSpace, serviceName, pagination)),
    onSetQuery: (nameSpace, serviceName, query) =>
      dispatch(adminActions.setQuery(nameSpace, serviceName, query)),
    onCreateItemSuccess: (nameSpace, serviceName, post) =>
      dispatch(adminActions.createItemSuccess(nameSpace, serviceName, post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(adminListView));
