import React from 'react';
import { Link } from 'react-router-dom';

const navigatonItem = props => (
  <Link replace to={props.link}>
    {props.children}
  </Link>
);

export default navigatonItem;
