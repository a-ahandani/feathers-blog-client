import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';
import ReactQuill from 'react-quill'; // ES6
import 'react-quill/dist/quill.snow.css'; // ES6


import Aux from "../../../hoc/Helper/Helper";
import { updateObject } from "../../../shared/utility";

import * as commonActions from "../../../store/admin/actions/actions";
import { services } from "../../../feathers";

import classes from "./PostEdit.scss";

const ButtonGroup = Button.Group;


class adminPostEdit extends Component {
  componentDidMount() {
    const query = {
      id: this.props.match.params.id
    };
    this.props.onSetQuery("post", "posts", query);
    this.props.onGetData("post", "posts");
  }

  componentWillUnmount() {
  }
  componentWillUpdate() {
  }
  componentWillMount() {
  }
  inputChangedHandler = (event, controlName) => {
    const updatedPostData = [updateObject(this.props.post[0], {
      [controlName]: event.target.value
    })];
    this.props.onSetData("post", "posts", updatedPostData)
  };
  submitHandler = (event) => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        this.props.onUpdateItem("post", "posts", this.props.match.params.id, values)
      }
    });
  };

  render() {
    const { TextArea } = Input;
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    let Post = null
    if (this.props.post && this.props.post[0]) {

      Post = <Form onSubmit={this.submitHandler} >
        <FormItem label="Title:" >
          {getFieldDecorator("title", {
            rules: [{ required: true, message: "Please write a title!" }]
          })(
            <Input size="large" onChange={(event) => this.inputChangedHandler(event, "title")} placeholder="Title" />
          )}
        </FormItem>
        <FormItem label="Body" >
          {getFieldDecorator("body", {
            rules: [{ required: true, message: "Please write something..." }]
          })(
          //  <TextArea />
            <ReactQuill/>  
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" loading={this.props.loading}   >
            Submit!
         </Button>
        </FormItem>
      </Form>
    }

    return <Aux>
      <div className={"post-edit"}>
        {Post}
      </div>
    </Aux>;
  }
}

const mapStateToProps = state => {
  return {
    post: state.admin.post.datasource,
    loading: state.admin.post.loading,
    error: state.admin.post.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetData: (nameSpace, serviceName) => dispatch(commonActions.getData(nameSpace, serviceName)),
    onSetData: (nameSpace, serviceName, data) => dispatch(commonActions.setData(nameSpace, serviceName, data)),
    onSetQuery: (nameSpace, serviceName, query) => dispatch(commonActions.setQuery(nameSpace, serviceName, query)),
    onUpdateItem: (nameSpace, serviceName, item, data) => dispatch(commonActions.updateItem(nameSpace, serviceName, item, data)),

  };
};

const WrappedWriteForm = Form.create({

  mapPropsToFields(props) {
    if (props.post) {
      return {
        title: Form.createFormField({
          ...props.title,
          value: props.post[0].title,
        }),
        body: Form.createFormField({
          ...props.body,
          value: props.post[0].body,
        }),
      };
    }

  },

})(adminPostEdit);
export default connect(mapStateToProps, mapDispatchToProps)(notificationHandler(WrappedWriteForm));
