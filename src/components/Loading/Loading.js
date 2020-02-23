import React from "react";

import './Loading.scss';

const Loading = ({size}) => (
  <div className="loading" style={{ height: size, width: size }}>
    <div className="spinner" />
  </div>
);
export default Loading;
