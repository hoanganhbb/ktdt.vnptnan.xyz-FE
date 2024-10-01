import React, { useEffect, useState } from 'react';
import { colors } from '../../utils/theme';
import { Layout, Dropdown, Button, Spin, Flex } from 'antd';
const { Header, Content, Sider } = Layout;
import MenuItem from './MenuItem';
import { ListTask, PencilSquare, PersonFill } from 'react-bootstrap-icons';
import { LayoutWrapper } from './styled';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { Menu } from 'react-feather';
import { IoFileTrayStacked } from 'react-icons/io5';
import { FaChartLine } from 'react-icons/fa6';
import requestAPI from '../../utils/requestAPI';

// if (isMobile) alert('Vui lòng xoay ngàng điện thoại để sử dụng')

export default function MainLayout({ children }) {
  const [user] = useLocalStorage('user');
  const navigate = useNavigate();
  const [isOpenSideBar, setIsOpenSideBar] = useState(isMobile ? false : true);
  const [roleGroup, setRoleGroup] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [PROFILES, SET_PROFILES] = useState();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`)])
      .then(res => {
        const rolegroup = res[0].data?.rolegroup || [];
        setRoleGroup(rolegroup);
        SET_PROFILES(res[0].data);
        // if (rolegroup.includes('chuyen_vien_ktdt')) return navigate('/congviec')
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  }, []);

  return (
    <LayoutWrapper>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          background: colors.primary,
          padding: '0 20px'
        }}
      >
        <div
          className="demo-logo"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: 20 }}
        >
          <img src="https://vnpt.com.vn/design/images/logo-mb.png" alt="" width="140px" />
        </div>
        {isMobile && <Menu size={22} color="white" onClick={() => setIsOpenSideBar(!isOpenSideBar)}></Menu>}
        <div className="user-infomation">
          <Flex vertical justify="center" style={{ marginRight: 10 }}>
            <div style={{ color: 'white', fontSize: 16, fontWeight: 600, marginBottom: 3, lineHeight: 1 }}>
              {PROFILES?.users.find(e => e.username === user?.username)?.name}
            </div>
            <div
              style={{
                color: colors.whiteAlpha[500],
                fontSize: 14,
                fontWeight: 400,
                lineHeight: 1,
                textAlign: 'right'
              }}
            >
              {user?.username}
            </div>
          </Flex>
          <Dropdown
            dropdownRender={() => (
              <div
                style={{
                  padding: 10,
                  minWidth: 200,
                  background: 'white',
                  borderRadius: 6,
                  boxShadow: '0px 3px 5px 5px rgba(100, 100, 100, 0.1)',
                  textAlign: 'right'
                }}
              >
                <Button
                  type="primary"
                  block
                  style={{ width: '100%' }}
                  onClick={() => {
                    navigate('/');
                    localStorage.clear();
                  }}
                >
                  Đăng xuất!
                </Button>
              </div>
            )}
            placement="bottomRight"
          >
            <div className="cirle-box">
              <PersonFill size={26}></PersonFill>
            </div>
          </Dropdown>
        </div>
      </Header>
      <Layout>
        <Spin spinning={isLoading} fullscreen></Spin>
        {user && PROFILES && (
          <Sider
            width={!isOpenSideBar ? 0 : 280}
            style={{
              background: colors.primary,
              paddingLeft: 10,
              paddingTop: 20,
              minHeight: '100%'
            }}
          >
            {(roleGroup?.includes('adminstrator') || roleGroup?.includes('chuyen_vien_ktdt')) && (
              <MenuItem title="Công việc KTĐT" icon={<ListTask size={24}></ListTask>} path="congviec-ktdt"></MenuItem>
            )}
            {roleGroup?.includes('adminstrator') && (
              <MenuItem title="Quản lý công việc" icon={<ListTask size={24}></ListTask>} path="congviec"></MenuItem>
            )}
            {(roleGroup?.includes('adminstrator') || roleGroup?.includes('trungtamvienthong')) && (
              <MenuItem
                title="Báo cáo CNTT địa bàn"
                icon={<FaChartLine size={22}></FaChartLine>}
                path="baocao/cntt-dia-ban"
              ></MenuItem>
            )}
            {PROFILES?.permission?.includes('du_an_cap_tinh') && (
              <MenuItem
                title="Dự án CNTT cấp tỉnh"
                icon={<PencilSquare size={22}></PencilSquare>}
                path="duancntt"
              ></MenuItem>
            )}
            {PROFILES?.permission?.includes('du_an_cap_huyen') && (
              <MenuItem
                title="Dự án CNTT huyện"
                icon={<IoFileTrayStacked size={22}></IoFileTrayStacked>}
                path="duancaphuyen"
              ></MenuItem>
            )}
            {roleGroup?.includes('adminstrator') &&
              ['phanducanh.nan', 'nttung.nan', 'tulc.nan'].includes(user.username) && (
                <MenuItem
                  title="Báo cáo dự án hết hạn"
                  icon={<FaChartLine size={22}></FaChartLine>}
                  path="report"
                ></MenuItem>
              )}
            {roleGroup?.includes('adminstrator') &&
              ['phanducanh.nan', 'nttung.nan', 'tulc.nan', 'tonnhat.vtna'].includes(user.username) && (
                <MenuItem
                  title="Báo cáo doanh thu CNTT"
                  icon={<FaChartLine size={22}></FaChartLine>}
                  path="baocao/doanhthu"
                ></MenuItem>
              )}
          </Sider>
        )}
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 'calc(100vh - 88px)'
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </LayoutWrapper>
  );
}
