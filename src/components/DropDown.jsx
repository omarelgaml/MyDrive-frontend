import React from 'react';
import { useSelector } from 'react-redux';
import { DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { StyledSpace, StyledButton } from './StyledComponents';
import { Dropdown, Progress, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
const { Text } = Typography;

function DropDown() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const storagePercent = Math.round((user.usedStorage / user.totalStorage) * 100);

  const handleMenuClick = (e) => {
    if (e.key == 2) window.open('http://localhost:3000/api/auth/logout', '_self');
    if (e.key == 1) navigate('subscribe');
  };

  const items = [
    {
      label: 'Subscribe',
      key: '1'
    },
    {
      label: 'Logout',
      key: '2',
      icon: <LogoutOutlined />
    },
    {
      type: 'divider'
    },
    {
      label: (
        <>
          <Text>Storage Usage</Text>
          <Progress
            status={`${storagePercent == 100 ? 'exception' : 'active'}`}
            percent={storagePercent}
          />
          <p>
            {Number(user.usedStorage).toFixed(2)} of {user.totalStorage} used
          </p>
        </>
      ),
      key: '3',
      disabled: true
    }
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick
  };
  return (
    <Dropdown menu={menuProps}>
      <StyledButton>
        <StyledSpace>
          {user.displayName}
          <DownOutlined />
        </StyledSpace>
      </StyledButton>
    </Dropdown>
  );
}
export default React.memo(DropDown);
