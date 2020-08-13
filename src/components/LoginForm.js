/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

export const LoginForm = (props) => {
  return (
    <Form
      name="normal_login"
      css={{
        maxWidth: "300px",
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={props.onSubmit}
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
      <Form.Item>{props.errorMessage}</Form.Item>
      <Form.Item>
        <Button
          css={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={props.isLoading}
        >
          Log in
        </Button>
        Or{" "}
        <a href="/" onClick={props.onRegisterClick}>
          register now!
        </a>
      </Form.Item>
      <Form.Item>
        <a css={{ float: "right" }} href="/" onClick={props.onForgotClick}>
          Forgot password
        </a>
      </Form.Item>
    </Form>
  );
};
