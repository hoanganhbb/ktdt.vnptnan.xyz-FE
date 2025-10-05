import React, { useState, useLayoutEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdHome, MdSettings, MdAccountCircle, MdInfo, MdCalendarMonth } from 'react-icons/md';
import { Flex, Spin } from 'antd';
import { IoChatboxEllipses, IoReloadOutline, IoSearchOutline, IoTime } from 'react-icons/io5';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';
import moment from 'moment';
import { HomeWrapper } from './styled';
import dayjs from 'dayjs';
import { useAuth } from '../../hooks/useAuth';
// import LoadCongViec from './LoadCongViec';

const checkIsDealine = data => {
  const deadline = moment(data.ngay_het_han).diff(moment(new Date()), 'days');
  const isQuaHan = deadline + 1 === 0 || deadline + 1 < 0;
  return {
    deadline: deadline + 1,
    quahan: isQuaHan,
    isComplete: data.status
  };
};

const RenderItemTask = ({ item, danhmuc }) => {
  // const { deadline, quahan, isComplete } = checkIsDealine(item);
  return (
    <div
      style={{
        padding: 12,
        borderBottom: '1px solid #ddd',
        background: '#fff',
        borderRadius: 8,
        marginBottom: 8,
        position: 'relative'
      }}
    >
      <div className="time-end-block">{item?.ngay_het_han ? dayjs(item.ngay_het_han).format('DD/MM/YYYY') : ''}</div>
      <Flex
        align="center"
        gap={4}
        style={{ paddingBottom: 4, borderBottom: '1px solid #ddd', marginBottom: 4, color: ' #707070' }}
      >
        <IoTime size={14} style={{ position: 'relative' }} />
        {item?.ngay_giao ? dayjs(item.ngay_giao).format('DD/MM/YYYY') : ''}
      </Flex>
      <Flex
        align="center"
        justify="space-between"
        style={{ fontWeight: 600, color: '#26408c', marginBottom: 6, textAlign: 'justify' }}
      >
        Số eOffice: {item?.so_eoffice} | {item.noi_dung}
      </Flex>
      <div style={{ textAlign: 'justify', color: '#5671c1' }}>
        <IoChatboxEllipses size={16} style={{ marginRight: 6, position: 'relative', top: 4 }} />
        {item?.noi_dung_chi_dao}
      </div>
      <div style={{ background: '#f0f0f0', margin: '4px 0px', height: 1, width: '100%' }}></div>
      <Flex align="center" justify="space-between">
        <div>Chủ trì:</div>
        <div>{danhmuc?.don_vi_chu_tri.find(ele => ele.id === item.don_vi_chu_tri[0]).name}</div>
      </Flex>
    </div>
  );
};

function MobileCongViecPage() {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const [dataFilter, setDataFilter] = useState([]);
  const [danhmuc, setDanhMuc] = useState();
  // const [modalCongViec, setModalCongViec] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({
    don_vi_chu_tri: '',
    status: 1,
    expired: 1,
    sort: 1,
    p: 1,
    lanh_dao_vtt: user?.username === 'phanducanh.nan' ? '' : user?.id
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 50
  });

  const fetchData = async isLoading => {
    if (isLoading) setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`)]).then(res => {
      setDanhMuc(res[0].data);
    });
    // .finally(() => setIsLoading(false));
  };

  const handleDelete = id => {
    requestAPI
      .delete(`api/congviec/${id}`)
      .then(() => {
        toast.error('Xóa công việc thành công');
        onSearch();
      })
      .catch(err => toast.error(JSON.stringify(err)));
  };

  const handleComplete = id => {
    const formData = new FormData();
    formData.append('status', true);
    requestAPI
      .patch(`api/congviec/${id}`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(() => {
        toast.success('Hoàn thành công việc');
        fetchData();
      })
      .catch(err => toast.error(JSON.stringify(err)));
  };

  const handleFilter = (data, conditionSearch) => {
    const result = data
      .filter(ele => (conditionSearch.status === 1 ? ele : conditionSearch.status === 2 ? !ele.status : ele.status))
      .filter(ele =>
        conditionSearch.expired === 1
          ? ele
          : conditionSearch === 2
            ? !checkIsDealine(ele).quahan
            : checkIsDealine(ele).quahan
      )
      .sort(
        conditionSearch.sort === 2
          ? (a, b) => moment(a.ngay_giao, 'YYYY-MM-DD').unix() - moment(b.ngay_giao, 'YYYY-MM-DD').unix()
          : (a, b) => moment(b.ngay_giao, 'YYYY-MM-DD').unix() - moment(a.ngay_giao, 'YYYY-MM-DD').unix()
      );

    return result;
  };

  const onSearch = () => {
    const str =
      '?' +
      Object.keys(searchValue)
        .map(key => {
          return `${key}=${encodeURIComponent(searchValue[key])}`;
        })
        .join('&') +
      `&page_size=${pagination?.pageSize}`;
    setIsLoading(true);
    requestAPI
      .get(`api/congviec/${str}`)
      .then(res => {
        setPagination({
          total: res.data?.count,
          pageSize: 50
        });
        setDataFilter(handleFilter(res.data?.results, searchValue));
      })
      .finally(() => setIsLoading(false));
  };

  useLayoutEffect(() => {
    fetchData(true);
  }, []);

  useLayoutEffect(() => {
    onSearch();
  }, [searchValue]);

  console.log(setSearchValue, handleDelete, handleComplete, handleFilter, onSearch, fetchData, danhmuc, dataFilter);

  return (
    <HomeWrapper>
      <div className="header-mobile-wrapper">
        <Flex align="center" justify="space-between" style={{ padding: 12 }} gap={8}>
          <Flex align="center" gap={8}>
            {/* <IoHome color="#0C356A" size={22} onClick={() => {}} /> */}
            <div style={{ fontSize: 18, fontWeight: 600, color: '#26408c' }}>Công việc eOffice</div>
          </Flex>
          <Flex align="center" gap={8}>
            <div className="icon-button">
              <IoSearchOutline color="#26408c" size={22} onClick={() => {}} />
            </div>
            <div className="icon-button">
              <IoReloadOutline color="#26408c" size={22} onClick={() => {}} />
            </div>
          </Flex>
        </Flex>
      </div>
      {isLoading && (
        <Flex align="center" justify="center" style={{ marginTop: 40 }}>
          <Spin tip="Đang tải dữ liệu..." />
        </Flex>
      )}
      <div
        style={{
          flex: 1,
          marginTop: 60,
          marginBottom: 70,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch', // cuộn mượt iOS
          boxSizing: 'border-box'
        }}
      >
        <div style={{ padding: 16 }}>
          {dataFilter?.length > 0 &&
            dataFilter.map((item, index) => <RenderItemTask item={item} key={index} danhmuc={danhmuc} />)}
        </div>
      </div>
    </HomeWrapper>
  );
}

export default MobileCongViecPage;
