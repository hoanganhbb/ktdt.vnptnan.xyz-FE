import React, { useState, useEffect } from 'react';
import requestAPI from '../../utils/requestAPI';
import { Button, Col, Drawer, Popconfirm, Radio, Row, Select, Spin, Table, Tag, Typography, Space } from 'antd';
// import { useAuth } from '../../hooks/useAuth';
import MainLayout from '../../components/MainLayout';
import FormCongViec from './FormCongViec';
import { TrashFill, Check2Square, Download } from 'react-bootstrap-icons';
import { HomeWrapper } from './styled';
import { toast } from 'sonner';
import moment from 'moment';
import queryString from 'query-string';
import LoadCongViec from './LoadCongViec';
import { useAuth } from '../../hooks/useAuth';

const checkIsDealine = data => {
  const deadline = moment(data.ngay_het_han).diff(moment(new Date()), 'days');
  const isQuaHan = deadline + 1 === 0 || deadline + 1 < 0;
  return {
    deadline: deadline + 1,
    quahan: isQuaHan,
    isComplete: data.status
  };
};

function MarkTest() {
  // const navigate = useNavigate();
  const { user } = useAuth();

  const [dataFilter, setDataFilter] = useState([]);
  const [danhmuc, setDanhMuc] = useState();
  const [modalCongViec, setModalCongViec] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchValue, setSearchValue] = useState({
    don_vi_chu_tri: '',
    status: 1,
    expired: 1,
    sort: 1,
    p: 1,
    lanh_dao_vtt: user?.id
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

  const handleExportExcel = () => {
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
      });
  };

  useEffect(() => {
    fetchData(true);
  }, []);

  useEffect(() => {
    onSearch();
  }, [searchValue]);

  return (
    <MainLayout>
      <Spin spinning={isLoading} tip="Đang tải dữ liệu...">
        <HomeWrapper>
          {!isLoading && danhmuc && (
            <Row gutter={16} style={{ marginBottom: 10, background: 'white', padding: 8, borderRadius: 6 }}>
              <Col span="6">
                <div>
                  <Typography.Text>Đơn vị thực hiện</Typography.Text>
                </div>
                <Select
                  defaultValue={''}
                  options={[{ name: 'Tất cả', id: '' }].concat(danhmuc.don_vi_chu_tri)}
                  fieldNames={{ label: 'name', value: 'id' }}
                  style={{ width: '100%' }}
                  value={searchValue.don_vi_chu_tri}
                  onChange={value =>
                    setSearchValue({
                      ...searchValue,
                      don_vi_chu_tri: value
                    })
                  }
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
              <Col span="6">
                <div className="flex-baseline-center" style={{ justifyContent: 'flex-end', gap: 8 }}>
                  <Button type="default" onClick={onSearch} loading={isLoading}>
                    Tìm kiếm
                  </Button>
                  <Button
                    type="dashed"
                    onClick={handleExportExcel}
                    loading={isLoading}
                    icon={<Download style={{ position: 'relative', top: 2 }}></Download>}
                  >
                    Xuất Excel
                  </Button>
                  <LoadCongViec onSuccess={() => onSearch()} />
                </div>
              </Col>
            </Row>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <Typography.Title level={5} style={{ margin: 0 }}>
              Tổng số việc: {dataFilter.length}
            </Typography.Title>
            <Space>
              <Button type="primary" onClick={() => setModalCongViec(true)}>
                Thêm công việc mới
              </Button>
              <Select
                defaultValue={''}
                options={[
                  { name: 'Sắp xếp theo ngày giao gần nhất', id: 1 },
                  { name: 'Sắp xếp theo ngày giao xa nhất', id: 2 }
                ]}
                fieldNames={{ label: 'name', value: 'id' }}
                style={{ width: '250px' }}
                value={searchValue.sort}
                onChange={value =>
                  setSearchValue({
                    ...searchValue,
                    sort: value
                  })
                }
              />
            </Space>
          </div>
          <Table
            dataSource={dataFilter}
            size="small"
            rowKey="id"
            isLoading={isLoading}
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
                        {'=>'} {row.noi_dung_chi_dao}{' '}
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
                      p/h:{' '}
                      {row.don_vi_phoi_hop
                        .map(item => {
                          return danhmuc?.don_vi_phoi_hop.find(ele => ele.id === item).name;
                        })
                        .join(', ')}
                    </div>
                  </>
                )
              },
              {
                title: 'Ngày hết hạn',
                dataIndex: 'ngay_het_han',
                key: 'ngay_het_han',
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
                          <Typography.Text italic style={{ color: !checkIsDealine(row).quahan ? 'green' : 'red' }}>
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
                // sorter: (a, b) => moment(a.date, 'YYYY-MM-DD').unix() - moment(b.date, 'YYYY-MM-DD').unix()
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
    </MainLayout>
  );
}

export default MarkTest;
