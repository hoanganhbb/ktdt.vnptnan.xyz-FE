import React, { useState, useEffect } from 'react';
import requestAPI from '../../utils/requestAPI';
import { Button, Drawer, Popconfirm, Radio, Select, Spin, Table, Tag, Typography, Space, Flex } from 'antd';
// import { useAuth } from '../../hooks/useAuth';
import FormCongViec from './FormCongViec';
import { TrashFill, Check2Square, Download, FileEarmarkPlus } from 'react-bootstrap-icons';
import { HomeWrapper } from './styled';
import { toast } from 'sonner';
import moment from 'moment';
import queryString from 'query-string';
import LoadCongViec from './LoadCongViec';
import { useAuth } from '../../hooks/useAuth';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';

const today = dayjs();
dayjs.extend(isSameOrAfter);

const checkIsDealine = data => {
  const deadline = moment(data.ngay_het_han).diff(moment(new Date()), 'days');
  const isQuaHan = !!today.isSameOrAfter(dayjs(data.ngay_het_han));
  return {
    deadline: deadline + 1,
    quahan: isQuaHan,
    isComplete: data.status
  };
};

function CongViecLanhDao() {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const [dataFilter, setDataFilter] = useState([]);
  const [danhmuc, setDanhMuc] = useState();
  const [modalCongViec, setModalCongViec] = useState(false);
  const [isLoadingInit, setIsLoadingInit] = useState(false);
  const [isLoadingExcel, setIsLoadingExcel] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({
    don_vi_chu_tri: [],
    status: 1, // 1: Tất cả, 2: Chưa hoàn thành, 3: Hoàn thành
    expired: 1, // 1: Còn hạn, 2: Quá hạn
    p: 1,
    lanh_dao_vtt: user?.username === 'phanducanh.nan' ? '' : user?.id
  });

  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 20,
    totalCount: 0
  });

  const fetchData = async isLoading => {
    if (isLoading) setIsLoadingInit(true);
    Promise.all([requestAPI.get(`api/profile/`)])
      .then(res => {
        setDanhMuc(res[0].data);
      })
      .finally(() => setIsLoadingInit(false));
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
          pageSize: 20,
          totalCount: res.data?.count
        });
        setDataFilter(res.data?.results);
      })
      .finally(() => setIsLoading(false));
  };

  const handleExportExcel = () => {
    setIsLoadingExcel(true);
    const params = queryString.stringify(searchValue);
    requestAPI
      .get(`/api/congviec/congviecexcel?${params}`, {
        responseType: 'blob'
      })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `cong_viec_${Date.now()}.xlsx`);
        document.body.appendChild(link);
        link.click();
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra trong quá trình xuất excel');
      })
      .finally(() => setIsLoadingExcel(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    onSearch();
  }, [searchValue]);

  return (
    <>
      <Spin spinning={isLoadingInit} tip="Đang tải dữ liệu...">
        <HomeWrapper>
          {danhmuc && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mb-3 shadow-2xs">
              <Flex wrap gap={16} algin="center">
                <Flex vertical flex={1} style={{ maxWidth: '40%' }}>
                  <div className="mb-2">
                    <Typography.Text>Đơn vị thực hiện</Typography.Text>
                  </div>
                  <Select
                    placeholder="Chọn đơn vị thực hiện"
                    options={danhmuc.don_vi_chu_tri}
                    fieldNames={{ label: 'name', value: 'id' }}
                    style={{ width: '100%' }}
                    mode="multiple"
                    value={searchValue.don_vi_chu_tri}
                    onChange={value =>
                      setSearchValue({
                        ...searchValue,
                        don_vi_chu_tri: value
                      })
                    }
                    allowClear
                  />
                </Flex>
                <Flex vertical>
                  <div className="mb-2">
                    <Typography.Text>Trạng thái công việc</Typography.Text>
                  </div>
                  <Space>
                    {[
                      {
                        name: 'Tất cả',
                        id: 1,
                        props: {
                          color: '#1E88E5'
                        }
                      },
                      {
                        name: 'Chưa hoàn thành',
                        id: 2,
                        props: {
                          icon: <CloseCircleOutlined />,
                          color: '#EF5350'
                        }
                      },
                      {
                        name: 'Hoàn thành',
                        id: 3,
                        props: {
                          icon: <CheckCircleOutlined />,
                          color: '#4CAF50'
                        }
                      }
                    ].map(ele => (
                      <Button
                        key={ele.id}
                        {...ele.props}
                        style={{
                          background: searchValue.status === ele.id ? ele?.props.color : 'white',
                          color: searchValue.status === ele.id ? 'white' : '#444',
                          borderColor: searchValue.status === ele.id ? ele?.props.color : '#eee'
                        }}
                        disable={searchValue.status !== ele.id}
                        onClick={checked => {
                          if (checked) {
                            setSearchValue({
                              ...searchValue,
                              status: ele.id
                            });
                          } else {
                            setSearchValue({
                              ...searchValue,
                              status: 1
                            });
                          }
                        }}
                      >
                        {ele.name}
                      </Button>
                    ))}
                  </Space>
                </Flex>
                <Flex vertical>
                  <div className="mb-2">
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
                </Flex>
              </Flex>
            </div>
          )}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10
            }}
          >
            <div>
              <Typography.Title level={5} style={{ margin: 0 }}>
                Tổng số việc: {pagination.totalCount}
              </Typography.Title>
              <div className="text-sm italic text-gray-500">Công việc sắp xếp theo thứ tự ngày giao gần nhất</div>
            </div>
            <Space>
              <Button type="default" onClick={() => setModalCongViec(true)} icon={<FileEarmarkPlus />}>
                Thêm công việc mới
              </Button>
              <Button
                type="default"
                onClick={handleExportExcel}
                loading={isLoadingExcel}
                icon={<Download style={{ position: 'relative' }}></Download>}
              >
                Xuất Excel
              </Button>
              <LoadCongViec onSuccess={() => onSearch()} />
            </Space>
          </div>
          <Table
            dataSource={dataFilter}
            size="small"
            rowKey="id"
            isLoading={isLoading}
            bordered
            loading={isLoading}
            className="border border-gray-200 rounded-2xl bg-white"
            rowClassName={record =>
              checkIsDealine(record).quahan && !checkIsDealine(record).isComplete ? 'task-expired' : 'task-normal'
            }
            pagination={{
              pageSize: pagination?.pageSize,
              total: pagination?.total,
              current: searchValue.p,
              onChange: page => {
                setSearchValue({
                  ...searchValue,
                  p: page
                });
              },
              size: 'default',
              style: {
                paddingRight: 16
              }
            }}
            columns={[
              {
                title: 'STT',
                dataIndex: 'id',
                key: 'id',
                align: 'center',
                render: (value, row, index) => (
                  <>
                    <div>{index + 1}</div>
                    <div style={{ color: '#EEEEEE' }}>{value}</div>
                  </>
                )
              },
              {
                title: 'Nội dung',
                dataIndex: 'noi_dung',
                key: 'noi_dung',
                width: '45%',
                render: (value, row) => (
                  <>
                    <div>
                      <Typography.Text strong>
                        Số eOffice: {row.so_eoffice} | {value}
                      </Typography.Text>
                    </div>
                    <div>
                      <Typography.Text>
                        {user.username === 'phanducanh.nan' && row.lanh_dao_vtt} {'=>'} {row.noi_dung_chi_dao}{' '}
                      </Typography.Text>
                    </div>
                  </>
                )
              },

              {
                title: 'Đơn vị thực hiện',
                dataIndex: 'don_vi_chu_tri',
                key: 'don_vi_chu_tri',
                width: '25%',
                render: (value, row) => (
                  <>
                    <div>
                      <Typography.Text strong>
                        Chủ trì:{' '}
                        {row.don_vi_chu_tri
                          .map(item => {
                            return danhmuc?.don_vi_chu_tri.find(ele => ele.id === item).name;
                          })
                          .join(', ')}
                      </Typography.Text>
                    </div>
                    <div>
                      <div className="line-clamp-3">
                        p/h:{' '}
                        {row.don_vi_phoi_hop
                          .map(item => {
                            return danhmuc?.don_vi_phoi_hop.find(ele => ele.id === item).name;
                          })
                          .join(', ')}
                      </div>
                    </div>
                  </>
                )
              },
              {
                title: 'Ngày hết hạn',
                dataIndex: 'ngay_het_han',
                key: 'ngay_het_han',
                width: 220,
                render: (value, row) => {
                  return (
                    <>
                      <Typography.Paragraph
                        style={{
                          fontWeight: row.status ? '400' : '600',
                          marginBottom: 0,
                          color: row.status ? '#222' : checkIsDealine(row).quahan ? 'red' : 'green'
                        }}
                      >
                        {moment(value).format('DD/MM/YYYY')}
                      </Typography.Paragraph>

                      {!checkIsDealine(row).quahan && !row.status && (
                        <div>
                          <Typography.Text
                            italic
                            style={{
                              color: !checkIsDealine(row).quahan ? 'green' : 'red'
                            }}
                          >
                            Còn hạn: {checkIsDealine(row).deadline} ngày
                          </Typography.Text>
                        </div>
                      )}
                      {checkIsDealine(row).quahan && !row.status && (
                        <Tag color="red" style={{ fontWeight: '600' }}>
                          Quá hạn
                        </Tag>
                      )}
                    </>
                  );
                }
              },
              {
                title: 'Ngày giao',
                dataIndex: 'ngay_giao',
                key: 'ngay_giao',
                render: value => <>{value ? moment(value).format('DD/MM/YYYY') : ''}</>
              },
              {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                width: 180,
                render: (value, row) => (
                  <Space size="small" wrap separator="|">
                    <Tag color={value ? 'green' : 'red'} style={{ fontWeight: 600 }}>
                      {value ? 'OK' : 'NO'}
                    </Tag>
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
                      <TrashFill size={18} style={{ margin: '0 6px' }} color="#EF5350"></TrashFill>
                    </Popconfirm>
                    {!value && (
                      <>
                        <Check2Square
                          size={18}
                          style={{ margin: '0 6px' }}
                          color="green"
                          onClick={() => handleComplete(row.id)}
                        ></Check2Square>
                      </>
                    )}
                  </Space>
                )
              }
            ]}
          ></Table>
        </HomeWrapper>
      </Spin>
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
    </>
  );
}

export default CongViecLanhDao;
