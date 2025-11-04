import React, { useState, useEffect } from 'react';
import { Typography } from 'antd';
import { colors } from '../../utils/theme';
import { MenuItemWrapper } from './styled';
import { useLocation, useNavigate } from 'react-router-dom';

function MenuItem({ title, icon, path }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (location.pathname.split('/').length > 2) setIsActive(location.pathname === `/${path}`);
    else setIsActive(location.pathname.split('/')[1] === path);
  }, []);

  // const currentPath = useCurrentPath();
  return (
    <MenuItemWrapper
      isactive={isActive}
      onClick={() => {
        if (isActive) window.location.reload();
        navigate(`/${path}`);
      }}
    >
      {isActive && <div className="top-dot"></div>}
      {icon && <span className="icon-wrap">{icon}</span>}
      <Typography.Text strong style={{ color: isActive ? colors.primary : 'white', fontSize: 16 }}>
        {title}
      </Typography.Text>
      {isActive && <div className="bottom-dot"></div>}
    </MenuItemWrapper>
  );
}

export default MenuItem;
