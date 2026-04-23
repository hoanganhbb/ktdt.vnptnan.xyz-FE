import React, { useState, useEffect, useRef } from 'react';
import requestAPI from '../../utils/requestAPI';
import { useNavigate } from 'react-router-dom';
import { Col, Table, Typography, Row, Tag, Flex, Input, Button, Drawer, Spin, Divider } from 'antd';
import { HomeWrapper } from './styled';
import { formatCash } from '../../utils/constant';
import moment from 'moment';
import { BsFillGrid3X3GapFill, BsBoxArrowRight } from 'react-icons/bs';
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
  const [selectedData, setSelectedData] = useState();
  // const [textSearch, setTextSearch] = useState('');
  const [filterCondition, setFilterCondition] = useState({
    textSearch: '',
    linhVucDuAn: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get('api/duancntt/?cap_du_an=9')])
      .then(response => {
        DANH_MUC.current = response[0].data;
        console.log(response[1].data);
        const newData = selectorDuAnCapTinhConHieuLuc(response[1].data);
        setData(newData);
        setFilterData(newData);
        // if (response[0].data.me.don_vi !== 'VNPT Nghệ An') navigate('/baocao/cntt-dia-ban')
      })
      .catch(e => toast.error(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(filterCondition);
    let resutSearchText = [];
    if (filterCondition.textSearch || filterCondition.textSearch.length >= 3) resutSearchText = [...data];
    resutSearchText = data.filter(
      item =>
        item.ten_du_an.toLowerCase().includes(filterCondition.textSearch.toLowerCase()) ||
        item.ten_viet_tat.toLowerCase().includes(filterCondition.textSearch.toLowerCase())
    );
    let resutSearchType = [...resutSearchText];
    if (filterCondition.linhVucDuAn)
      resutSearchType = resutSearchText.filter(ele => ele.linh_vuc_du_an.includes(filterCondition.linhVucDuAn));
    setFilterData(resutSearchType);
  }, [filterCondition]);

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
        toast.error('Có lỗi xảy ra trong quá trình xuất excel');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <HomeWrapper>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      <Flex align="center" justify="space-between">
        <div style={{ width: '100%' }}>
          <Typography.Title level={4} style={{ margin: 0, textTransform: 'uppercase' }}>
            Quản lý dự án công nghệ thông tin ({data?.length})
          </Typography.Title>
          <div>
            <Typography.Text style={{ fontStyle: 'italic', fontSize: 12 }}>
              (Mặc định sắp xếp theo ngày ký)
            </Typography.Text>
          </div>
        </div>
        <div style={{ margin: '0 30px' }}></div>
        <Flex align="center" gap={6} style={{ width: '100%' }}>
          <Input
            style={{
              borderRadius: 8,
              height: 37,
              marginRight: 20
            }}
            allowClear
            value={filterCondition.textSearch}
            onChange={e =>
              setFilterCondition({
                ...filterCondition,
                textSearch: e.target.value
              })
            }
            placeholder="Tìm kiếm dự án"
          ></Input>
          <Flex
            align="center"
            justify="center"
            style={{
              padding: 4,
              borderRadius: 8,
              background: indexView === 1 ? '#1A365D' : 'transparent',
              height: 30,
              width: 30,
              color: indexView === 1 ? 'white' : '#1A365D',
              cursor: 'pointer'
            }}
          >
            <BsFillGrid3X3GapFill size={20} onClick={() => setIndexView(1)} />
          </Flex>

          <Button type="primary" style={{ fontWeight: 500 }} onClick={() => navigate(`/duancntt/create`)}>
            Thêm dự án
          </Button>
          <Button type="primary" icon={<FaDownload />} style={{ fontWeight: 500 }} onClick={handleExport}>
            Xuất Excel
          </Button>
        </Flex>
      </Flex>

      <div style={{ background: '#EDF2F7', margin: '8px 0', height: 1 }}></div>

      {data && !!data.length && (
        <>
          <Row gutter={16} style={{}}>
            {/* <Col xs={24} sm={8} md={8} lg={6} xl={2} className="gutter-row" style={{ marginBottom: 10 }}>
              <div
                style={{
                  background: '#EBF8FF',
                  borderRadius: 10,
                  padding: 12,
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  height: '100%'
                }}
              >
                <p style={{ textAlign: 'center', fontSize: 40, color: '#234E52', fontWeight: 700, margin: '10px 0' }}>
                  {data.length}
                </p>
                <p style={{ textAlign: 'center', color: '#234E52', fontWeight: 600 }}>DỰ ÁN</p>
              </div>
            </Col> */}

            <Col
              className="gutter-row"
              style={{ marginBottom: 10, cursor: 'pointer' }}
              span={3}
              onClick={() => {
                setFilterCondition({
                  ...filterCondition,
                  linhVucDuAn: null
                });
              }}
            >
              <div
                style={{
                  background: '#F0FFF4',
                  borderRadius: 10,
                  padding: 10,
                  boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                  height: '100%'
                }}
              >
                <p style={{ textAlign: 'center', fontSize: 32, color: '#234E52', fontWeight: 700, margin: '10px 0' }}>
                  {formatCash(
                    data.reduce((acc, currentValue) => acc + currentValue.gia_tri_hop_dong, 0),
                    true
                  )}
                </p>
                <p style={{ textAlign: 'center', color: '#234E52', fontWeight: 600, fontSize: 14 }}>TỔNG DOANH THU</p>
              </div>
            </Col>

            {DANH_MUC.current &&
              data &&
              DANH_MUC.current.linh_vuc_du_an
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
                        padding: 10,
                        border: '1px solid #e9e9e9',
                        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                        height: '100%',
                        width: 160,
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
                        <div style={{ textAlign: 'center', fontWeight: 600, fontSize: 16 }}>{ele.name}</div>
                      </Flex>
                      <Flex justify="space-between" align="center">
                        <FaWallet size={26} color={colors.blue[200]} />
                        <p style={{ textAlign: 'center', fontSize: 20, fontWeight: 600, margin: '10px 0' }}>
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
          <Flex style={{ background: 'white', padding: 12, borderRadius: 6, position: 'relative' }} gap={20}>
            <div
              style={{
                width: '100%',
                height: 1,
                background: colors.blackAlpha[300],
                position: 'absolute',
                top: '49%'
              }}
            ></div>
            {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027].map((ele, index) => (
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
                  padding: 8,
                  borderRadius: 10,
                  minWidth: 100
                }}
              >
                <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[900], marginBottom: 10 }}>{ele}</div>
                <div
                  style={{
                    fontWeight: 800,
                    fontSize: 20,
                    color: colors.blue[900],
                    position: 'absolute',
                    width: 10,
                    height: 10,
                    background: colors.blue[800],
                    left: '50%',
                    top: '45%',
                    borderRadius: 9999,
                    transform: 'translateX(-50%)'
                  }}
                ></div>
                <div style={{ fontWeight: 700, fontSize: 16, marginTop: 16 }}>
                  {calculateSumIncomeCapTinh(data, ele)}
                </div>
              </Flex>
            ))}
          </Flex>
        </>
      )}

      {indexView === 1 ? (
        <>
          <Divider
            orientation="left"
            style={{ color: colors.blue[800], borderColor: colors.blue[800], marginBottom: 6, fontSize: 16 }}
          >
            HỢP ĐỒNG ĐÃ KÝ ({filterData.filter(ele => ele.trang_thai_hop_dong === 6).length})
          </Divider>
          <Row gutter={16}>
            {filterData
              .filter(ele => ele.trang_thai_hop_dong === 6)
              .map((item, idx) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                  key={idx}
                  className="gutter-row"
                  style={{ marginBottom: 10 }}
                >
                  <div
                    style={{
                      background: 'white',
                      borderRadius: 10,
                      padding: 12,
                      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                      height: '100%',
                      paddingBottom: 60
                    }}
                  >
                    <Flex justify="space-between">
                      <div style={{ fontSize: 16, fontWeight: 600, color: '#718999' }}>{item.ten_viet_tat}</div>
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
                      <Typography.Text style={{ fontWeight: 500, letterSpacing: 0 }}>
                        {item.ten_du_an}{' '}
                        {DANH_MUC && !!DANH_MUC.current.trang_thai_hop_dong.length && (
                          <Tag color={item.trang_thai_hop_dong === 6 ? 'green' : 'red'} style={{ fontSize: 13 }}>
                            {DANH_MUC.current.trang_thai_hop_dong.find(ele => ele.id === item.trang_thai_hop_dong).name}
                          </Tag>
                        )}
                      </Typography.Text>
                    </div>
                    {/* {JSON.stringify(item.linh_vuc_du_an)} */}
                    {/* {JSON.stringify(DANH_MUC.current?.linh_vuc_du_an)} */}
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
                      <Typography.Title level={5} style={{ margin: 0, color: '#2C5282' }}>
                        {formatCash(item.gia_tri_hop_dong)} đ
                      </Typography.Title>
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
                          {moment(item.ngay_het_hop_dong).diff(moment(item.ngay_bat_dau_hop_dong), 'months') + 1} tháng
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
                      style={{ position: 'absolute', bottom: 16, width: 'calc(100% - 24px)', left: 0 }}
                    >
                      {/* <Button onClick={() => setSelectedData(item)}>Xem nhanh</Button> */}
                      <Button type="primary" onClick={() => navigate(`/duancntt/${item.id}`)}>
                        <BsBoxArrowRight size={22} />
                      </Button>
                    </Flex>
                  </div>
                </Col>
              ))}
          </Row>
          <Divider
            orientation="left"
            style={{ color: colors.blue[800], borderColor: colors.blue[800], marginBottom: 6 }}
          >
            HỢP ĐỒNG CHƯA KÝ ({filterData.filter(ele => ele.trang_thai_hop_dong === 5).length})
          </Divider>
          <Row gutter={16}>
            {filterData
              .filter(ele => ele.trang_thai_hop_dong === 5)
              .map((item, idx) => (
                <Col
                  xs={24}
                  sm={12}
                  md={12}
                  lg={8}
                  xl={6}
                  xxl={4}
                  key={idx}
                  className="gutter-row"
                  style={{ marginBottom: 10 }}
                >
                  <div
                    style={{
                      background: 'white',
                      borderRadius: 10,
                      padding: 12,
                      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
                      height: '100%',
                      paddingBottom: 60
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
                      <Typography.Text style={{ fontWeight: 500, letterSpacing: 0 }}>
                        {item.ten_du_an}{' '}
                        {DANH_MUC && !!DANH_MUC.current.trang_thai_hop_dong.length && (
                          <Tag color={item.trang_thai_hop_dong === 6 ? 'green' : 'red'} style={{ fontSize: 13 }}>
                            {DANH_MUC.current.trang_thai_hop_dong.find(ele => ele.id === item.trang_thai_hop_dong).name}
                          </Tag>
                        )}
                      </Typography.Text>
                    </div>
                    {/* {JSON.stringify(item.linh_vuc_du_an)} */}
                    {/* {JSON.stringify(DANH_MUC.current?.linh_vuc_du_an)} */}
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
                      <Typography.Title level={5} style={{ margin: 0, color: '#2C5282' }}>
                        {formatCash(item.gia_tri_hop_dong)} đ
                      </Typography.Title>
                    </Flex>
                    <div style={{ background: '#EDF2F7', margin: '6px 0', height: 1 }}></div>
                    <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                      <div>Số tháng:</div>
                      {item.ngay_het_hop_dong ? (
                        <div style={{ fontWeight: 600 }}>
                          {moment(item.ngay_het_hop_dong).diff(moment(item.ngay_bat_dau_hop_dong), 'months') + 1} tháng
                        </div>
                      ) : (
                        ''
                      )}
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
                      style={{ position: 'absolute', bottom: 16, width: 'calc(100% - 24px)', left: 0 }}
                    >
                      {/* <Button onClick={() => setSelectedData(item)}>Xem nhanh</Button> */}
                      <Button type="primary" onClick={() => navigate(`/duancntt/${item.id}`)}>
                        <BsBoxArrowRight size={22} />
                      </Button>
                    </Flex>
                  </div>
                </Col>
              ))}
          </Row>
        </>
      ) : (
        <Table
          dataSource={filterData}
          pagination={false}
          rowKey="id"
          columns={[
            {
              title: 'STT',
              dataIndex: 'id',
              key: 'id',
              align: 'center'
            },
            {
              title: 'Tên viết tắt',
              dataIndex: 'ten_viet_tat',
              key: 'ten_viet_tat',
              width: 160,
              render: (value, row) => (
                <>
                  {value}
                  {row.trang_thai_hop_dong === 6 && (
                    <div>
                      <Typography.Text strong style={{ color: 'green', fontSize: 14 }}>
                        Đã ký HĐ
                      </Typography.Text>
                    </div>
                  )}
                </>
              )
            },
            {
              title: 'Tên dự án',
              dataIndex: 'ten_du_an',
              key: 'ten_du_an',
              render: (value, row) => (
                <div onClick={() => navigate(`/duancntt/${row.id}`)}>
                  <div>
                    <Typography.Text>Chủ đầu tư: {row.chu_dau_tu}</Typography.Text>
                  </div>
                  <Typography.Text strong>{value}</Typography.Text>
                  {!!row.nhiem_vu_du_an.length && (
                    <ul style={{ margin: '6px 0' }}>
                      <li>
                        <Typography.Text strong style={{ color: '#0D47A1' }}>
                          Nhiệm vụ sắp tới:{' '}
                          {row.nhiem_vu_du_an.filter(item => item.trang_thai_nhiem_vu_cntt === 8)[0].noi_dung} | Thời
                          hạn:{' '}
                          {row.nhiem_vu_du_an.filter(item => item.trang_thai_nhiem_vu_cntt === 8)[0].ngay_hoan_thanh}
                        </Typography.Text>
                      </li>
                    </ul>
                  )}
                </div>
              )
            },
            {
              title: 'Giá trị',
              dataIndex: 'gia_tri_hop_dong',
              key: 'gia_tri_hop_dong',
              width: 120,
              render: value => <>{value ? `${formatCash(value)}` : '---'}</>
            }
          ]}
        ></Table>
      )}
      <Drawer title={selectedData?.ten_du_an} onClose={() => setSelectedData()} open={!!selectedData} width={700}>
        <pre>{JSON.stringify(selectedData, null, 2)}</pre>
      </Drawer>
    </HomeWrapper>
  );
}
