import styled from 'styled-components';
import { Row, Col, Space, Button } from 'antd';
export const StyledSpinner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .ant-spin {
    color: #fff;
  }
`;
export const FileDisplay = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  z-index: 10;
  width: 100%;
  height: 100%;
`;

export const ObjectDisplay = styled.object`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 80%;
`;
export const StyledRow = styled(Row)`
  margin-bottom: ${(props) => props.marginBottom || '2%'};
`;
export const StyledCol = styled(Col)`
  text-align: ${(props) => props.textAlign};
  cursor: ${(props) => props.cursor};
`;
export const StyledSpace = styled(Space)`
  padding-top: ${(props) => props.padingTop};
  width: ${(props) => props.width};
  padding: ${(props) => props.padding};
`;
export const StyledButton = styled(Button)`
  text-align: center;
`;
