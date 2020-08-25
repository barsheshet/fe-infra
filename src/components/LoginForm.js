/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Input, Button, Card, Alert, Typography } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

const { Link } = Typography;

export const LoginForm = (props) => {
  return (
    <Card css={{ minWidth: 350 }} title={"Login"}>
      <Form
        name="normal_login"
        css={{
          width: "100%",
        }}
        onFinish={props.onSubmit}
        validateTrigger="onSubmit"
      >
        <Form.Item
          name="email"
          hidden={props.step === 2}
          rules={[
            {
              type: "email",
              message: "The input is not valid Email!",
            },
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            name="email"
            type="text"
            prefix={<MailOutlined />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          hidden={props.step === 2}
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            name="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="verificationCode"
          hidden={props.step === 1}
          rules={[
            {
              required: props.step === 2,
              message: "Please input verification code!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="text"
            placeholder="Verification Code"
          />
        </Form.Item>

        {props.errorMessage && (
          <Form.Item>
            <Alert message={props.errorMessage} type="error" showIcon />
          </Form.Item>
        )}

        <Form.Item>
          <Button
            css={{ width: "100%" }}
            type="primary"
            htmlType="submit"
            loading={props.isLoading}
          >
            Log in
          </Button>
          Or <Link onClick={props.onRegisterClick}>register now!</Link>
          <Link css={{ float: "right" }} onClick={props.onForgotClick}>
            Forgot password
          </Link>
        </Form.Item>
      </Form>
    </Card>
  );
};
