/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Form, Input, Select, Checkbox, Button, Card, Alert } from "antd";
import * as owaspPasswordStrengthTest from "owasp-password-strength-test";
import CountryCodes from "../metadata/CountryCodes.json";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export const RegistrationForm = (props) => {
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        placeholder="Choose"
        style={{
          width: 120,
        }}
        options={CountryCodes.map((c, i) => ({
          key: i,
          value: c.dial_code,
          label: `${c.flag} (${c.dial_code})`,
          name: c.name,
        }))}
        showSearch
        optionFilterProp="name"
      ></Select>
    </Form.Item>
  );

  return (
    <Card css={{ width: 500 }} title={"Register"}>
      <Form
        {...formItemLayout}
        name="register"
        onFinish={props.onSubmit}
        scrollToFirstError
        validateTrigger="onSubmit"
      >
        <Form.Item
          name="email"
          label="Email"
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
          <Input />
        </Form.Item>

        <Form.Item name="firstName" label="First Name">
          <Input />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name">
          <Input />
        </Form.Item>

        <Form.Item name="mobile" label="Mobile">
          <Input
            addonBefore={prefixSelector}
            style={{
              width: "100%",
            }}
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: (_, value) => {
                if (value) {
                  const strength = owaspPasswordStrengthTest.test(value);
                  if (!strength.strong) {
                    return Promise.reject(strength.errors[0]);
                  }
                }
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  "The two passwords that you entered do not match!"
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject("Should accept agreement"),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            I have read the <a href="/">agreement</a>
          </Checkbox>
        </Form.Item>
        {props.errorMessage && (
          <Form.Item {...tailFormItemLayout}>
            <Alert message={props.errorMessage} type="error" showIcon />
          </Form.Item>
        )}
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" loading={props.isLoading}>
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
