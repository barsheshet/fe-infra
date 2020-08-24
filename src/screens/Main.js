/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useContext, useEffect, useState } from "react";
import { Layout, Menu, Spin, Modal } from "antd";
import * as jwtDecode from "jwt-decode";
import { useMutation } from "react-query";
import { UserContext, actions } from "../context/user-context";
import {
  refreshToken as refreshTokenMutation,
  logout as logoutMutation,
} from "../api";
import { useLocation, useHistory } from "react-router-dom";
import {
  TeamOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { NavBar } from "../components/NavBar";
import { ViewportCenter } from "../components/ViewportCenter";

const { Header, Content, Sider } = Layout;
const { confirm } = Modal;

const getExpiration = (jwt) => {
  const decoded = jwtDecode(jwt);
  return decoded.exp * 1000 - Date.now();
};

export function Main() {
  const [autoRefresh, setAutoRefresh] = useState(null);
  const location = useLocation();
  const history = useHistory();
  const [user, dispatch] = useContext(UserContext);

  const onRefreshTokenSuccess = (data) => {
    dispatch({ type: actions.SET_JWT, jwt: data.jwt });
    setAutoRefresh(null);
    const expiration = getExpiration(data.jwt);
    setAutoRefresh(setTimeout(refreshToken, expiration - 5000));
  };

  const onRefreshTokenError = () => {
    history.push("login", { from: location.pathname });
  };

  const [refreshToken] = useMutation(refreshTokenMutation, {
    onSuccess: onRefreshTokenSuccess,
    onError: onRefreshTokenError,
  });

  const onLogoutSuccess = () => {
    history.push("login");
  };

  const [logout] = useMutation(logoutMutation, {
    onSuccess: onLogoutSuccess,
  });

  const showLogoutDialog = () => {
    confirm({
      title: "Do you want to log out all devices?",
      icon: <ExclamationCircleOutlined />,
      okText: "All devices",
      okButtonProps: {
        type: "default",
      },
      cancelText: "Only this device",
      onOk() {
        logout({ jwt: user.jwt, allDevices: true });
      },
      onCancel() {
        logout({ jwt: user.jwt, allDevices: false });
      },
    });
  };

  useEffect(() => {
    if (!user.jwt) {
      refreshToken();
    } else {
      const expiration = getExpiration(user.jwt);

      if (expiration < 0) {
        refreshToken();
      }
      if (!autoRefresh) {
        setAutoRefresh(setTimeout(refreshToken, expiration - 5000));
      }
    }
    return () => setAutoRefresh(clearTimeout(autoRefresh));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user.jwt)
    return (
      <ViewportCenter>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
      </ViewportCenter>
    );

  return (
    <Layout>
      <Header css={{ position: "fixed", zIndex: 1, width: "100%" }}>
        <NavBar
          fullName={"User Name"}
          modules={["Admin", "Foo", "Bar"]}
          onSettingsClick={() => console.log("settings clicked!")}
          onLogoutClick={showLogoutDialog}
        />
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
            <Menu.Item key="1" icon={<TeamOutlined />}>
              Users
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
}
