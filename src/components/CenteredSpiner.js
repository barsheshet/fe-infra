import React from "react";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { ViewportCenter } from "./ViewportCenter";

export const CenteredSpiner = () => (
  <ViewportCenter>
    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
  </ViewportCenter>
);
