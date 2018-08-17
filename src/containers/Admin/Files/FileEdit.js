import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Redirect } from 'react-router-dom';
import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';
import 'react-quill/dist/quill.snow.css';
import EditorForm from '../../../components/Admin/EditForm';

import Aux from '../../../hoc/Helper/Helper';

import * as adminActions from '../../../store/admin/actions/actions';

const thisServiceName = 'files';
const thisNameSpace = 'file';
const schema = [
  {
    label: 'Title',
    dataIndex: 'title',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'Description',
    dataIndex: 'description',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'File Link',
    dataIndex: 'src',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'File Location',
    dataIndex: 'location',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'File Size',
    dataIndex: 'size',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'File Type',
    dataIndex: 'type',
    type: 'input',
    isRequired: false,
    requiredMessage: 'aaa'
  },
  {
    label: 'Upload',
    dataIndex: 'file',
    type: 'uploader',
    isRequired: false,
    requiredMessage: 'aaa'
  }
];

class adminEditor extends Component {
  componentDidMount() {
    let query = null;
    if (this.props.match && this.props.match.params.id) {
      query = {
        id: this.props.match.params.id
      };
      this.props.onSetQuery(thisNameSpace, thisServiceName, query);
      this.props.onGetData(thisNameSpace, thisServiceName);
    } else {
      this.props.onSetNew(thisNameSpace, thisServiceName);
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
          <EditorForm
            // selectedItem={this.props.selectedItem}
            // loading={this.props.loading}
            // error={this.props.error}
            // notification={this.props.notification}
            // match={this.props.match}
            // onUpdateItem={this.props.onUpdateItem}
            // onCreateItem={this.props.onCreateItem}
            {...this.props}
            schema={schema}
            serviceName={thisServiceName}
            nameSpace={thisNameSpace}
          />
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedItem: state.admin[thisNameSpace].selectedItem,
    loading: state.admin[thisNameSpace].loading,
    error: state.admin[thisNameSpace].error,
    redirectPath: state.admin[thisNameSpace].redirectPath,
    notification: state.admin[thisNameSpace].notification,
    locked: state.admin[thisNameSpace].locked
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
