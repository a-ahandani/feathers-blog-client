import React, { Component } from 'react';
import axios from '../../../axios';

class PostDetails extends Component {
  state = {
    loadedProduct: null
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    if (this.props.match.params.id) {
      axios.get('/posts/' + this.props.match.params.id).then(response => {
        this.setState({ loadedProduct: response.data });
      });
    }
  }

  render() {
    return <div>yoooooooooo this is Product {this.props.match.params.id}</div>;
  }
}

export default PostDetails;
