import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import classes from './Admin.scss';
import Posts from './Posts/Posts';
import Users from './Users/Users';
import PostEdit from './Posts/PostEdit';

class Admin extends Component {
  render() {
    return (
      <div className={'admin-container'}>
        <Route path={'/admin/posts'} exact component={Posts} />
        <Route path={'/admin/users'} exact component={Users} />
        <Route path={'/admin/posts/edit/:id'} strict component={PostEdit} />
        <Route path={'/admin/posts/write'} strict component={PostEdit} />
      </div>
    );
  }
}

export default Admin;
