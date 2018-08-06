import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6

import Aux from '../../../hoc/Helper/Helper';
import { updateObject } from '../../../shared/utility';

import * as commonActions from '../../../store/admin/actions/actions';
import { services } from '../../../feathers';

import classes from './PostEdit.scss';

const ButtonGroup = Button.Group;
const thisServiceName = 'posts';
const thisNameSpace = 'post';
class adminPostEdit extends Component {
  componentDidMount() {
    let query = null;
    if (this.props.match.params.id) {
      query = {
        id: this.props.match.params.id
      };
      this.props.onSetQuery(thisNameSpace, thisServiceName, query);
      this.props.onGetData(thisNameSpace, thisServiceName);
    } else {
      this.props.onSetNew(thisNameSpace, thisServiceName);
    }
  }

  componentWillUnmount() {}

  componentWillUpdate() {}

  componentWillMount() {}

  submitHandler = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err && this.props.match.params.id) {
        this.props.onUpdateItem(
          thisNameSpace,
          thisServiceName,
          this.props.match.params.id,
          values
        );
      } else if (!err) {
        this.props.onCreateItem(thisNameSpace, thisServiceName, values);
      }
    });
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    let Post = null;
    let postRedirect = null;

    if (this.props.redirectPath) {
      postRedirect = <Redirect to={this.props.redirectPath} />;
    }
    Post = (
      <Form onSubmit={this.submitHandler}>
        <FormItem label="Title:">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please write a title!' }]
          })(<Input size="large" placeholder="Title" />)}
        </FormItem>
        <FormItem label="Body">
          {getFieldDecorator('body', {
            rules: [{ required: true, message: 'Please write something...' }]
          })(<ReactQuill />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Submit!
          </Button>
        </FormItem>
      </Form>
    );

    return (
      <Aux>
        <div className={'post-edit'}>
          {postRedirect}
          {Post}
        </div>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    post: state.admin[thisNameSpace].selectedItem,
    loading: state.admin[thisNameSpace].loading,
    error: state.admin[thisNameSpace].error,
    isNew: state.admin[thisNameSpace].isNew,
    redirectPath: state.admin[thisNameSpace].redirectPath,
    loading: state.admin[thisNameSpace].loading,
    error: state.admin[thisNameSpace].error,
    notification: state.admin[thisNameSpace].notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData: (nameSpace, serviceName) =>
      dispatch(commonActions.getData(nameSpace, serviceName)),
    onSetQuery: (nameSpace, serviceName, query) =>
      dispatch(commonActions.setQuery(nameSpace, serviceName, query)),
    onUpdateItem: (nameSpace, serviceName, item, data) =>
      dispatch(commonActions.updateItem(nameSpace, serviceName, item, data)),
    onCreateItem: (nameSpace, serviceName, data) =>
      dispatch(commonActions.createItem(nameSpace, serviceName, data)),
    onSetNew: (nameSpace, serviceName, data) =>
      dispatch(commonActions.setNew(nameSpace, serviceName, data))
  };
};

const WrappedWriteForm = Form.create({
  mapPropsToFields(props) {
    return {
      title: Form.createFormField({
        ...props.title,
        value: props.post ? props.post.title : null
      }),
      body: Form.createFormField({
        ...props.body,
        value: props.post ? props.post.body : null
      })
    };
  }
})(adminPostEdit);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(WrappedWriteForm));
