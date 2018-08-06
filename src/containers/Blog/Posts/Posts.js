import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row } from 'antd';

import { Link } from 'react-router-dom';

import notificationHandler from '../../../hoc/NotificationHandler/NotificationHandler';
import Aux from '../../../hoc/Helper/Helper';
import Post from '../../../components/Post/Post';

import * as actions from './store/actions/index';
import { appService } from '../../../feathers';

class Posts extends Component {
  state = {};

  componentDidMount() {
    this.props.onGetPosts();
    const postService = appService.service('posts');
    postService.on('created', post => {
      //  console.log("Someone created a post", post);
      this.props.onSetNewPosts(post);
    });
  }

  componentWillMount() {}

  postSelectedHandler = id => {
    this.props.history.push('/blog/' + id);
  };

  render() {
    let posts = <p> Err</p>;
    if (!this.props.error && this.props.posts) {
      posts = this.props.posts.map((value, index) => {
        return (
          <Post
            key={value.id}
            title={value.title}
            date={value.createdAt}
            user={value.userId}
            clicked={() => this.postSelectedHandler(value.id)}
          />
        );
      });
    }
    return (
      <Aux>
        <Row gutter={8}>{posts}</Row>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    posts: state.blog.posts,
    error: state.blog.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetPosts: () => dispatch(actions.initPosts()),
    onSetNewPosts: post => dispatch(actions.setNewPosts(post))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(notificationHandler(Posts));
