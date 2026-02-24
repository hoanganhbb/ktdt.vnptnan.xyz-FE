import React, { useState, useRef, useEffect } from 'react';
import { Col, Flex, Row, Select, Spin, Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
// import { FaDotCircle } from 'react-icons/fa';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
// import dayjs from 'dayjs';
import { colors } from '../../utils/theme';
import { compactNumber, formatCash } from '../../utils/constant';
import styled from 'styled-components';
import { FaDownload, FaPlus, FaWallet } from 'react-icons/fa6';
import {
  DU_AN_CAP_HUYEN_ID,
  TRANG_THAI_HD_DA_KY,
  calculateSumIncomeCapHuyen,
  selectorDuAnCapHuyenConHieuLuc
} from '../../utils';
import dayjs from 'dayjs';
import { BsBoxArrowRight } from 'react-icons/bs';

const StyledWrapper = styled.div`
  /* padding: 20px; */
  .ant-table-cell-row-hover {
    background: #eeeeee !important;
  }
  .total-row {
    background: #bbdefb;
  }
`;

function DuAnCapHuyen() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const DANH_MUC = useRef();

  const [filterCondition, setFilterCondition] = useState({
    // textSearch: null,
    don_vi_ky_ket: null,
    linh_vuc_du_an: null,
    nhom_dich_vu: null
  });
  const [filterData, setFilterData] = useState([]);
  // const [dataFilter, setDataFilter] = useState([])

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get('api/duancntt/')])
      .then(response => {
        DANH_MUC.current = response[0].data;
        setData(selectorDuAnCapHuyenConHieuLuc(response[1].data));
        // console.log(selectorDuAnCapHuyenConHieuLuc(response[1].data)?.sort((a, b) => dayjs(a.ngay_het_hop_dong).diff(b.ngay_het_hop_dong), 'day'));
        setFilterData(selectorDuAnCapHuyenConHieuLuc(response[1].data));
      })
      .catch(e => toast.error(e))
      .finally(() => setIsLoading(false));
  };

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
      .get('/api/duancntt/reportexcelcaphuyen', {
        responseType: 'blob'
      })
      .then(res => {
        downloadFile(res, `baocao_duan_cntt_huyen_${Date.now()}.xlsx`);
      })
      .catch(() => {
        toast.error('Có lỗi xảy ra trong quá trình xuất excel');
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(filterCondition);
    const filteredData = data.filter(ele => {
      for (var key in filterCondition) {
        if (key === 'nhom_dich_vu' && filterCondition[key] && ele[key] === filterCondition[key]) return true;
        if (key === 'don_vi_ky_ket' && filterCondition[key] && ele[key].includes(filterCondition[key])) return true;
      }
      return false;
    });
    setFilterData(filteredData);
    console.log(filteredData);
  }, [filterCondition]);

  return (
    <>
      <StyledWrapper>
        <Spin tips="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
        {DANH_MUC.current && (
          <>
            <Flex wrap justify="space-between" style={{ width: '100%', marginBottom: 6 }}>
              <div style={{ margin: 0, textTransform: 'uppercase', fontWeight: 600, fontSize: 18, marginBottom: 5 }}>
                Dự án công nghệ thông tin cấp xã ({data?.length})
              </div>
              <div style={{ fontStyle: 'italic', fontSize: 12, marginBottom: 10 }}>
                (Mặc định sắp xếp theo giá trị giảm dần)
              </div>
            </Flex>
            <Row gutter={16} style={{}}>
              <Col xs={24} sm={8} md={8} lg={6} xl={3} className="gutter-row" style={{ marginBottom: 10 }}>
                <div
                  style={{
                    background: '#B2DFDB',
                    borderRadius: 10,
                    padding: 6,
                    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                    height: '100%'
                  }}
                >
                  <p
                    style={{
                      textAlign: 'center',
                      fontSize: 40,
                      color: colors.blue[800],
                      fontWeight: 700,
                      margin: '10px 0'
                    }}
                  >
                    {compactNumber(data.reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0))}
                  </p>
                  <p style={{ textAlign: 'center', color: colors.blue[800], fontWeight: 600, fontSize: 16 }}>
                    TỔNG DOANH THU
                  </p>
                </div>
              </Col>
              {DANH_MUC.current.linh_vuc_du_an
                .sort((a, b) => a.id - b.id)
                .map((ele, index) => (
                  <Col
                    className="gutter-row"
                    style={{ marginBottom: 10, cursor: 'pointer' }}
                    key={index}
                    onClick={() => {
                      setFilterCondition({
                        ...filterCondition,
                        linhVucDuAn: filterCondition.linhVucDuAn === ele.id ? null : ele.id
                      });
                    }}
                    span="auto"
                  >
                    <div
                      style={{
                        color: filterCondition.linhVucDuAn === ele.id ? colors.white : colors.blue[`${index + 7}00`],
                        borderRadius: 10,
                        padding: 12,
                        border: '1px solid #e9e9e9',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        height: '100%',
                        width: 180,
                        background: filterCondition.linhVucDuAn === ele.id ? colors.blue[800] : `${colors.blue[100]}30`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-evenly',
                        filter:
                          filterCondition.linhVucDuAn && filterCondition.linhVucDuAn !== ele.id ? 'blur(2px)' : 'unset',
                        transition: 200
                      }}
                    >
                      <Flex align="flex-start" justify="space-between" style={{ flexDirection: 'column' }}>
                        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 17 }}>{ele.name}</div>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <FaWallet
                          size={26}
                          color={
                            filterCondition.linhVucDuAn === ele.id ? colors.white : `${colors.blue[`${index + 5}00`]}`
                          }
                        />
                        <p style={{ textAlign: 'center', fontSize: 22, fontWeight: 600, margin: '10px 0' }}>
                          {formatCash(
                            data
                              .filter(element => element.linh_vuc_du_an.includes(ele.id))
                              .reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0),
                            true
                          )}
                        </p>
                      </Flex>
                    </div>
                  </Col>
                ))}
            </Row>

            <Row gutter={16}>
              <Col span={16}>
                <Flex style={{ background: 'white', padding: 16, borderRadius: 6, position: 'relative' }} gap={20}>
                  <div
                    style={{
                      width: '100%',
                      height: 1,
                      background: colors.blackAlpha[300],
                      position: 'absolute',
                      top: '49%',
                      left: 0
                    }}
                  ></div>
                  {[2021, 2022, 2023, 2024, 2025, 2026, 2027].map((ele, index) => (
                    <Flex
                      key={index}
                      justify="space-between"
                      align="center"
                      vertical
                      style={{
                        color: '#234E52',
                        marginBottom: 5,
                        position: 'relative',
                        border: '1px dashed #71717a50',
                        padding: 10,
                        borderRadius: 10,
                        minWidth: 100
                      }}
                    >
                      <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[900], marginBottom: 10 }}>
                        {ele}
                      </div>
                      <div
                        style={{
                          fontWeight: 800,
                          fontSize: 40,
                          position: 'absolute',
                          width: 10,
                          height: 10,
                          background: colors.blackAlpha[400],
                          left: '50%',
                          top: '45%',
                          borderRadius: 9999,
                          transform: 'translateX(-50%)'
                        }}
                      ></div>
                      <div style={{ fontWeight: 600, fontSize: 18, marginTop: 16 }}>
                        {calculateSumIncomeCapHuyen(data, ele)}
                      </div>
                    </Flex>
                  ))}
                </Flex>
              </Col>
              <Col span={8}>
                <div
                  style={{
                    border: '1px dashed #f87171',
                    padding: '4px 10px',
                    borderRadius: 12,
                    height: '100%',
                    background: colors.red[50]
                  }}
                >
                  <div style={{ fontWeight: 600, marginBottom: 2, color: colors.blue[800] }}>Dự án sắp hết hạn</div>
                  <ul style={{ paddingLeft: 20, marginTop: 4 }}>
                    {data
                      ?.sort((a, b) => dayjs(a.ngay_het_hop_dong).diff(b.ngay_het_hop_dong), 'day')
                      .slice(0, 3)
                      .map(ele => (
                        <li key={ele.id} style={{ marginBottom: 5, color: colors.blue[800] }}>
                          <div style={{ fontWeight: 500 }}>
                            {ele.ten_viet_tat} | {ele.chu_dau_tu} |{' '}
                            {`${dayjs(ele.ngay_het_hop_dong).format('DD/MM/YYYY')}`}
                          </div>
                          <div style={{ fontWeight: 600 }}>{ele.ten_du_an}</div>
                        </li>
                      ))}
                  </ul>
                </div>
              </Col>
            </Row>

            <div style={{ height: 10 }}></div>

            <Row gutter={16}>
              <Col span={6}>
                <Select
                  placeholder="Đơn vị ký kết"
                  options={[...DANH_MUC.current.don_vi_ky_ket]}
                  fieldNames={{ label: 'name', value: 'id' }}
                  value={filterCondition.don_vi_ky_ket}
                  style={{ width: '100%' }}
                  allowClear
                  onChange={e =>
                    setFilterCondition({
                      ...filterCondition,
                      nhom_dich_vu: null,
                      don_vi_ky_ket: e
                    })
                  }
                />
              </Col>
              <Col span={6}>
                <Select
                  placeholder="Nhóm dịch vụ"
                  options={[...DANH_MUC.current.nhom_dich_vu]}
                  fieldNames={{ label: 'name', value: 'id' }}
                  style={{ width: '100%' }}
                  value={filterCondition.nhom_dich_vu}
                  allowClear
                  onChange={e =>
                    setFilterCondition({
                      ...filterCondition,
                      nhom_dich_vu: e,
                      don_vi_ky_ket: null
                    })
                  }
                />
              </Col>
              <Col span={12}>
                <Flex align="center" justify="flex-end" gap={10}>
                  <Button
                    type="primary"
                    icon={<FaPlus />}
                    style={{ fontWeight: 500 }}
                    onClick={() => navigate(`/duancntt/create?cap_du_an=10`)}
                  >
                    Thêm dự án
                  </Button>
                  <Button type="primary" icon={<FaDownload />} style={{ fontWeight: 500 }} onClick={handleExport}>
                    Xuất Excel
                  </Button>
                </Flex>
              </Col>
            </Row>

            <div style={{ height: 10 }}></div>

            <Row gutter={16}>
              <Col span={filterCondition.don_vi_ky_ket || filterCondition.nhom_dich_vu ? 18 : 24}>
                <div style={{ boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' }}>
                  <Table
                    dataSource={[
                      ...DANH_MUC.current.don_vi_ky_ket.filter(ele =>
                        filterCondition.don_vi_ky_ket ? ele.id === filterCondition.don_vi_ky_ket : ele.id !== 63
                      ),
                      {
                        name: 'TỔNG DỰ ÁN',
                        id: 99999
                      },
                      {
                        name: 'TỔNG DOANH THU',
                        id: 88888
                      }
                    ]}
                    pagination={false}
                    size="small"
                    onRow={record => {
                      return {
                        onClick: () => {
                          if ([99999, 88888].includes(record.id)) return;
                          navigate(`/duancaphuyen/${record.id}`);
                        }
                      };
                    }}
                    columns={[
                      {
                        title: 'STT',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text, row, idx) => <>{idx + 1}</>,
                        width: 60,
                        align: 'center'
                      },
                      {
                        title: 'Đơn vị',
                        dataIndex: 'name',
                        key: 'name',
                        render: (text, row) =>
                          [99999, 88888].includes(row.id) ? (
                            <div style={{ fontWeight: 700, textAlign: 'center' }}>{text}</div>
                          ) : (
                            <div style={{ fontWeight: 500 }}>{text}</div>
                          )
                      },
                      {
                        title: 'Số dự án',
                        dataIndex: 'id',
                        key: 'id',
                        align: 'center',
                        hidden: !!filterCondition.nhom_dich_vu,
                        render: (value, row) => {
                          if (row.id === 88888) return <></>;
                          if (row.id === 99999) {
                            return (
                              <div style={{ fontWeight: 700 }}>
                                {
                                  data.filter(
                                    ele =>
                                      ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY &&
                                      ele.cap_du_an === DU_AN_CAP_HUYEN_ID
                                  ).length
                                }
                              </div>
                            );
                          } else {
                            return (
                              <div style={{ fontWeight: 500 }}>
                                {data.filter(ele => ele.don_vi_ky_ket.includes(value)).length}
                              </div>
                            );
                          }
                        }
                      },
                      {
                        title: 'Doanh thu',
                        dataIndex: 'id',
                        key: 'id',
                        align: 'center',
                        render: (value, row) => {
                          if (row.id === 99999) return <></>;
                          if (row.id === 88888) {
                            return (
                              <div style={{ fontWeight: 500 }}>
                                {formatCash(
                                  data
                                    .filter(
                                      ele =>
                                        ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY &&
                                        ele.cap_du_an === DU_AN_CAP_HUYEN_ID
                                    )
                                    .reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0)
                                )}
                              </div>
                            );
                          } else {
                            return (
                              <div style={{ fontWeight: 500 }}>
                                {formatCash(
                                  data
                                    .filter(ele => ele.don_vi_ky_ket.includes(value))
                                    .reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0)
                                )}
                              </div>
                            );
                          }
                        }
                      },
                      ...DANH_MUC.current.nhom_dich_vu
                        .filter(ele => (filterCondition.nhom_dich_vu ? ele.id === filterCondition.nhom_dich_vu : true))
                        .map(dv => {
                          return {
                            title: dv.name,
                            key: dv.id,
                            align: 'center',
                            render: (value, row) => {
                              const VALUE_DATA = data.filter(
                                ele => ele.don_vi_ky_ket.includes(row.id) && ele.nhom_dich_vu === dv.id
                              ).length;
                              const VALUE_COST = formatCash(
                                data
                                  .filter(ele => ele.nhom_dich_vu === dv.id)
                                  .reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0)
                              );
                              if (row.id === 99999)
                                return (
                                  <div style={{ fontWeight: 700 }} key={dv.id}>
                                    {data.filter(ele => ele.nhom_dich_vu === dv.id).length}
                                  </div>
                                );
                              if (row.id === 88888) return <div style={{ fontWeight: 600 }}>{VALUE_COST}</div>;
                              return (
                                <div key={dv.id} style={{ fontWeight: VALUE_DATA ? 600 : 400 }}>
                                  {VALUE_DATA ? VALUE_DATA : '-'}
                                </div>
                              );
                            }
                          };
                        })
                    ]}
                  ></Table>
                </div>
              </Col>

              {(filterCondition.don_vi_ky_ket || filterCondition.nhom_dich_vu) && (
                <Col span={6}>
                  {filterData.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: 'white',
                        borderRadius: 10,
                        padding: 16,
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        paddingBottom: 60,
                        marginBottom: 10,
                        position: 'relative',
                        width: '100%'
                      }}
                    >
                      <Flex justify="space-between">
                        <div style={{ fontSize: 16, fontWeight: 600, color: '#718096' }}>{item.ten_viet_tat}</div>
                        <div
                          style={{
                            fontWeight: 600,
                            color: '#718096',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: '66%'
                          }}
                        >
                          {item.so_hop_dong}
                        </div>
                      </Flex>
                      <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                      <div style={{ textAlign: 'justify', marginBottom: 5 }}>
                        <div style={{ fontWeight: 500, letterSpacing: 0 }}>
                          {item.ten_du_an}{' '}
                          {DANH_MUC && !!DANH_MUC.current.trang_thai_hop_dong.length && (
                            <Tag color={item.trang_thai_hop_dong === 6 ? 'green' : 'red'} style={{ fontSize: 13 }}>
                              {
                                DANH_MUC.current.trang_thai_hop_dong.find(ele => ele.id === item.trang_thai_hop_dong)
                                  .name
                              }
                            </Tag>
                          )}
                        </div>
                      </div>

                      <div>
                        {DANH_MUC.current &&
                          DANH_MUC.current?.linh_vuc_du_an
                            .filter(element => item.linh_vuc_du_an.includes(element.id))
                            .map(ele => (
                              <Tag color="" style={{ fontSize: 13 }} key={ele.id}>
                                {ele.name}
                              </Tag>
                            ))}
                      </div>
                      <div style={{ background: '#EDF2F7', margin: '8px 0', height: 1 }}></div>
                      <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                        <div>Giá trị: </div>
                        <div style={{ margin: 0, color: '#2C5282', fontWeight: 600 }}>
                          {formatCash(item.gia_tri_hop_dong)} đ
                        </div>
                      </Flex>
                      <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                      <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                        <div>Ngày ký HĐ:</div>
                        {item.ngay_hop_dong ? (
                          <div style={{ fontWeight: 600 }}>{dayjs(item.ngay_hop_dong).format('DD/MM/YYYY')}</div>
                        ) : (
                          '---'
                        )}
                      </Flex>
                      <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                      <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                        <div>Số tháng:</div>
                        {item.ngay_het_hop_dong && (
                          <div style={{ fontWeight: 600 }}>
                            {dayjs(item.ngay_het_hop_dong).diff(dayjs(item.ngay_bat_dau_hop_dong), 'months') + 1} tháng
                          </div>
                        )}
                      </Flex>
                      <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                      <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                        <div>Ngày hết hạn HĐ:</div>
                        {item.ngay_het_hop_dong ? (
                          <div style={{ fontWeight: 600 }}>{dayjs(item.ngay_het_hop_dong).format('DD/MM/YYYY')}</div>
                        ) : (
                          '---'
                        )}
                      </Flex>
                      <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                      <Flex
                        align="center"
                        justify="flex-end"
                        gap={8}
                        style={{ position: 'absolute', bottom: 16, width: 'calc(100% - 20px)', left: 0 }}
                      >
                        {/* <Button onClick={() => setSelectedData(item)}>Xem nhanh</Button> */}
                        <Button type="primary" onClick={() => navigate(`/duancntt/${item.id}`)}>
                          <BsBoxArrowRight size={22} />
                        </Button>
                      </Flex>
                    </div>
                  ))}
                </Col>
              )}

              {/* <Col span={12} style={{ background: colors.red[100], borderRadius: 10, padding: 10 }}>
                <div
                  style={{
                    fontSize: 16,
                    color: colors.red[600],
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    marginBottom: 10
                  }}
                >
                  Dự án hết hạn
                </div>

                {data
                  .filter(ele => dayjs(ele.ngay_het_hop_dong).diff(dayjs(new Date())) < 0)
                  .map(ele => (
                    <Flex
                      key={ele.id}
                      align="center"
                      justify="space-between"
                      style={{ paddingBottom: 4, marginBottom: 10, borderBottom: '1px solid #eee', gap: 10 }}
                    >
                      <Flex align="center">
                        <FaDotCircle size={10} color={colors.red[400]} style={{ minWidth: 10 }} />
                        <div style={{ marginLeft: 10, flexShrink: '1' }}>
                          <div style={{ color: colors.blue[700], marginBottom: 4 }}>
                            {DANH_MUC.current.don_vi_ky_ket.find(donvi => donvi.id === ele.don_vi_ky_ket[0]).name}
                          </div>
                          <div style={{ color: colors.blue[800], fontWeight: 600 }}>{ele.ten_du_an}</div>
                        </div>
                      </Flex>
                      <div style={{ minWidth: 'max-content' }}>
                        <div style={{ color: colors.red[600], marginBottom: 4, fontSize: 16, fontWeight: 700 }}>
                          {dayjs(ele.ngay_het_hop_dong).format('DD/MM/YYYY')}
                        </div>
                        <div style={{ color: colors.red[500], marginBottom: 4, fontWeight: 600 }}>
                          Quá hạn: {dayjs(new Date()).diff(ele.ngay_het_hop_dong, 'days')} ngày
                        </div>
                      </div>
                    </Flex>
                  ))}
              </Col> */}
            </Row>

            <div style={{ height: 10 }}></div>

            {/* <Row gutter={16}>
              <Col span={16}>
                <Table
                  rowClassName={record => (record.id === 99999 ? 'total-row' : '')}
                  dataSource={[
                    ...DANH_MUC.current.don_vi_ky_ket.filter(ele => ele.id !== 63),
                    {
                      name: 'TỔNG DỰ ÁN',
                      id: 99999
                    },
                    {
                      name: 'TỔNG DOANH THU',
                      id: 88888
                    }
                  ]}
                  pagination={false}
                  size="small"
                  onRow={record => {
                    return {
                      onClick: () => {
                        if ([99999, 88888].includes(record.id)) return;
                        navigate(`/duancaphuyen/${record.id}`);
                      }
                    };
                  }}
                  columns={[
                    {
                      title: 'STT',
                      dataIndex: 'name',
                      key: 'name',
                      width: 60,
                      align: 'center',
                      render: (text, row, id) =>
                        ![99999, 88888].includes(row.id) ? <div style={{ fontWeight: 500 }}>{id + 1}</div> : <>{ }</>
                    },
                    {
                      title: 'Đơn vị',
                      dataIndex: 'name',
                      key: 'name',
                      render: (text, row) =>
                        [99999, 88888].includes(row.id) ? (
                          <div style={{ fontWeight: 700, textAlign: 'center' }}>{text}</div>
                        ) : (
                          <div style={{ fontWeight: 500 }}>{text}</div>
                        )
                    },
                    ...DANH_MUC.current.nhom_dich_vu.map(dv => {
                      return {
                        title: dv.name,
                        key: dv.id,
                        align: 'center',
                        render: (value, row) => {
                          const VALUE_DATA = data.filter(
                            ele => ele.don_vi_ky_ket.includes(row.id) && ele.nhom_dich_vu === dv.id
                          ).length;
                          const VALUE_COST = formatCash(
                            data
                              .filter(ele => ele.nhom_dich_vu === dv.id)
                              .reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0)
                          );
                          if (row.id === 99999)
                            return (
                              <div style={{ fontWeight: 700 }}>
                                {data.filter(ele => ele.nhom_dich_vu === dv.id).length}
                              </div>
                            );
                          if (row.id === 88888) return <div style={{ fontWeight: 600 }}>{VALUE_COST}</div>;
                          return (
                            <div style={{ fontWeight: VALUE_DATA ? 600 : 400 }}>{VALUE_DATA ? VALUE_DATA : '-'}</div>
                          );
                        }
                      };
                    })
                  ]}
                ></Table>
              </Col>
            </Row> */}
          </>
        )}
      </StyledWrapper>
    </>
  );
}

DuAnCapHuyen.propTypes = {};

export default DuAnCapHuyen;
