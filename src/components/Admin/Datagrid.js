import React from 'react';
import Moment from 'react-moment';
import { Table, Button, Popconfirm, Avatar } from 'antd';
import Aux from '../../hoc/Helper/Helper';
const ButtonGroup = Button.Group;

const ListGenerator = props => {
  const tableChangeHandler = (pagination, filters, sorter) => {
    const query = {
      ...props.forceQuery,
      $skip: (pagination.current - 1) * props.pagination.pageSize,
      $limit: props.pagination.pageSize,
      $sort: sorter.field
        ? { [sorter.field]: sorter.order === 'ascend' ? 1 : -1 }
        : {}
    };
    props.onSetQuery(props.nameSpace, props.serviceName, query);
    props.onSetPagination(props.nameSpace, props.serviceName, pagination);
    props.onFindData(props.nameSpace, props.serviceName);
  };
  const itemDeleteHandler = (e, record) => {
    props.onDeleteItem(props.nameSpace, props.serviceName, record);
  };
  const itemSelectHandler = (e, record) => {
    props.onSelectItem(record);
  };
  const itemEditHandler = (e, record) => {
    props.history.push(props.nameSpace + '/edit/' + record.id);
  };

  const columnsMaker = () => {
    const middle = [];
    props.schema.map((item, index) => {
      item.key = item.dataIndex;
      switch (item.type) {
        case 'image':
          item.render = (text, data, i) => {
            let icon = 'picture';
            switch (data.type) {
              case 'image/jpeg':
                icon = 'picture';
                break;
              case 'image/png':
                icon = 'picture';
                break;
              case 'application/pdf':
                icon = 'file-pdf';
                break;
              case 'audio/mp3':
                icon = 'sound';
                break;

              default:
                icon = 'file';
                break;
            }
            return (
              <div>
                <Avatar
                  key={i}
                  size={item.width - 10}
                  icon={icon}
                  shape="square"
                  src={'http://localhost:3030/' + text}
                />
              </div>
            );
          };
          break;
        case 'date':
          item.render = date => (
            <div>
              <Moment fromNow>{date}</Moment>
            </div>
          );
          break;
        case 'action':
          item.render = (text, record) => {
            const actions = [];
            item.actions.map((item, index) => {
              switch (item) {
                case 'select':
                  actions.push(
                    <Button
                      key={index}
                      onClick={e => itemSelectHandler(e, record)}
                      type={'dashed'}
                    >
                      Select
                    </Button>
                  );
                  break;
                case 'edit':
                  actions.push(
                    <Button
                      key={index}
                      onClick={e => itemEditHandler(e, record)}
                      type={'primary'}
                    >
                      Edit
                    </Button>
                  );
                  break;
                case 'delete':
                  actions.push(
                    <Popconfirm
                      key={index}
                      placement="topRight"
                      title={'Are you sure delete this item?'}
                      onConfirm={e => itemDeleteHandler(e, record)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type={'danger'}>Delete</Button>
                    </Popconfirm>
                  );
                  break;
                default:
              }
            });
            return <ButtonGroup>{actions}</ButtonGroup>;
          };
          break;
        default:
          item.render = text => (
            <div>
              <b>{text}</b>
            </div>
          );
      }

      middle.push(item);
    });
    const schemaList = [...middle];
    return schemaList;
  };

  let listView = <p> Err</p>;

  if (!props.error && props.datasource) {
    listView = (
      <Table
        rowKey={record => {
          return record.id;
        }}
        columns={columnsMaker()}
        pagination={props.pagination}
        loading={props.loading}
        dataSource={props.datasource}
        onChange={tableChangeHandler}
      />
    );
  }

  return <Aux>{listView}</Aux>;
};

export default ListGenerator;
