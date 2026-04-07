import { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import { isMobile } from 'react-device-detect';
import requestAPI from '../../utils/requestAPI';
import { IoFolderOpenOutline, IoCalendarOutline } from 'react-icons/io5';

export default function useMainLayout() {
  const user = useAuthStore(state => state.user);
  const clearAll = useAuthStore(state => state.clearAll);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpenSideBar, setIsOpenSideBar] = useState(!isMobile);
  const [roleGroup, setRoleGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    setIsLoading(true);
    Promise.all([requestAPI.get('api/profile/')])
      .then(res => {
        const rolegroup = res[0].data?.rolegroup || [];
        setRoleGroup(rolegroup);
        setProfiles(res[0].data);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  }, []);

  const menuItems = useMemo(() => {
    if (!profiles) return [];

    const items = [];

    const projectsInfomationMenusGroup = {
      type: 'group', // Must have
      label: 'Dự án Công nghệ thông tin',
      children: []
    };

    if (roleGroup?.includes('adminstrator')) {
      items.push({
        type: 'group', // Must have
        label: 'Quản lý công việc',
        children: [
          {
            key: '/congviec',
            icon: <IoCalendarOutline size={26} />,
            label: 'Công việc lãnh đạo VTT'
          }
        ]
      });
    }

    if (profiles?.permission?.includes('du_an_cap_tinh')) {
      projectsInfomationMenusGroup.children.push({
        key: '/duancntt',
        icon: <IoFolderOpenOutline size={24} />,
        label: 'Dự án cấp tỉnh'
      });
    }

    if (profiles?.permission?.includes('du_an_cap_huyen')) {
      projectsInfomationMenusGroup.children.push({
        key: '/duancapxa',
        icon: <IoFolderOpenOutline size={24} />,
        label: 'Dự án cấp xã'
      });
    }

    items.push(projectsInfomationMenusGroup);

    return items;
  }, [roleGroup, profiles]);

  const selectedKeys = useMemo(() => {
    const path = location.pathname;
    const firstSegment = '/' + path.split('/').filter(Boolean)[0];
    return [firstSegment];
  }, [location.pathname]);

  const toggleSideBar = () => setIsOpenSideBar(prev => !prev);

  const handleLogout = () => {
    clearAll();
    navigate('/login');
  };

  const handleMenuClick = ({ key }) => navigate(key);

  const handleOpenFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  };

  return {
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
  };
}
