import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Posts from './Posts/Posts';
import PostDetails from './PostDetails/PostDetails';

class Blog extends Component {

  render() {

    return (

      <div>
        <Route path={'/blog'} exact component={Posts} />
        <Switch>
          <Route path={'/posts/:id'} exact component={PostDetails} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
