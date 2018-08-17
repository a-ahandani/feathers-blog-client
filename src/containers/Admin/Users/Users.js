import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../../hoc/Helper/Helper';
import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';

import * as adminActions from '../../../store/admin/actions/actions';
//import { services } from "../../../feathers";

import Datagrid from '../../../components/Admin/Datagrid';

const thisServiceName = 'users';
const thisNameSpace = 'users';

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
    this.props.onSetQuery(thisNameSpace, thisServiceName, query);
    this.props.onFindData(thisNameSpace, thisServiceName);
    // services[thisServiceName].on("created", post => {
    //   this.props.onCreateItemSuccess(thisNameSpace, thisServiceName, post);
    // });
    // services[thisServiceName].on("removed", item => {
    //   this.props.onDeleteItemSuccess(thisNameSpace, thisServiceName, item);
    // });
  }
  componentWillUnmount() {
    // services[thisServiceName].removeListener("created");
    // services[thisServiceName].removeListener("removed");
  }
  render() {
    return (
      <Aux>
        <Datagrid
          serviceName={thisServiceName}
          nameSpace={thisNameSpace}
          history={this.props.history}
          schema={this.props.schema}
          datasource={this.props.datasource}
          pagination={this.props.pagination}
          query={this.props.query}
          loading={this.props.loading}
          error={this.props.error}
          notification={this.props.notification}
          onFindData={this.props.onFindData}
          onDeleteItem={this.props.onDeleteItem}
          onDeleteItemSuccess={this.props.onDeleteItemSuccess}
          onSetPagination={this.props.onSetPagination}
          onSetQuery={this.props.onSetQuery}
          onCreateItemSuccess={this.props.onCreateItemSuccess}
        />
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    datasource: state.admin[thisNameSpace].datasource,
    pagination: state.admin[thisNameSpace].pagination,
    query: state.admin[thisNameSpace].query,
    loading: state.admin[thisNameSpace].loading,
    error: state.admin[thisNameSpace].error,
    notification: state.admin[thisNameSpace].notification
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
