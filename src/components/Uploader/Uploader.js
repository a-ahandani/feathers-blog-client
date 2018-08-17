import React, { Component } from 'react';
import { Upload, Icon, message } from 'antd';
import { appService } from '../../feathers';
const Dragger = Upload.Dragger;

export class Uploader extends Component {
  customRequest = data => {
    const uploadService = appService.service('uploader');
    const reader = new FileReader();
    reader.readAsDataURL(data.file);
    reader.addEventListener(
      'load',
      function() {
        uploadService.create({ uri: reader.result }).then(function(response) {
          data.onSuccess(response);
        });
      },
      false
    );
  };
  handleChange = info => {
    const status = info.file.status;
    if (status !== 'uploading') {
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
    this.props.onChange(info.file);
  };
  render() {
    return (
      <Dragger customRequest={this.customRequest} onChange={this.handleChange}>
        <p className="ant-upload-drag-icon">
          <Icon type="inbox" />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading
          company data or other band files
        </p>
      </Dragger>
    );
  }
}

export default Uploader;
