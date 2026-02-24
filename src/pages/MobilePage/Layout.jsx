import React, { useLayoutEffect } from 'react';
import { Flex } from 'antd';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { IoFileTrayFull, IoSettings } from 'react-icons/io5';

const activeColor = '#26408c';
const unActiveColor = '#ccc';

function MobilePageLayout() {
  const location = useLocation();
  const pathname = location.pathname.replace('/mobile', '');

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex
      vertical={true}
      justify="space-between"
      style={{ minHeight: '100vh', background: '#f0f0f080', display: 'flex', flexDirection: 'column' }}
    >
      {/* <div>Header</div> */}
      <Outlet />
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background: '#fff',
          borderTop: '1px solid #eee',
          zIndex: 100,
          /* Dành cho iPhone có tai thỏ */
          paddinBottom: `env(safe-area-inset-bottom)`
        }}
      >
        <Flex align="center" justify="space-evenly" style={{ padding: '10px 18px 8px 18px' }} gap={16}>
          <Link to="/mobile" style={{ textDecoration: 'none' }}>
            <Flex className="icon-button" align="center" justify="center" vertical>
              <IoFileTrayFull color={pathname === '' || pathname === '/' ? activeColor : unActiveColor} size={22} />
              <div
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: pathname === '' || pathname === '/' ? activeColor : unActiveColor
                }}
              >
                Công việc
              </div>
            </Flex>
          </Link>
          {/* <Flex className="icon-button" align="center" justify="center" vertical>
            <IoFileTrayFull color={unActiveColor} size={22} />
            <div style={{fontSize: 10, marginTop: 4}}>Công việc</div>
          </Flex>
          <Flex className="icon-button"align="center" justify="center" vertical>
            <IoFileTrayFull color={unActiveColor} size={22} />
            <div style={{fontSize: 10, marginTop: 4}}>Công việc</div>
          </Flex> */}
          <Link to="/mobile/settings" style={{ textDecoration: 'none' }}>
            <Flex className="icon-button" align="center" justify="center" vertical>
              <IoSettings color={pathname.includes('/settings') ? activeColor : unActiveColor} size={22} />
              <div
                style={{
                  fontSize: 12,
                  marginTop: 4,
                  color: pathname.includes('/settings') ? activeColor : unActiveColor
                }}
              >
                Cài đặt
              </div>
            </Flex>
          </Link>
        </Flex>
      </div>
    </Flex>
  );
}

export default MobilePageLayout;
