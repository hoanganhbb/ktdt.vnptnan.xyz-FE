import React, { useState, useEffect } from 'react';
import requestAPI from '../../utils/requestAPI';
import { Button, Col, Drawer, Popconfirm, Radio, Row, Select, Spin, Table, Tag, Typography } from 'antd';
// import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../components/MainLayout';
import FormCongViec from './FormCongViec';
import { TrashFill, Check2Square } from 'react-bootstrap-icons';
import { HomeWrapper } from './styled';
import { toast } from 'sonner';
import moment from 'moment';
import { checkIsDealine, exportCVHetHan } from './functions';
import OveralContainer from './OveralContainer';

function CongViecKTDT() {
  // const navigate = useNavigate();
  const [dataFilter, setDataFilter] = useState([]);
  const [danhmuc, setDanhMuc] = useState();
  const [modalCongViec, setModalCongViec] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({
    nhan_vien: '',
    status: 2,
    expired: 1
  });

  const fetchData = async isLoading => {
    if (isLoading) setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`)])
      .then(res => {
        // setDataFilter(res[0].data);
        setDanhMuc(res[0].data);
      })
      .finally(() => setIsLoading(false));
  };

  const handleDelete = id => {
    requestAPI
      .delete(`api/congviecktdt/${id}`)
      .then(() => {
        toast.error('Xóa công việc thành công');
        fetchData();
      })
      .catch(err => toast.error(JSON.stringify(err)));
  };

  const handleComplete = id => {
    const formData = new FormData();
    formData.append('status', true);
    requestAPI
      .patch(`api/congviecktdt/${id}`, formData, {
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
    const resultStatus = data.filter(ele => {
      if (conditionSearch.status === 1) return ele;
      if (conditionSearch.status === 2) return !ele.status;
      if (conditionSearch.status === 3) return ele.status;
    });

    const resultExpired = resultStatus.filter(ele => {
      if (conditionSearch.expired === 1) return ele;
      if (conditionSearch.expired === 2) return !checkIsDealine(ele).quahan;
      if (conditionSearch.expired === 3) return checkIsDealine(ele).quahan;
    });

    return resultExpired;
  };

  const onSearch = () => {
    if (isLoading) setIsLoading(true);
    const str =
      '?' +
      Object.keys(searchValue)
        .map(key => {
          return `${key}=${encodeURIComponent(searchValue[key])}`;
        })
        .join('&');
    setIsLoading(true);
    requestAPI
      .get(`api/congviecktdt/${str}`)
      .then(res => {
        setDataFilter(handleFilter(res.data, searchValue));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    onSearch(true);
  }, [searchValue]);

  return (
    <MainLayout>
      <Spin spinning={isLoading} fullscreen tips="Đang tải dữ liệu"></Spin>
      <HomeWrapper>
        {!!dataFilter.length && <Row gutter={16} style={{ marginBottom: 10 }}>
          <Col span={6}>
            <OveralContainer count={exportCVHetHan(dataFilter).count} />
          </Col>
        </Row>}
        {danhmuc && (
          <Row gutter={16} style={{ marginBottom: 10, background: 'white', padding: 10, borderRadius: 6 }}>
            <Col span="4">
              <div>
                <Typography.Text>Cá nhân thực hiện</Typography.Text>
              </div>
              <Select
                defaultValue={''}
                options={[{ name: 'Tất cả', id: '' }].concat(danhmuc.users).filter(ele => ele.name.trim())}
                fieldNames={{ label: 'name', value: 'id' }}
                style={{ width: '100%' }}
                value={searchValue.nhan_vien}
                onChange={value => {
                  setSearchValue({
                    ...searchValue,
                    nhan_vien: value
                  });
                }}
              />
            </Col>
            <Col span="6">
              <div>
                <Typography.Text>Trạng thái công việc</Typography.Text>
              </div>
              <Select
                options={[
                  {
                    name: 'Tất cả',
                    id: 1
                  },
                  {
                    name: 'Chưa hoàn thành',
                    id: 2
                  },
                  {
                    name: 'Hoàn thành',
                    id: 3
                  }
                ]}
                fieldNames={{ label: 'name', value: 'id' }}
                style={{ width: '100%' }}
                onChange={value => {
                  setSearchValue({
                    ...searchValue,
                    status: value
                  });
                }}
                value={searchValue.status}
              />
            </Col>
            <Col span="6">
              <div>
                <Typography.Text>Thời hạn công việc</Typography.Text>
              </div>
              <Radio.Group
                onChange={e => {
                  setSearchValue({
                    ...searchValue,
                    expired: e.target.value
                  });
                }}
                value={searchValue.expired}
              >
                <Radio value={1}>Tất cả</Radio>
                <Radio value={2}>Còn hạn</Radio>
                <Radio value={3}>Quá hạn</Radio>
              </Radio.Group>
            </Col>
            <Col span="8">
              <div className="flex-baseline-center" style={{ justifyContent: 'flex-end' }}>
                <Button type="default" onClick={onSearch} loading={isLoading}>
                  Tìm kiếm
                </Button>
              </div>
            </Col>
          </Row>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
          <Typography.Title level={5} style={{ margin: 0 }}>
            Tổng số công việc: {dataFilter.length}
          </Typography.Title>
          <Button type="primary" onClick={() => setModalCongViec(true)}>
            Thêm công việc mới
          </Button>
        </div>
        <Table
          dataSource={dataFilter}
          size="small"
          rowKey="id"
          pagination={false}
          className="table-striped-rows"
          rowClassName={record =>
            checkIsDealine(record).quahan && !checkIsDealine(record).isComplete ? 'task-expired' : 'task-normal'
          }
          // loading={isLoading}
          columns={[
            {
              title: 'STT',
              dataIndex: 'id',
              key: 'id',
              align: 'center',
              render: (value, row, index) => <>{index + 1}</>
            },
            {
              title: 'Nội dung',
              dataIndex: 'noi_dung',
              key: 'noi_dung',
              width: '40%',
              render: (value, row) => (
                <div style={{ marginRight: 20 }}>
                  <div style={{ textAlign: 'justify' }}>
                    <Typography.Text strong>{value}</Typography.Text>
                  </div>
                  <div style={{ textAlign: 'justify' }}>
                    <Typography.Text>
                      {'=>'} {row.noi_dung_chi_dao}{' '}
                    </Typography.Text>
                  </div>
                </div>
              )
            },
            {
              title: 'Lãnh đạo phụ trách',
              dataIndex: 'lanh_dao_phu_trach',
              key: 'lanh_dao_phu_trach',
              width: 250
            },
            {
              title: 'Cá nhân thực hiện',
              dataIndex: 'ca_nhan_chu_tri',
              key: 'ca_nhan_chu_tri',
              width: '20%',
              render: (value, row) => (
                <>
                  <div>
                    <Typography.Text strong>Chủ trì: {value}</Typography.Text>
                  </div>
                  {!!row.ca_nhan_phoi_hop.length && <div>p/h: {row.ca_nhan_phoi_hop.join(', ')}</div>}
                </>
              )
            },
            {
              title: 'Ngày hết hạn',
              dataIndex: 'ngay_het_han',
              key: 'ngay_het_han',
              width: 290,
              render: (value, row) => {
                const deadline = moment(value).diff(moment(new Date()), 'days');
                const isQuaHan = deadline + 1 === 0 || deadline + 1 < 0;
                return (
                  <>
                    <Typography.Paragraph
                      style={{
                        fontWeight: row.status ? '400' : '600',
                        marginBottom: 0,
                        color: row.status ? '#222' : isQuaHan ? 'red' : 'green'
                      }}
                    >
                      {moment(value).format('DD/MM/YYYY')}
                    </Typography.Paragraph>

                    {!isQuaHan && !row.status && (
                      <div>
                        <Typography.Text italic style={{ color: !isQuaHan ? 'green' : 'red' }}>
                          Còn hạn: {deadline + 1} ngày
                        </Typography.Text>
                      </div>
                    )}
                    {isQuaHan && !row.status && (
                      <Tag color="red" style={{ fontWeight: '600' }}>
                        Quá hạn
                      </Tag>
                    )}
                  </>
                );
              }
            },
            {
              title: 'Trạng thái',
              dataIndex: 'status',
              key: 'status',
              render: (value, row) => (
                <div className="flex-baseline-center" style={{ cursor: 'pointer' }}>
                  <Tag color={value ? 'green' : 'red'} style={{ fontWeight: 600 }}>
                    {value ? 'OK' : 'NO'}
                  </Tag>{' '}
                  <div className="flex-baseline-center action-wrapper">
                    <Popconfirm
                      className="popover-wrapper"
                      title="Xóa công việc"
                      description="Bạn có chắc chắn muốn xóa công việc này?"
                      onConfirm={() => handleDelete(row.id)}
                      okText="Đồng ý"
                      cancelText="Hủy"
                      placement="left"
                      icon={<TrashFill size={26} style={{ margin: '0 10px 0 0' }} color="#EF5350"></TrashFill>}
                    >
                      |<TrashFill size={18} style={{ margin: '0 6px' }} color="#EF5350"></TrashFill>
                    </Popconfirm>
                    {!value && (
                      <>
                        |
                        <Check2Square
                          size={18}
                          style={{ margin: '0 6px' }}
                          color="green"
                          onClick={() => handleComplete(row.id)}
                        ></Check2Square>
                      </>
                    )}
                  </div>
                </div>
              )
            }
          ]}
        ></Table>
      </HomeWrapper>
      {modalCongViec && (
        <Drawer open={modalCongViec} width={'40%'} onClose={() => setModalCongViec(false)}>
          <FormCongViec
            danhmuc={danhmuc}
            onFinish={() => {
              setModalCongViec(false);
              fetchData();
            }}
          ></FormCongViec>
        </Drawer>
      )}
    </MainLayout>
  );
}

export default CongViecKTDT;
