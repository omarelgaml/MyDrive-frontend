import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Col, Row, Typography, Space } from 'antd';
const { Title } = Typography;

function Login() {
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: '100%',
          paddingTop: '10%'
        }}
        size={[0, 12]}>
        <Row align="middle">
          <Col span={8} offset={8}>
            <Title style={{ textAlign: 'center' }} level={2}>
              {`Let's store your Files!`}
            </Title>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <a onClick={() => window.open('http://localhost:3000/api/auth/facebook', '_self')}>
              <FacebookLoginButton align="center" />
            </a>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={8}>
            <a onClick={() => window.open('http://localhost:3000/api/auth/google', '_self')}>
              <GoogleLoginButton align="center" />
            </a>
          </Col>
        </Row>
      </Space>
    </>
  );
}

export default Login;
