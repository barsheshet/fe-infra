/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Layout, Menu } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Header, Content, Sider } = Layout;

export const AppLayout = () => {
  return (
    <Layout>
      <Header css={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <div
          css={{
            width: 120,
            height: 31,
            background: "white",
            margin: "16px 30px 16px 0",
            float: "left",
          }}
        />
        <Menu theme="dark" mode="horizontal">
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider
          css={{
            marginTop: 64,
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              nav 1
            </Menu.Item>
          </Menu>
        </Sider>
        <Content
          css={{
            marginLeft: 200,
            marginTop: 64,
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};
