import React from "react";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { signup as signupMutation } from "../api";
import { UserContext, actions } from "../context/user-context";
import { Layout } from "antd";
import { RegistrationForm } from "../components/RegistrationForm";
import { ViewportCenter } from "../components/ViewportCenter";

const { Content } = Layout;

export function Register() {
  const history = useHistory();
  const dispatch = useContext(UserContext)[1];

  const onSignupSuccess = (data) => {
    dispatch({ type: actions.SET_JWT, jwt: data.jwt });
    history.replace("/");
  };

  const [signup, { isLoading, error }] = useMutation(signupMutation, {
    onSuccess: onSignupSuccess,
  });

  const onSubmit = (data) => {
    let payload = {
      email: data.email,
      password: data.password,
    };

    if (data.firstName) {
      payload.firstName = data.firstName;
    }

    if (data.lastName) {
      payload.lastName = data.lastName;
    }

    if (data.mobile) {
      payload.mobile = `${data.prefix}${data.mobile}`;
    }

    signup(payload);
  };

  return (
    <Layout>
      <Content>
        <ViewportCenter>
          <RegistrationForm
            onSubmit={onSubmit}
            errorMessage={error?.message}
            isLoading={isLoading}
          />
        </ViewportCenter>
      </Content>
    </Layout>
  );
}
