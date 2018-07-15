import React, { Component } from 'react';

import Aux from '../Helper/Helper';
import { notification } from 'antd';

const notificationHandler = (WrappedComponent) => {
  return class extends Component {
    state = {
      notificationBox: null
    };
    componentWillMount() {

    }
    componentDidUpdate(){
      this.notificationBox = null;
      if (this.props.notification) {
        this.notificationBox = (
          this.openNotificationWithIcon(this.props.notification.type,this.props.notification.message)
        );
      }
    }
    componentWillUnmount() {
    }

    
    openNotificationWithIcon = (type,message) => {
      notification[type]({
        message: type,
        description: message,
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
