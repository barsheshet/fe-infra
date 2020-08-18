/** @jsx jsx */
import { jsx } from "@emotion/core";
import { Row, Col, Layout } from "antd";
import { RegistrationForm } from "../components/RegistrationForm";

const { Content } = Layout;

export const Register = () => {
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
            <RegistrationForm />
          </Col>
          <Col span={9} />
        </Row>
      </Content>
    </Layout>
  );
};
