import { Typography } from 'antd';
import React from 'react';
import { HeaderWrapper } from './styled';
// import PropTypes from 'prop-types';
import { User } from 'react-feather';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function Header() {
  const [user] = useLocalStorage('user');

  return (
    <HeaderWrapper className="header-wrapper">
      {/* <AlignJustify color="#fff" size={20} /> */}
      <Typography.Title level={5} style={{ margin: 0, color: ' #0C356A' }}>
        {user.username}
      </Typography.Title>
      <User color=" #0C356A" size={20} />
    </HeaderWrapper>
  );
}

// Header.propTypes = {
//   title: PropTypes.string
// };

export default Header;
