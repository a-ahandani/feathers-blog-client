import React, { Component } from 'react';
import { Drawer, Button } from 'antd';
import ListsContainer from '../../containers/Admin/Posts/Posts';
import EditorContainer from '../../containers/Admin/Posts/PostEdit';

const filesSchema = [
  {
    title: '',
    dataIndex: 'src',
    type: 'image',
    width: 60
  },
  {
    title: '',
    dataIndex: 'size'
  },
  {
    title: '',
    type: 'action',
    width: 80,
    actions: ['select']
  }
];
const filesEditSchema = [
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
export class componentName extends Component {
  state = {
    showAddNewFile: false
  };
  addNewFileHanler = () => {
    this.setState({ showAddNewFile: !this.state.showAddNewFile });
  };
  render() {
    return (
      <Drawer
        title="File Manager"
        width={420}
        placement="right"
        closable={true}
        onClose={this.props.clickHandler}
        visible={this.props.show}
      >
        <Button type="primary" onClick={this.addNewFileHanler}>
          Add New File
        </Button>
        <Drawer
          title="Add New File"
          width={420}
          placement="right"
          closable={true}
          onClose={this.addNewFileHanler}
          visible={this.state.showAddNewFile}
        >
          <EditorContainer
            {...this.props}
            nameSpace={'file'}
            serviceName={'files'}
            schema={filesEditSchema}
            offRoute={true}
          />
        </Drawer>
        <ListsContainer
          {...this.props}
          nameSpace={'files'}
          serviceName={'files'}
          schema={filesSchema}
          onSelectItem={this.props.onSelectItem}
          forceQuery={{ type: 'image/jpeg' }}
        />
      </Drawer>
    );
  }
}

export default componentName;
