import { colors } from '../../utils/theme';
import { Layout, Spin, Menu, Input, Button, Flex } from 'antd';
const { Header, Content, Sider } = Layout;
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './styled';
import { isMobile } from 'react-device-detect';
import { MenuOutlined } from '@ant-design/icons';
import useMainLayout from './useMainLayout';
import UserDropdown from './UserDropdown';
import { IoNotificationsSharp, IoExpand, IoSearch } from 'react-icons/io5';

const VNPT_SIDEBAR_LOGO =
  'https://iocrealty.com/wp-content/uploads/images/phan-tich-cac-yeu-to-thiet-ke-trong-logo-vnpt-0.png';

export default function MainLayout() {
  const {
    user,
    profiles,
    isLoading,
    isOpenSideBar,
    menuItems,
    selectedKeys,
    toggleSideBar,
    handleLogout,
    handleMenuClick,
    handleOpenFullScreen
  } = useMainLayout();

  return (
    <LayoutWrapper style={{ height: '100vh', overflow: 'hidden' }}>
      <Spin spinning={isLoading} fullscreen />

      <Sider
        width={250}
        style={{
          background: colors.white,
          height: '100vh',
          overflow: 'auto',
          borderRight: '1px solid #f0f0f0'
        }}
        className="shadown-sm"
      >
        <div className="flex justify-center items-center min-h-14">
          <img src={VNPT_SIDEBAR_LOGO} alt="" width="140px" />
        </div>
        {user && profiles && isOpenSideBar && (
          <Menu
            mode="inline"
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={handleMenuClick}
            style={{
              background: 'transparent',
              borderInlineEnd: 'none'
            }}
          />
        )}
      </Sider>
      <Layout>
        <Header
          style={{
            display: 'flex',
            background: colors.white,
            padding: '10px 20px',
            height: 60,
            justifyContent: 'space-between',
            borderBottom: '1px solid #f0f0f0'
          }}
        >
          <div
            className="demo-logo text-center"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
          ></div>
          {isMobile && <MenuOutlined style={{ fontSize: 22, color: colors.primary }} onClick={toggleSideBar} />}
          <div className="flex align-center gap-3">
            <Flex align="center" gap={2} style={{ minWidth: 300 }}>
              <Input
                placeholder="Tìm kiếm dự án"
                prefix={<IoSearch color="var(--color-gray-400)" style={{ marginRight: 4 }} size={16} />}
                style={{ width: '100%', height: 36 }}
                suffix={
                  <Button
                    type="default"
                    size="small"
                    onClick={() => {}}
                    style={{ fontWeight: 600, fontSize: 12 }}
                    disabled
                  >
                    &#8984; K
                  </Button>
                }
                onPressEnter={() => {}}
              />
            </Flex>
            <div
              className={[
                'hidden md:flex items-center p-2 justify-center',
                ' hover:bg-blue-500/20 rounded-full cursor-pointer aspect-square',
                'transition-full duration-200'
              ].join(' ')}
              onClick={handleOpenFullScreen}
            >
              <IoExpand size={22} color={colors.primary} />
            </div>
            <div
              className={[
                'hidden md:flex items-center p-2 justify-center',
                ' hover:bg-blue-500/20 rounded-full cursor-pointer aspect-square',
                'transition-full duration-200'
              ].join(' ')}
            >
              <IoNotificationsSharp size={22} color={colors.primary} />
            </div>
            <UserDropdown user={user} profiles={profiles} onLogout={handleLogout} />
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            height: 'calc(100vh - 60px)',
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </LayoutWrapper>
  );
}
