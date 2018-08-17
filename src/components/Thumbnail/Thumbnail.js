import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import FileManager from '../FileManager/FileManager';
const { Meta } = Card;

export class Thumbnail extends Component {
  state = {
    showFileManager: false
  };
  clickHandler = e => {
    this.setState({ showFileManager: !this.state.showFileManager });
    this.props.onSetLock(
      this.props.nameSpace,
      this.props.serviceName,
      !this.state.showFileManager
    );
  };
  onSelectItem = item => {
    const image = item.src;
    this.props.onChange(image);
  };
  render() {
    let src = 'http://localhost:3030/';
    src = this.props.value ? src + this.props.value : null;
    const image = src ? (
      <img alt="example" src={src} />
    ) : (
      <Icon
        style={{ marginTop: 50, fontSize: 36, color: '#ccc' }}
        type="picture"
      />
    );

    return (
      <div>
        <FileManager
          value={this.props.value}
          onSelectItem={this.onSelectItem}
          clickHandler={this.clickHandler}
          show={this.state.showFileManager}
        />
        <Card
          hoverable
          onClick={this.clickHandler}
          loading={false}
          style={{ width: 240 }}
          cover={image}
        >
          <Meta description={src} />
        </Card>
      </div>
    );
  }
}

export default Thumbnail;
