/** @jsx jsx */
import { jsx } from "@emotion/core";
import { useMutation } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../api";

export const LoginForm = () => {
  let history = useHistory();
  let location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const [mutate, { isLoading, data, error }] = useMutation(login);

  const onFinish = (values) => {
    mutate(values);
  };

  if (data) return JSON.stringify(data);

  return (
    <Form
      name="normal_login"
      css={{
        maxWidth: "300px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input prefix={<MailOutlined />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your Password!",
          },
        ]}
      >
        <Input
          prefix={<LockOutlined />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        {error.message} {error.code}
      </Form.Item>
      <Form.Item>
        <Button
          css={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Log in
        </Button>
        Or <a href="/">register now!</a>
      </Form.Item>
      <Form.Item>
        <a css={{ float: "right" }} href="/">
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
};
