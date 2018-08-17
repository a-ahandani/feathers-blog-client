import React, { Component } from 'react';
import { Form, Input, Button, Icon, Upload, Avatar, List } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
//import Uploader from "../UI/Uploader/Uploader";
import Thumbnail from '../Thumbnail/Thumbnail';
import Uploader from '../Uploader/Uploader';
import Aux from '../../hoc/Helper/Helper';
const FormItem = Form.Item;
export class EditForm extends Component {
  switcher = type => {
    let inputElement = null;
    switch (type) {
      case 'input':
        inputElement = <Input size="large" />;
        break;
      case 'text-editor':
        inputElement = <ReactQuill />;
        break;
      case 'image':
        inputElement = <Thumbnail {...this.props} />;
        break;
      case 'uploader':
        inputElement = <Uploader />;
        break;

      default:
        inputElement = 'defualt';
    }
    return inputElement;
  };
  submitHandler = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (
        !err &&
        !this.props.locked &&
        this.props.match &&
        this.props.match.params.id
      ) {
        this.props.onUpdateItem(
          this.props.nameSpace,
          this.props.serviceName,
          this.props.match.params.id,
          values
        );
      } else if (!err && !this.props.locked) {
        this.props.onCreateItem(
          this.props.nameSpace,
          this.props.serviceName,
          values
        );
      }
    });
  };
  formMaker = () => {
    const { getFieldDecorator } = this.props.form;
    let elements = [];
    this.props.schema.map((item, index) => {
      let options = {
        rules: [{ required: item.isRequired, message: item.requiredMessage }]
      };
      // if (item.type === "uploader") {
      //   options.valuePropName = "file";
      //   options.getValueFromEvent = normFile;
      // }
      let formElement = (
        <FormItem key={index} label={item.label}>
          {getFieldDecorator(item.dataIndex, options)(this.switcher(item.type))}
        </FormItem>
      );
      elements.push(formElement);
    });
    return elements;
  };
  render() {
    let EDITOR = null;

    EDITOR = (
      <Form onSubmit={this.submitHandler}>
        {this.formMaker()}

        <FormItem>
          <Button type="primary" htmlType="submit" loading={this.props.loading}>
            Submit!
          </Button>
        </FormItem>
      </Form>
    );
    return <Aux>{EDITOR}</Aux>;
  }
}

const WrappedWriteForm = Form.create({
  onFieldsChange(props, fields) {
    // console.log("fields--->", fields);
    // console.log("props", props);
    props.onEditorChanged(props.nameSpace, props.serviceName, fields);
  },
  mapPropsToFields(props) {
    const mapSchema = {};

    props.schema.map((item, index) => {
      mapSchema[item.dataIndex] = Form.createFormField({
        ...props[item.dataIndex],
        value: props.selectedItem ? props.selectedItem[item.dataIndex] : null
      });
    });
    return mapSchema;
  }
})(EditForm);

export default WrappedWriteForm;
