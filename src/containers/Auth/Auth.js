import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import classes from './Auth.scss';
import * as actions from './store/actions/index';
import { updateObject } from '../../shared/utility';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        touched: false
      }
    },
    isSignup: false
  };

  componentDidMount() {
    if (this.props.authRedirectPath !== '/blog') {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onAuth(
          this.state.controls.email.value,
          this.state.controls.password.value,
          this.state.isSignup
        );
      }
    });
  };

  switchAuthModeHandler = event => {
    event.preventDefault();
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />;
    }
    return (
      <div className={'auth'}>
        <Form className={'forms'} onSubmit={this.submitHandler}>
          {authRedirect}
          <FormItem label="User Name:">
            {getFieldDecorator('email', {
              rules: [
                { required: true, message: 'Please input your username!' }
              ]
            })(
              <Input
                placeholder="Username"
                onChange={event => this.inputChangedHandler(event, 'email')}
              />
            )}
          </FormItem>
          <FormItem label="Password">
            {getFieldDecorator('password', {
              rules: [
                { required: true, message: 'Please input your Password!' }
              ]
            })(
              <Input
                onChange={event => this.inputChangedHandler(event, 'password')}
                type="password"
                autoComplete="off"
                placeholder="Password"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              loading={this.props.loading}
            >
              Login!
            </Button>
            Or{' '}
            <a onClick={this.switchAuthModeHandler} href="#">
              SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
            </a>
          </FormItem>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) =>
      dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/blog'))
  };
};

const WrappedAuthForm = Form.create()(Auth);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedAuthForm);
