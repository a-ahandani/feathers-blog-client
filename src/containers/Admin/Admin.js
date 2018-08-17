import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import classes from './Admin.scss';

import ListsContainer from './Posts/Posts';
import EditorContainer from './Posts/PostEdit';

// import Users from "./Users/Users";
// import UserEdit from "./Users/UserEdit";

// import Files from "./Files/Files";
// import FileEdit from "./Files/FileEdit";

const filesSchema = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: 85
  },
  {
    title: 'Thumbnail',
    dataIndex: 'src',
    type: 'image',
    width: 90
  },
  {
    title: 'Type',
    dataIndex: 'type',
    width: 120
  },
  {
    title: 'Path',
    dataIndex: 'image'
  },
  {
    title: 'Size',
    dataIndex: 'size',
    width: 120
  },
  {
    title: 'Date',
    dataIndex: 'createdAt',
    type: 'date',
    width: 120,
    sorter: true
  },
  {
    title: 'Actions',
    type: 'action',
    actions: ['edit', 'delete'],
    width: 200
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

const postsSchema = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: 85
  },
  {
    title: 'Thumbnail',
    dataIndex: 'image',
    type: 'image',
    width: 90
  },
  {
    title: 'Title',
    dataIndex: 'title'
  },
  {
    title: 'User',
    dataIndex: 'user.firstName',
    width: 120
  },

  {
    title: 'Date',
    dataIndex: 'createdAt',
    type: 'date',
    width: 120,
    sorter: true
  },
  {
    title: 'Actions',
    type: 'action',
    width: 200,
    actions: ['edit', 'delete']
  }
];
const postsEditSchema = [
  {
    label: 'Title',
    dataIndex: 'title',
    type: 'input',
    isRequired: true,
    requiredMessage: 'aaa'
  },
  {
    label: 'Body',
    dataIndex: 'body',
    type: 'text-editor',
    isRequired: true,
    requiredMessage: 'aaa'
  },
  {
    label: 'Image',
    dataIndex: 'image',
    type: 'image',
    isRequired: false,
    requiredMessage: 'aaa'
  }
];

const usersSchema = [
  {
    title: 'Id',
    dataIndex: 'id',
    width: 85
  },
  {
    title: 'Thumbnail',
    dataIndex: 'image',
    type: 'image',
    width: 90
  },
  {
    title: 'First Name',
    dataIndex: 'firstName'
  },

  {
    title: 'Last Name',
    dataIndex: 'lastName'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    width: 120
  },

  {
    title: 'Date',
    dataIndex: 'createdAt',
    type: 'date',
    width: 120,
    sorter: true
  },
  {
    title: 'Actions',
    type: 'action',
    width: 200,
    actions: ['edit', 'delete']
  }
];
const usersEditSchema = [
  {
    label: 'Email',
    dataIndex: 'email',
    type: 'input',
    isRequired: true,
    requiredMessage: 'aaa'
  },
  {
    label: 'First Name',
    dataIndex: 'firstName',
    type: 'input',
    isRequired: false,
    requiredMessage: ''
  },
  {
    label: 'Last Name',
    dataIndex: 'lastName',
    type: 'input',
    isRequired: false,
    requiredMessage: ''
  },
  {
    label: 'Password',
    dataIndex: 'password',
    type: 'input',
    isRequired: true,
    requiredMessage: ''
  },
  {
    label: 'Image',
    dataIndex: 'image',
    type: 'image',
    isRequired: false,
    requiredMessage: 'aaa'
  }
];

class Admin extends Component {
  render() {
    return (
      <div className={'admin-container'}>
        <Route
          exact
          path={'/admin/posts'}
          render={props => (
            <ListsContainer
              nameSpace={'posts'}
              serviceName={'posts'}
              schema={postsSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/posts/edit/:id'}
          render={props => (
            <EditorContainer
              nameSpace={'post'}
              serviceName={'posts'}
              schema={postsEditSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/posts/write'}
          render={props => (
            <EditorContainer
              nameSpace={'post'}
              serviceName={'posts'}
              schema={postsEditSchema}
              {...props}
            />
          )}
        />

        <Route
          exact
          path={'/admin/users'}
          render={props => (
            <ListsContainer
              nameSpace={'users'}
              serviceName={'users'}
              schema={usersSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/users/edit/:id'}
          render={props => (
            <EditorContainer
              nameSpace={'user'}
              serviceName={'users'}
              schema={usersEditSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/users/create'}
          render={props => (
            <EditorContainer
              nameSpace={'user'}
              serviceName={'users'}
              schema={usersEditSchema}
              {...props}
            />
          )}
        />

        <Route
          exact
          path={'/admin/files'}
          render={props => (
            <ListsContainer
              nameSpace={'files'}
              serviceName={'files'}
              schema={filesSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/files/edit/:id'}
          render={props => (
            <EditorContainer
              nameSpace={'file'}
              serviceName={'files'}
              schema={filesEditSchema}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={'/admin/files/upload'}
          render={props => (
            <EditorContainer
              nameSpace={'file'}
              serviceName={'files'}
              schema={filesEditSchema}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Admin;
