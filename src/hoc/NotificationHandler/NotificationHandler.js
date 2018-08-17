import React, { Component } from 'react';

import Aux from '../Helper/Helper';
import { notification } from 'antd';
import { services } from '../../feathers';

const notificationHandler = WrappedComponent => {
  return class extends Component {
    // componentDidUpdate() {
    //   console.log("NOTF", this.props);
    //   if (this.props.notification) {
    //     this.openNotificationWithIcon(
    //       this.props.notification.type,
    //       this.props.notification.message
    //     );
    //   }
    // }
    componentDidMount() {
      console.log('notf props', this.props);
      services[this.props.serviceName].on('created', data => {
        //console.log('created', data);
        this.props.onCreateItemSuccess(
          this.props.nameSpace,
          this.props.serviceName,
          data
        );
        this.openNotificationWithIcon('success', 'created');
      });
      services[this.props.serviceName].on('removed', item => {
        this.openNotificationWithIcon('success', 'deleted');
        this.props.onDeleteItemSuccess(
          this.props.nameSpace,
          this.props.serviceName,
          item
        );
      });
      services[this.props.serviceName].on('updated', item => {
        this.openNotificationWithIcon('success', 'updated');
        // this.props.onDeleteItemSuccess(this.props.nameSpace, this.props.serviceName, item);
      });
      services[this.props.serviceName].on('patched', item => {
        this.openNotificationWithIcon('success', 'patched');
        // this.props.onDeleteItemSuccess(this.props.nameSpace, this.props.serviceName, item);
      });
    }
    componentWillUnmount() {
      services[this.props.serviceName].removeListener('created');
      services[this.props.serviceName].removeListener('updated');
      services[this.props.serviceName].removeListener('patched');
      services[this.props.serviceName].removeListener('removed');
    }
    openNotificationWithIcon = (type, message) => {
      notification[type]({
        message: type,
        description: message
      });
    };

    render() {
      return (
        <Aux>
          {this.notificationBox}

          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  };
};

export default notificationHandler;
