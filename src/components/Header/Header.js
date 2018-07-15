import React from 'react';

import Logo from './Logo/Logo';
import Navigation from '../Navigation/NavigationItems';
import classes from './Header.scss'

import { Layout } from 'antd';
const { Header } = Layout;

const navItems = [
  {
    title: "Home",
    icon: "home",
    link: "/",
    show: "always"
  },
  {
    title: "Blog",
    icon: "file-text",
    link: "/blog",
    show: "always"
  },
  {
    title: "Authenticate",
    icon: "user",
    link: "/auth",
    show: "not-authenticated"
  },
  {
    title: "Admin",
    icon: "solution",
    link: "/admin",
    show: "authenticated"
  },
  {
    title: "Logout!",
    icon: "user",
    link: "/logout",
    show: "authenticated"
  }
];

const header = props => (

  <Header className={"main-header"}>
    <Navigation
      navData={navItems}
      isAuthenticated={props.isAuthenticated}
      navMode='horizontal'
      navTheme="light"

    />

  </Header>
);

export default header;
