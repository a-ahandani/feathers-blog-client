import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout } from "antd";

import Aux from "../Helper/Helper";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";


import classes from "./Layout.scss";


const { Content } = Layout;




class Layoutx extends Component {
  state = {
    collapsed: false
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {


    return (
      <Aux>
        <Layout
          hasSider={this.props.isAuthenticated}
          className={"wrapper"}
        >
          {
            this.props.isAuthenticated ?
              <Sidebar
                collapsed={this.state.collapsed}
                isAuthenticated={this.props.isAuthenticated}
                toggle={() => this.toggle()}
              />
              : null
          }

          <Layout
            className={"container"}
          >
            <Header
              isAuthenticated={this.props.isAuthenticated}
            />

            <Content className={"main-content"}>
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layoutx);