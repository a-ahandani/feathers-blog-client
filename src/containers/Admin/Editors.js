import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import notificationHandler from '../../hoc/NotificationHandler/NotificationHandler';
import 'react-quill/dist/quill.snow.css';
import EditorForm from '../../components/Admin/EditForm';

import Aux from '../../hoc/Helper/Helper';

import * as adminActions from '../../store/admin/actions/actions';

class adminEditor extends Component {
  componentDidMount() {
    let query = null;
    if (this.props.match && this.props.match.params.id) {
      query = {
        id: this.props.match.params.id
      };
      this.props.onSetQuery(
        this.props.nameSpace,
        this.props.serviceName,
        query
      );
      this.props.onGetData(this.props.nameSpace, this.props.serviceName);
    } else {
      this.props.onSetNew(this.props.nameSpace, this.props.serviceName);
    }
  }

  render() {
    let editorRedirect = null;

    if (!this.props.offRoute && this.props.redirectPath) {
      editorRedirect = <Redirect to={this.props.redirectPath} />;
    }

    return (
      <Aux>
        <div className={'post-edit'}>
          {editorRedirect}
          <EditorForm {...this.props} />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    selectedItem: state.admin[props.nameSpace].selectedItem,
    loading: state.admin[props.nameSpace].loading,
    error: state.admin[props.nameSpace].error,
    redirectPath: state.admin[props.nameSpace].redirectPath,
    notification: state.admin[props.nameSpace].notification,
    locked: state.admin[props.nameSpace].locked
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData: (nameSpace, serviceName) =>
      dispatch(adminActions.getData(nameSpace, serviceName)),
    onSetQuery: (nameSpace, serviceName, query) =>
      dispatch(adminActions.setQuery(nameSpace, serviceName, query)),
    onUpdateItem: (nameSpace, serviceName, item, data) =>
      dispatch(adminActions.updateItem(nameSpace, serviceName, item, data)),
    onCreateItem: (nameSpace, serviceName, data) =>
      dispatch(adminActions.createItem(nameSpace, serviceName, data)),
    onCreateItemSuccess: (nameSpace, serviceName, post) =>
      dispatch(adminActions.createItemSuccess(nameSpace, serviceName, post)),
    onSetNew: (nameSpace, serviceName, data) =>
      dispatch(adminActions.setNew(nameSpace, serviceName, data)),
    onSetLock: (nameSpace, serviceName, data) =>
      dispatch(adminActions.setLock(nameSpace, serviceName, data)),
    onEditorChanged: (nameSpace, serviceName, data) =>
      dispatch(adminActions.editorChanged(nameSpace, serviceName, data))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(adminEditor));
