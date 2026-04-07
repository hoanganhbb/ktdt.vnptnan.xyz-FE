import React, { useState, useEffect } from 'react';
import requestAPI from '../../utils/requestAPI';
import { Button, Drawer, Popconfirm, Select, Spin, Table, Tag, Typography, Space, Flex } from 'antd';
import FormCongViec from './FormCongViec';
import { TrashFill, Check2Square } from 'react-bootstrap-icons';
import { HomeWrapper } from './styled';
import { toast } from 'sonner';
import moment from 'moment';
import queryString from 'query-string';
import LoadCongViec from './LoadCongViec';
import { useAuth } from '../../hooks/useAuth';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import { IoAdd, IoCloudDownloadOutline } from 'react-icons/io5';
import { LucideFilter } from 'lucide-react';
import { colors } from '../../utils/theme';

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
      <Spin spinning={isLoadingInit} tips="Đang tải dữ liệu...">
        <HomeWrapper>
          <Flex wrap align="center" justify="space-between" gap={16} className="mb-4!">
            <div>
              <Typography.Title level={4} style={{ margin: 0, color: colors.primary, fontWeight: 600 }}>
                Danh sách công việc eOffice
              </Typography.Title>
              <div className="text-sm italic text-gray-500">
                Công việc sắp xếp theo thứ tự ngày giao gần nhất, số lượng {pagination.totalCount} việc
              </div>
            </div>
            <Space>
              <Button
                type="default"
                onClick={handleExportExcel}
                loading={isLoadingExcel}
                icon={<IoCloudDownloadOutline style={{ position: 'relative' }} />}
              >
                Xuất Excel
              </Button>
              <Button type="primary" onClick={() => setModalCongViec(true)} icon={<IoAdd />}>
                Thêm mới
              </Button>
              <LoadCongViec onSuccess={() => onSearch()} />
            </Space>
          </Flex>
          <div className="bg-white border border-gray-200 rounded-lg shadow-2xs">
            {danhmuc && (
              <div className="p-4">
                <Flex wrap gap={16} algin="center">
                  <Flex align="center">
                    <LucideFilter size={22} />
                  </Flex>
                  <Flex vertical flex={1} style={{ maxWidth: 300 }}>
                    <Select
                      placeholder="Chọn đơn vị thực hiện"
                      options={[
                        {
                          name: <span className="text-gray-400">Đơn vị chủ trì thực hiện</span>,
                          title: 'Đơn vị chủ trì',
                          options: danhmuc.don_vi_chu_tri
                        }
                      ]}
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
                    <Select
                      placeholder="Chọn trạng thái"
                      value={searchValue.status}
                      onChange={value => {
                        setSearchValue({
                          ...searchValue,
                          status: value
                        });
                      }}
                      style={{ width: 200 }}
                      options={[
                        {
                          label: <span className="text-gray-400">Trạng thái</span>,
                          title: 'Trạng thái',
                          options: [
                            {
                              label: 'Tất cả',
                              value: 1
                            },
                            {
                              label: 'Chưa hoàn thành',
                              value: 2
                            },
                            {
                              label: 'Hoàn thành',
                              value: 3
                            }
                          ]
                        }
                      ]}
                    />
                  </Flex>
                  <Flex vertical>
                    <Select
                      placeholder="Chọn hạn"
                      value={searchValue.expired}
                      onChange={value => {
                        setSearchValue({
                          ...searchValue,
                          expired: value
                        });
                      }}
                      style={{ width: 150 }}
                      options={[
                        {
                          label: <span className="text-gray-400">Thời hạn</span>,
                          title: 'Thời hạn',
                          options: [
                            {
                              label: 'Tất cả',
                              value: 1
                            },
                            {
                              label: 'Còn hạn',
                              value: 2
                            },
                            {
                              label: 'Quá hạn',
                              value: 3
                            }
                          ]
                        }
                      ]}
                    />
                  </Flex>
                </Flex>
              </div>
            )}
            <Table
              dataSource={dataFilter}
              size="small"
              rowKey="id"
              isLoading={isLoading}
              bordered
              loading={isLoading}
              className="rounded-0"
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
                  width: -1,
                  render: (value, row) => (
                    <Space size="small">
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
                        <Button
                          variant="filled"
                          color="danger"
                          icon={<TrashFill color="#EF5350" size={16}></TrashFill>}
                          style={{ border: '1px solid #EF535080', display: 'flex', alignItems: 'center' }}
                        />
                      </Popconfirm>
                      {!value && (
                        <Button
                          variant="filled"
                          color="green"
                          icon={<Check2Square size={18} color="green" />}
                          onClick={() => handleComplete(row.id)}
                          style={{ border: '1px solid #39b145', display: 'flex', alignItems: 'center' }}
                        />
                      )}
                    </Space>
                  )
                }
              ]}
            ></Table>
          </div>
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
