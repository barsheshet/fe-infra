/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export const LoginForm = (props) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

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
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your Username!",
          },
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
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
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a css={{ float: "right" }} href="/">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button css={{ width: "100%" }} type="primary" htmlType="submit">
          Log in
        </Button>
        Or <a href="/">register now!</a>
      </Form.Item>
    </Form>
  );
};
