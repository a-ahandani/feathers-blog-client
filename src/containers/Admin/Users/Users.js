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

import * as adminActions from '../../../store/admin/actions/actions';
import { services } from '../../../feathers';

const ButtonGroup = Button.Group;
const { RangePicker } = DatePicker;
const thisServiceName = 'users';

class adminUsers extends Component {
  componentDidMount() {
    this.props.onFindData('users', thisServiceName);
    services.users.on('created', post => {
      // this.props.onSetNewItem("users",thisServiceName, post);
    });
    services.users.on('removed', item => {
      this.props.onDeleteItemSuccess('users', thisServiceName, item);
    });
  }
  componentWillUnmount() {
    services.users.removeListener('created');
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
    this.props.onSetQuery('users', thisServiceName, query);
    this.props.onSetPagination('users', thisServiceName, pagination);
    this.props.onFindData('users', thisServiceName);
  };
  itemDeleteHandler = (e, record) => {
    this.props.onDeleteItem('users', thisServiceName, record);
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
        title: 'Email',
        dataIndex: 'email',
        sorter: true,
        key: 'email',
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
        width: 360,
        render: (text, record) => (
          <ButtonGroup>
            <Button type={'dashed'}>Publish</Button>
            <Button type={'primary'}>Edit</Button>
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

    let users = <p> Err</p>;

    if (!this.props.error && this.props.users) {
      users = (
        <Table
          rowKey={record => record.id}
          columns={columns}
          pagination={this.props.pagination}
          loading={this.props.loading}
          dataSource={this.props.users}
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

          <Col span={24}>{users}</Col>
        </Row>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin.users.datasource,
    pagination: state.admin.users.pagination,
    query: state.admin.users.query,
    loading: state.admin.users.loading,
    error: state.admin.users.error
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
      dispatch(adminActions.setQuery(nameSpace, serviceName, query))
    //onSetNewItem: (nameSpace, serviceName, post) => dispatch(adminActions.setNewItem(nameSpace, serviceName, post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(adminUsers));
