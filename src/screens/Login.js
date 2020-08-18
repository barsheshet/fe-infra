/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Layout } from "antd";
import { login as loginMutation } from "../api";
import { UserContext, actions } from "../context/user-context";
import { LoginForm } from "../components/LoginForm";

const { Content } = Layout;

export const Login = () => {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const state = location.state || { from: "/" };

  const onLoginSuccess = (data) => {
    if (data?.jwt) {
      dispatch({ type: actions.SET_JWT, jwt: data.jwt });
      history.replace(state.from);
    } else {
      setStep(2);
    }
  };

  const dispatch = useContext(UserContext)[1];
  const [login, { isLoading, error }] = useMutation(loginMutation, {
    onSuccess: onLoginSuccess,
  });

  const onRegisterClick = () => history.push("register");

  return (
    <Layout
      css={{
        minHeight: "100vh",
        paddingTop: "60px",
      }}
    >
      <Content>
        <Row>
          <Col span={9} />
          <Col span={6}>
            <LoginForm
              step={step}
              onSubmit={login}
              errorMessage={error?.message}
              isLoading={isLoading}
              onRegisterClick={onRegisterClick}
              onForgotClick={() => true}
            />
          </Col>
          <Col span={9} />
        </Row>
      </Content>
    </Layout>
  );
};
