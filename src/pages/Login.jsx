import { FacebookLoginButton, GoogleLoginButton } from 'react-social-login-buttons';
import { Typography } from 'antd';
import { StyledRow, StyledCol, StyledSpace } from '../components/StyledComponents';
const { Title } = Typography;

function Login() {
  return (
    <>
      <StyledSpace width="100%" padingTop="10%" direction="vertical" size={[0, 12]}>
        <StyledRow align="middle">
          <StyledCol span={8} offset={8}>
            <Title style={{ textAlign: 'center' }} level={2}>
              {`Let's store your Files!`}
            </Title>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol span={8} offset={8}>
            <a onClick={() => window.open('http://localhost:3000/api/auth/facebook', '_self')}>
              <FacebookLoginButton align="center" />
            </a>
          </StyledCol>
        </StyledRow>
        <StyledRow>
          <StyledCol span={8} offset={8}>
            <a onClick={() => window.open('http://localhost:3000/api/auth/google', '_self')}>
              <GoogleLoginButton align="center" />
            </a>
          </StyledCol>
        </StyledRow>
      </StyledSpace>
    </>
  );
}

export default Login;
