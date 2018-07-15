import React from "react";
import { Col} from "antd";

const post = props => (
    <Col span={24} className={"post"} onClick={props.clicked}>
      <div>
        <h2>{props.title}</h2>
        <p>{props.date}</p>
        <span>{props.user}</span>
      </div>
    </Col>
);

export default post;
