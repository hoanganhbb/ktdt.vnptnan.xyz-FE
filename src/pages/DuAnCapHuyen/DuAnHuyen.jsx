import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';
import { Button, Col, Flex, Row, Spin, Tag, Typography } from 'antd';
import { formatCash } from '../../utils/constant';
import moment from 'moment';
import dayjs from 'dayjs';
import { BsBoxArrowRight } from 'react-icons/bs';
import { colors } from '../../utils/theme';
import { IoHomeSharp } from 'react-icons/io5';
import { selectorDuAnCapHuyenConHieuLuc } from '../../utils';

function DuAnHuyen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const DANH_MUC = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get(`api/duancntt/?don_vi_ky_ket=${id}`)])
      .then(response => {
        console.log(response);
        DANH_MUC.current = response[0].data;
        setData(selectorDuAnCapHuyenConHieuLuc(response[1].data));
        // setFilterData(response[1].data);
      })
      .catch(e => toast.error(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      <Flex
        align="center"
        style={{ marginBottom: 10, borderRadius: 10, background: colors.white, padding: '10px 16px', gap: 16 }}
      >
        <IoHomeSharp size={24} color={colors.blue[800]} style={{ cursor: 'pointer' }} onClick={() => navigate(-1)} />
        {DANH_MUC.current && DANH_MUC.current.don_vi_ky_ket && (
          <div style={{ fontWeight: 600, color: colors.blue[800], fontSize: 16 }}>
            Dự án cấp huyện ({DANH_MUC.current.don_vi_ky_ket.find(e => e.id == id).name})
          </div>
        )}
      </Flex>
      {data && !!data.length && (
        <Row gutter={16}>
          {data
            .sort((a, b) => b.gia_tri_hop_dong - a.gia_tri_hop_dong)
            .map((item, idx) => (
              <Col
                xs={24}
                sm={12}
                md={12}
                lg={8}
                xl={data.length > 3 ? 6 : 8}
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
                  {item.ngay_ky_hop_dong && (
                    <Flex align="center" justify="space-between" style={{ textAlign: 'right' }}>
                      <div>Ngày ký HĐ:</div>
                      <Typography.Text> {dayjs(item.ngay_ky_hop_dong).format('DD/MM/YYYY')}</Typography.Text>
                    </Flex>
                  )}
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
      )}
    </>
  );
}

DuAnHuyen.propTypes = {};

export default DuAnHuyen;
