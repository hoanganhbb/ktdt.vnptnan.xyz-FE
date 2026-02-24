import { useOutlet, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../hooks/useAuth';
import { useEffect, useState } from 'react';
import requestAPI from '../../utils/requestAPI';
import { useMediaQuery } from 'react-responsive';

const HomeLayout = () => {
  const outlet = useOutlet();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState([]);
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' });

  useEffect(() => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`)])
      .then(res => {
        const rolegroup = res[0].data?.rolegroup || [];
        if (isTabletOrMobile) return navigate('/mobile');
        if (rolegroup.includes('adminstrator')) return navigate('/congviec');
        if (rolegroup.includes('trungtamvienthong')) return navigate('/baocao/cntt-dia-ban');
        if (rolegroup.includes('chuyen_vien_ktdt')) return navigate('/congviec-ktdt');
        if (rolegroup.includes('manager_ttcntt')) return navigate('/duancntt');
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  }, []);

  return <div>{!isLoading && outlet}</div>;
};

export default HomeLayout;
