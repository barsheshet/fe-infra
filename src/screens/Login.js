/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { login as loginMutation } from "../api";
import { LoginForm } from "../components/LoginForm";

export const Login = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [login, { isLoading, data, error }] = useMutation(loginMutation);

  const onFinish = (creds) => {
    login(creds);
  };

  if (data) return JSON.stringify(data);

  return (
    <LoginForm
      onSubmit={onFinish}
      errorMessage={error?.message}
      isLoading={isLoading}
      onRegisterClick={() => true}
      onForgotClick={() => true}
    />
  );
};
