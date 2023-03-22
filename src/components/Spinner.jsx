import { Spin } from 'antd';
import { StyledSpinner } from './StyledComponents';
function Spinner() {
  return (
    <StyledSpinner>
      <Spin size="large" />
    </StyledSpinner>
  );
}
export default Spinner;
