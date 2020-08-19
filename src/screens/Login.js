import React from "react";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { Layout } from "antd";
import { login as loginMutation } from "../api";
import { UserContext, actions } from "../context/user-context";
import { LoginForm } from "../components/LoginForm";
import { ViewportCenter } from "../components/ViewportCenter";

const { Content } = Layout;

export function Login() {
  const [step, setStep] = useState(1);
  const history = useHistory();
  const location = useLocation();
  const redirect = location.state?.from || "/";
  const dispatch = useContext(UserContext)[1];

  const onLoginSuccess = (data) => {
    if (data?.jwt) {
      dispatch({ type: actions.SET_JWT, jwt: data.jwt });
      history.replace(redirect);
    } else {
      setStep(2);
    }
  };

  const [login, { isLoading, error }] = useMutation(loginMutation, {
    onSuccess: onLoginSuccess,
  });

  const onRegisterClick = () => history.push("register");

  return (
    <Layout>
      <Content>
        <ViewportCenter>
          <LoginForm
            step={step}
            onSubmit={login}
            errorMessage={error?.message}
            isLoading={isLoading}
            onRegisterClick={onRegisterClick}
            onForgotClick={() => true}
          />
        </ViewportCenter>
      </Content>
    </Layout>
  );
}
