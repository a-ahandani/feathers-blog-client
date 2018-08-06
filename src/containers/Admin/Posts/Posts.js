import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {
  Row,
  Table,
  Icon,
  Col,
  Button,
  Popconfirm,
  DatePicker,
  Divider
} from 'antd';
import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';

import Aux from '../../../hoc/Helper/Helper';

import * as adminPostsActions from '../../../store/admin/actions/actions';
import { services } from '../../../feathers';

import classes from './Posts.scss';

const ButtonGroup = Button.Group;
const { RangePicker } = DatePicker;

const thisServiceName = 'posts';
const thisNameSpace = 'posts';

class adminPosts extends Component {
  componentDidMount() {
    this.props.onFindData(thisNameSpace, thisServiceName);
    services.posts.on('created', post => {
      this.props.onCreateItemSuccess(thisNameSpace, thisServiceName, post);
    });
    services.posts.on('removed', item => {
      this.props.onDeleteItemSuccess(thisNameSpace, thisServiceName, item);
    });
  }
  componentWillUnmount() {
    services.posts.removeListener('created');
    services.posts.removeListener('removed');
  }

  componentWillMount() {}

  postSelectedHandler = id => {
    this.props.history.push('/blog/' + id);
  };

  tableChangeHandler = (pagination, filters, sorter) => {
    const query = {
      $skip: (pagination.current - 1) * this.props.pagination.pageSize,
      $limit: this.props.pagination.pageSize,
      $sort: sorter.field
        ? { [sorter.field]: sorter.order === 'ascend' ? 1 : -1 }
        : {}
    };
    this.props.onSetQuery(thisNameSpace, thisServiceName, query);
    this.props.onSetPagination(thisNameSpace, thisServiceName, pagination);
    this.props.onFindData(thisNameSpace, thisServiceName);
  };
  itemDeleteHandler = (e, record) => {
    this.props.onDeleteItem(thisNameSpace, thisServiceName, record);
  };
  itemEditHandler = (e, record) => {
    this.props.history.push('posts/edit/' + record.id);
  };
  render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'id',
        width: 100
      },
      {
        title: 'Title',
        dataIndex: 'title',
        sorter: true,
        key: 'title',
        render: text => <a href="javascript:;">{text}</a>
      },
      {
        title: 'Date',
        dataIndex: 'createdAt',
        sorter: true,
        key: 'createdAt',
        width: 250,
        render: date => (
          <div>
            <Moment fromNow>{date}</Moment>
          </div>
        )
      },
      {
        title: 'Action',
        key: 'action',
        width: 240,
        render: (text, record) => (
          <ButtonGroup>
            <Button type={'dashed'}>Publish</Button>

            <Button
              onClick={e => this.itemEditHandler(e, record)}
              type={'primary'}
            >
              Edit
            </Button>

            <Popconfirm
              placement="topRight"
              title={'Are you sure delete this item?'}
              onConfirm={e => this.itemDeleteHandler(e, record)}
              okText="Yes"
              cancelText="No"
            >
              <Button type={'danger'}>Delete</Button>
            </Popconfirm>
          </ButtonGroup>
        )
      }
    ];

    let posts = <p> Err</p>;

    if (!this.props.error && this.props.posts) {
      posts = (
        <Table
          rowKey={record => record.id}
          columns={columns}
          pagination={this.props.pagination}
          loading={this.props.loading}
          dataSource={this.props.posts}
          onChange={this.tableChangeHandler}
        />
      );
    }
    return (
      <Aux>
        <Row gutter={8}>
          <Col span={24}>
            <RangePicker />
          </Col>

          <Col span={24}>{posts}</Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.admin.posts.datasource,
    pagination: state.admin.posts.pagination,
    query: state.admin.posts.query,
    loading: state.admin.posts.loading,
    error: state.admin.posts.error,
    notification: state.admin.posts.notification
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFindData: (nameSpace, serviceName) =>
      dispatch(adminPostsActions.findData(nameSpace, serviceName)),
    onDeleteItem: (nameSpace, serviceName, item) =>
      dispatch(adminPostsActions.deleteItem(nameSpace, serviceName, item)),
    onDeleteItemSuccess: (nameSpace, serviceName, item) =>
      dispatch(
        adminPostsActions.deleteItemSuccess(nameSpace, serviceName, item)
      ),
    onSetPagination: (nameSpace, serviceName, pagination) =>
      dispatch(
        adminPostsActions.setPagination(nameSpace, serviceName, pagination)
      ),
    onSetQuery: (nameSpace, serviceName, query) =>
      dispatch(adminPostsActions.setQuery(nameSpace, serviceName, query)),
    onCreateItemSuccess: (nameSpace, serviceName, post) =>
      dispatch(
        adminPostsActions.createItemSuccess(nameSpace, serviceName, post)
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(adminPosts));
