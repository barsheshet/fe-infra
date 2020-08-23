/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Fragment } from "react";
import { Menu, Dropdown } from "antd";
import {
  UserOutlined,
  DownOutlined,
  PoweroffOutlined,
  SettingOutlined,
} from "@ant-design/icons";

export const NavBar = (props) => {
  return (
    <Fragment>
      <div
        css={{
          width: 120,
          height: 31,
          background: "white",
          margin: "16px 30px 16px 0",
          float: "left",
        }}
      ></div>

      <Dropdown
        css={{
          float: "right",
        }}
        overlay={
          <Menu>
            <Menu.Item onClick={props.onSettingsClick}>
              <SettingOutlined /> Settings
            </Menu.Item>
            <Menu.Item danger onClick={props.onLogoutClick}>
              <PoweroffOutlined /> Logout
            </Menu.Item>
          </Menu>
        }
      >
        <span css={{ color: "rgba(255, 255, 255, 0.65)", cursor: "pointer" }}>
          <UserOutlined /> {props.fullName} <DownOutlined />
        </span>
      </Dropdown>

      <Menu theme="dark" mode="horizontal">
        {props.modules.map((m, i) => (
          <Menu.Item key={i}>{m}</Menu.Item>
        ))}
      </Menu>
    </Fragment>
  );
};
