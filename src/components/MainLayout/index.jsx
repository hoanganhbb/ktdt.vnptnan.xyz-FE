import { colors } from '../../utils/theme';
import { Layout, Spin, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from './styled';
import { isMobile } from 'react-device-detect';
import { MenuOutlined } from '@ant-design/icons';
import useMainLayout from './useMainLayout';
import UserDropdown from './UserDropdown';
import { IoNotificationsSharp, IoExpand } from 'react-icons/io5';

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
    <LayoutWrapper>
      <Spin spinning={isLoading} fullscreen />

      <Sider
        width={280}
        style={{
          background: colors.white,
          minHeight: '100%',
          overflow: 'auto',
          borderRight: '1px solid #f0f0f0'
        }}
        className="shadown-sm"
      >
        <div className="flex justify-center items-center">
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
            background: colors.primary,
            padding: '10px 20px',
            height: 60,
            justifyContent: 'space-between'
          }}
        >
          <div
            className="demo-logo text-center"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
          ></div>
          {isMobile && <MenuOutlined style={{ fontSize: 22, color: 'white' }} onClick={toggleSideBar} />}
          <div className="flex align-center gap-2">
            <div
              className={[
                'hidden md:flex items-center p-2 justify-center',
                ' hover:bg-white/20 rounded-full cursor-pointer aspect-square',
                'transition-full duration-200'
              ].join(' ')}
              onClick={handleOpenFullScreen}
            >
              <IoExpand size={22} style={{ color: 'white' }} />
            </div>
            <div
              className={[
                'hidden md:flex items-center p-2 justify-center',
                ' hover:bg-white/20 rounded-full cursor-pointer aspect-square',
                'transition-full duration-200'
              ].join(' ')}
            >
              <IoNotificationsSharp size={22} style={{ color: 'white' }} />
            </div>
            <UserDropdown user={user} profiles={profiles} onLogout={handleLogout} />
          </div>
        </Header>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 'calc(100vh - 60px)'
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </LayoutWrapper>
  );
}
