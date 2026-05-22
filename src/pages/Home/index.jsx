import React, { useState, useEffect, useRef } from 'react';
import requestAPI from '../../utils/requestAPI';
import { useNavigate } from 'react-router-dom';
import { Col, Table, Typography, Row, Tag, Flex, Input, Button, Spin, Divider } from 'antd';
import { HomeWrapper } from './styled';
import { formatCash } from '../../utils/constant';
import moment from 'moment';
import { BsFillGrid3X3GapFill, BsBoxArrowRight, BsListUl } from 'react-icons/bs';
import { toast } from 'sonner';
import { colors } from '../../utils/theme';
import { FaWallet } from 'react-icons/fa';
import dayjs from 'dayjs';
import { calculateSumIncomeCapTinh, selectorDuAnCapTinhConHieuLuc } from '../../utils';
import { FaDownload } from 'react-icons/fa6';

export default function HomePage() {
  const navigate = useNavigate();
  const DANH_MUC = useRef();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [indexView, setIndexView] = useState(1);
  const [filterCondition, setFilterCondition] = useState({
    textSearch: '',
    linhVucDuAn: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get('api/profile/'), requestAPI.get('api/duancntt/?cap_du_an=9')])
      .then(response => {
        DANH_MUC.current = response[0].data;
        const newData = selectorDuAnCapTinhConHieuLuc(response[1].data);
        setData(newData);
        setFilterData(newData);
      })
      .catch(e => toast.error(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const keyword = filterCondition.textSearch.trim().toLowerCase();
    let resultSearchText = data.filter(
      item => item.ten_du_an.toLowerCase().includes(keyword) || item.ten_viet_tat.toLowerCase().includes(keyword)
    );

    if (!keyword) resultSearchText = [...data];

    let resultSearchType = [...resultSearchText];
    if (filterCondition.linhVucDuAn) {
      resultSearchType = resultSearchText.filter(ele => ele.linh_vuc_du_an.includes(filterCondition.linhVucDuAn));
    }

    setFilterData(resultSearchType);
  }, [filterCondition, data]);

  const downloadFile = (res, name) => {
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', name);
    document.body.appendChild(link);
    link.click();
  };

  const handleExport = () => {
    setIsLoading(true);
    requestAPI
      .get('/api/duancntt/reportexcel', {
        responseType: 'blob'
      })
      .then(res => {
        downloadFile(res, `baocao_duan_cntt_${Date.now()}.xlsx`);
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra trong quá trình xuất Excel');
      })
      .finally(() => setIsLoading(false));
  };

  const linhVucDuAnList = [...(DANH_MUC.current?.linh_vuc_du_an || [])].sort((a, b) => a.id - b.id);
  const linhVucStats = linhVucDuAnList.map(ele => {
    const projectsInField = data.filter(element => element.linh_vuc_du_an.includes(ele.id));
    return {
      ...ele,
      projectCount: projectsInField.length,
      totalRevenue: projectsInField.reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0)
    };
  });
  const totalRevenue = formatCash(
    data.reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0),
    true
  );
  const signedContracts = filterData.filter(ele => ele.trang_thai_hop_dong === 6);
  const unsignedContracts = filterData.filter(ele => ele.trang_thai_hop_dong === 5);

  const renderProjectCard = item => {
    const statusName = DANH_MUC.current?.trang_thai_hop_dong?.find(ele => ele.id === item.trang_thai_hop_dong)?.name;

    return (
      <div className="project-card">
        <Flex justify="space-between" className="project-card-header">
          <div className="project-short-name">{item.ten_viet_tat}</div>
          <div className="project-contract-number">{item.so_hop_dong || '---'}</div>
        </Flex>

        <Typography.Text className="project-title-text">
          {item.ten_du_an}{' '}
          {statusName && <Tag color={item.trang_thai_hop_dong === 6 ? 'green' : 'orange'}>{statusName}</Tag>}
        </Typography.Text>

        <Flex wrap gap={6} className="project-tags-wrap">
          {DANH_MUC.current?.linh_vuc_du_an
            ?.filter(element => item.linh_vuc_du_an.includes(element.id))
            .map(ele => (
              <Tag color="blue" key={ele.id} style={{ fontSize: 12, fontWeight: 500 }}>
                {ele.name}
              </Tag>
            ))}
        </Flex>

        <div className="project-metric-row">
          <span>Giá trị</span>
          <Typography.Text strong className="project-metric-value">
            {formatCash(item.gia_tri_hop_dong)} đ
          </Typography.Text>
        </div>

        <div className="project-metric-row">
          <span>Ngày ký HĐ</span>
          <strong>{item.ngay_hop_dong ? dayjs(item.ngay_hop_dong).format('DD/MM/YYYY') : '---'}</strong>
        </div>

        <div className="project-metric-row">
          <span>Số tháng</span>
          <strong>
            {item.ngay_het_hop_dong
              ? `${moment(item.ngay_het_hop_dong).diff(moment(item.ngay_bat_dau_hop_dong), 'months') + 1} tháng`
              : '---'}
          </strong>
        </div>

        <div className="project-metric-row">
          <span>Ngày hết hạn HĐ</span>
          <strong>{item.ngay_het_hop_dong ? dayjs(item.ngay_het_hop_dong).format('DD/MM/YYYY') : '---'}</strong>
        </div>

        <Flex justify="flex-end" className="project-card-footer">
          <Button type="primary" onClick={() => navigate(`/duancntt/${item.id}`)}>
            <BsBoxArrowRight size={18} />
          </Button>
        </Flex>
      </div>
    );
  };

  return (
    <HomeWrapper>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen />

      <div className="home-shell">
        <div className="home-header-panel">
          <Flex align="center" justify="space-between" gap={24}>
            <div className="home-title-block">
              <Typography.Title level={4} className="home-title">
                Quản lý dự án công nghệ thông tin
              </Typography.Title>
              <Typography.Text className="home-subtitle">
                Tổng số dự án: {data?.length} • Mặc định sắp xếp theo ngày ký
              </Typography.Text>
            </div>

            <Flex align="center" gap={8} className="home-controls">
              <Input
                className="search-input"
                allowClear
                value={filterCondition.textSearch}
                onChange={e =>
                  setFilterCondition({
                    ...filterCondition,
                    textSearch: e.target.value
                  })
                }
                placeholder="Tìm kiếm theo tên viết tắt hoặc tên dự án"
              />

              <Flex className="view-switch">
                <button
                  className={indexView === 1 ? 'view-switch-btn active' : 'view-switch-btn'}
                  type="button"
                  onClick={() => setIndexView(1)}
                >
                  <BsFillGrid3X3GapFill size={16} />
                </button>
                <button
                  className={indexView === 2 ? 'view-switch-btn active' : 'view-switch-btn'}
                  type="button"
                  onClick={() => setIndexView(2)}
                >
                  <BsListUl size={16} />
                </button>
              </Flex>

              <Button type="primary" className="action-btn" onClick={() => navigate('/duancntt/create')}>
                Thêm dự án
              </Button>
              <Button type="default" className="action-btn export-btn" icon={<FaDownload />} onClick={handleExport}>
                Xuất Excel
              </Button>
            </Flex>
          </Flex>
        </div>

        {!!data.length && (
          <>
            <Row gutter={[12, 12]} className="stats-row">
              <Col xs={24} sm={12} md={8} lg={6}>
                <div
                  className="metric-card muted"
                  onClick={() => setFilterCondition({ ...filterCondition, linhVucDuAn: null })}
                >
                  <Typography.Text className="metric-card-label">Tổng doanh thu</Typography.Text>
                  <Typography.Title level={2} className="metric-card-value">
                    {totalRevenue}
                  </Typography.Title>
                  <div className="metric-card-caption">Tất cả lĩnh vực</div>
                </div>
              </Col>

              {linhVucStats.map(ele => (
                <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={4} key={ele.id}>
                  <div
                    className={filterCondition.linhVucDuAn === ele.id ? 'metric-card active' : 'metric-card'}
                    onClick={() =>
                      setFilterCondition({
                        ...filterCondition,
                        linhVucDuAn: filterCondition.linhVucDuAn === ele.id ? null : ele.id
                      })
                    }
                  >
                    <Flex justify="space-between" align="center" className="metric-card-head">
                      <Typography.Text className="metric-card-label">
                        {ele.name} ({ele.projectCount})
                      </Typography.Text>
                      <FaWallet
                        size={20}
                        color={filterCondition.linhVucDuAn === ele.id ? colors.white : colors.blue[500]}
                      />
                    </Flex>

                    <Typography.Title level={4} className="metric-card-value" style={{ margin: 0 }}>
                      {formatCash(ele.totalRevenue, true)}
                    </Typography.Title>

                    <div className="metric-card-caption">Doanh thu theo lĩnh vực</div>
                  </div>
                </Col>
              ))}
            </Row>

            <div className="timeline-panel">
              <div className="timeline-line" />
              {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027].map(ele => (
                <Flex key={ele} justify="space-between" align="center" vertical className="timeline-item">
                  <div className="timeline-year">{ele}</div>
                  <div className="timeline-dot" />
                  <div className="timeline-value">{calculateSumIncomeCapTinh(data, ele)}</div>
                </Flex>
              ))}
            </div>
          </>
        )}

        {indexView === 1 ? (
          <div className="table-wrapper card-mode">
            {signedContracts && !!signedContracts.length && (
              <>
                <div className="title-with-count">HỢP ĐỒNG ĐÃ KÝ ({signedContracts.length})</div>
                <Row gutter={[16, 16]}>
                  {signedContracts.map(item => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} key={item.id} className="gutter-row">
                      {renderProjectCard(item)}
                    </Col>
                  ))}
                </Row>
                <Divider style={{ margin: '16px 0' }} />
              </>
            )}

            {unsignedContracts && !!unsignedContracts.length && (
              <>
                <div className="title-with-count">HỢP ĐỒNG CHƯA KÝ ({unsignedContracts.length})</div>
                <Row gutter={[16, 16]}>
                  {unsignedContracts.map(item => (
                    <Col xs={24} sm={12} md={12} lg={8} xl={6} xxl={6} key={item.id} className="gutter-row">
                      {renderProjectCard(item)}
                    </Col>
                  ))}
                </Row>
              </>
            )}
          </div>
        ) : (
          <div className="table-wrapper">
            <Table
              dataSource={filterData}
              pagination={false}
              rowKey="id"
              columns={[
                {
                  title: 'STT',
                  dataIndex: 'id',
                  key: 'id',
                  align: 'center',
                  width: 80
                },
                {
                  title: 'Tên viết tắt',
                  dataIndex: 'ten_viet_tat',
                  key: 'ten_viet_tat',
                  width: 180,
                  render: (value, row) => (
                    <>
                      <Typography.Text strong>{value}</Typography.Text>
                      <div>
                        <Typography.Text style={{ color: row.trang_thai_hop_dong === 6 ? '#0f9d58' : '#f59e0b' }}>
                          {row.trang_thai_hop_dong === 6 ? 'Đã ký HĐ' : 'Chưa ký HĐ'}
                        </Typography.Text>
                      </div>
                    </>
                  )
                },
                {
                  title: 'Tên dự án',
                  dataIndex: 'ten_du_an',
                  key: 'ten_du_an',
                  render: (value, row) => {
                    const nextTask = row.nhiem_vu_du_an?.find(item => item.trang_thai_nhiem_vu_cntt === 8);
                    return (
                      <div className="table-project-cell" onClick={() => navigate(`/duancntt/${row.id}`)}>
                        <Typography.Text>Chủ đầu tư: {row.chu_dau_tu}</Typography.Text>
                        <Typography.Text strong>{value}</Typography.Text>
                        {nextTask && (
                          <Typography.Text className="table-task-hint">
                            Nhiệm vụ sắp tới: {nextTask.noi_dung} | Thời hạn: {nextTask.ngay_hoan_thanh}
                          </Typography.Text>
                        )}
                      </div>
                    );
                  }
                },
                {
                  title: 'Giá trị',
                  dataIndex: 'gia_tri_hop_dong',
                  key: 'gia_tri_hop_dong',
                  width: 140,
                  render: value => <>{value ? `${formatCash(value)}` : '---'}</>
                }
              ]}
            />
          </div>
        )}
      </div>
    </HomeWrapper>
  );
}
