import React, { useEffect, useState, useRef } from 'react';
import { Row, Typography, Col, Flex, Spin, Tag, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';

import { InfomationProjectsWrapper } from './styled';

import { colors } from '../../utils/theme';
import requestAPI from '../../utils/requestAPI';
import { formatCash } from '../../utils/constant';
// import ListTarget from './ListTarget';
// import Progress from './Progress';

import { BsFileEarmarkPdfFill, BsFillPencilFill } from 'react-icons/bs';
import { ArrowLeft } from 'react-bootstrap-icons';
import { MdDownload } from 'react-icons/md';
import { BiSolidQuoteLeft } from 'react-icons/bi';
import FormDoanhThu from './FormDoanhThu';

function InfomationProjects() {
  const navigate = useNavigate();
  const { id } = useParams();
  const DANH_MUC = useRef();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShowFormDoanhThu, setIsShowFormDoanhThu] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([
      requestAPI.get(`api/profile/`),
      requestAPI.get(`/api/duancntt/${id}`),
      new Promise(resolve => setTimeout(resolve, 500))
    ])
      .then(response => {
        DANH_MUC.current = response[0].data;
        setData(response[1]?.data);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  };

  const handleDownload = tailieu => {
    setIsLoading(true);
    requestAPI
      .get(`api/duancntt/tailieu/${tailieu.id}/download`, {
        responseType: 'blob'
      })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${tailieu.ten_tai_lieu}.${tailieu.file_name}`);
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfomationProjectsWrapper>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      {data && (
        <>
          <div
            style={{
              background: 'white',
              borderRadius: 10,
              padding: '0 10px',
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
            }}
          >
            <Flex align="center" justify="">
              <Flex
                align="center"
                justify="center"
                style={{ width: 35, height: 35, cursor: 'pointer' }}
                onClick={() => navigate(-1)}
              >
                <ArrowLeft size={20} color={colors.primary}></ArrowLeft>
              </Flex>
              <Flex align="center" justify="flex-start" style={{ width: '100%', padding: '10px 16px' }}>
                <Typography.Title level={4} style={{ margin: 0, color: colors.primary }}>
                  {data?.ten_du_an}
                </Typography.Title>
              </Flex>
              <Flex style={{ cursor: 'pointer', gap: 16, alignItems: 'center', padding: '0 10px' }}>
                <Button onClick={() => setIsShowFormDoanhThu(true)}>Doanh thu dự kiến</Button>
                <Flex style={{ cursor: 'pointer' }} onClick={() => navigate(`/duancntt/update/${id}`)}>
                  <BsFillPencilFill color="#2C5282" size={18} />
                </Flex>
              </Flex>
            </Flex>

            <div style={{ background: '#E2E8F0', margin: '0px 0', height: 1 }}></div>

            <Row gutter={16} style={{ padding: 10 }}>
              <Col className="gutter-row" xs={24} sm={12} md={8} style={{ fontSize: 15 }}>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Tên viết tắt: </span>
                  <span>{data?.ten_viet_tat}</span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Chủ đầu tư: </span>
                  <span>{data?.chu_dau_tu}</span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Lĩnh vực: </span>
                  {DANH_MUC.current &&
                    DANH_MUC.current?.linh_vuc_du_an
                      .filter(element => data.linh_vuc_du_an.includes(element.id))
                      .map(ele => <span key={ele.id}>{ele.name}</span>)}
                  {/* <span>{data?.linh_vuc_du_an.join(', ')}</span> */}
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Số hợp đồng: </span>
                  <span>{data?.so_hop_dong}</span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Ngày ký kết hợp đồng: </span>
                  <span>{data?.ngay_hop_dong ? dayjs(data?.ngay_hop_dong).format('DD/MM/YYYY') : ''}</span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Ngày bắt đầu hợp đồng: </span>
                  <span>
                    {data?.ngay_bat_dau_hop_dong ? dayjs(data?.ngay_bat_dau_hop_dong).format('DD/MM/YYYY') : ''}
                  </span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Ngày hết hạn hợp đồng: </span>
                  <span>{data?.ngay_het_hop_dong ? dayjs(data?.ngay_het_hop_dong).format('DD/MM/YYYY') : ''}</span>
                </Flex>
              </Col>

              <Col className="gutter-row" xs={24} sm={12} md={8} style={{ fontSize: 15 }}>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #ccc', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Giá trị hợp đồng: </span>
                  <span>{data?.gia_tri_hop_dong ? formatCash(data?.gia_tri_hop_dong) + ' VNĐ' : ''}</span>
                </Flex>

                <div style={{ height: 10 }}></div>

                {/* <Flex
                    style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                    justify="space-between"
                  >
                    <span style={{ fontWeight: 600 }}>Giá trị thiết bị/đào tạo: </span>
                    <span>
                      {data?.gia_tri_thiet_bi_truoc_VAT ? formatCash(data?.gia_tri_thiet_bi_truoc_VAT) + ' VNĐ' : ''}
                    </span>
                  </Flex> */}

                {/* <Flex
                    style={{ marginBottom: 6, borderBottom: '1px solid #ccc', paddingBottom: 2 }}
                    justify="space-between"
                  >
                    <span style={{ fontWeight: 600 }}>VAT thiết bị/đào tạo: </span>
                    <span>{data?.gia_tri_VAT_thiet_bi ? formatCash(data?.gia_tri_VAT_thiet_bi) + ' VNĐ' : ''}</span>
                  </Flex> */}

                {/* <Flex
                    style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                    justify="space-between"
                  >
                    <span style={{ fontWeight: 600 }}>Giá trị thuê dịch vụ: </span>
                    <span>
                      {data?.gia_tri_hop_dong_truoc_VAT ? formatCash(data?.gia_tri_hop_dong_truoc_VAT) + ' VNĐ' : ''}
                    </span>
                  </Flex>

                  <Flex
                    style={{ marginBottom: 6, borderBottom: '1px solid #ccc', paddingBottom: 2 }}
                    justify="space-between"
                  >
                    <span style={{ fontWeight: 600 }}>VAT thuê dịch vụ: </span>
                    <span>{data?.gia_tri_hop_dong_VAT ? formatCash(data?.gia_tri_hop_dong_VAT) + ' VNĐ' : ''}</span>
                  </Flex> */}

                {/* <Flex
                    style={{ marginBottom: 6, borderBottom: '1px solid #ccc', paddingBottom: 2 }}
                    justify="space-between"
                  >
                    <span style={{ fontWeight: 600 }}>TỔNG GIÁ TRỊ HĐ: </span>
                    <span>
                      {formatCash(
                        data?.gia_tri_thiet_bi_truoc_VAT +
                        data?.gia_tri_VAT_thiet_bi +
                        data?.gia_tri_hop_dong_truoc_VAT +
                        data?.gia_tri_hop_dong_VAT
                      )}{' '}
                      VNĐ
                    </span>
                  </Flex> */}

                <div style={{ height: 18 }}></div>

                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Chi phí nội bộ: </span>
                  <span>{data?.gia_tri_hop_dong ? formatCash(data?.chi_phi_noi_bo) + ' VNĐ' : ''}</span>
                </Flex>
                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Thời hạn hợp đồng: </span>
                  <span>
                    {/* {dayjs(data?.ngay_het_hop_dong).format()} */}
                    {data?.ngay_bat_dau_hop_dong && data?.ngay_het_hop_dong
                      ? dayjs(data?.ngay_het_hop_dong).diff(dayjs(data?.ngay_bat_dau_hop_dong), 'month') + 1 + ' tháng'
                      : ''}
                  </span>
                </Flex>

                <Flex
                  style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                  justify="space-between"
                >
                  <span style={{ fontWeight: 600 }}>Trạng thái hợp đồng: </span>
                  <span>
                    {DANH_MUC && !!DANH_MUC.current.trang_thai_hop_dong.length && (
                      <Tag color={data.trang_thai_hop_dong === 6 ? 'green' : 'red'} style={{ fontSize: 13 }}>
                        {DANH_MUC.current.trang_thai_hop_dong.find(ele => ele.id === data.trang_thai_hop_dong).name}
                      </Tag>
                    )}
                  </span>
                </Flex>

                {data.doanh_thu_du_kien &&
                  !!data.doanh_thu_du_kien.length &&
                  data.doanh_thu_du_kien
                    .sort((a, b) => a.nam - b.nam)
                    .map(ele => (
                      <Flex
                        key={ele.id}
                        style={{ marginBottom: 6, borderBottom: '1px solid #eeeeee', paddingBottom: 2 }}
                        justify="space-between"
                      >
                        <span style={{ fontWeight: 600 }}>Năm {ele.nam}: </span>
                        <span>{formatCash(ele.gia_tri)} VNĐ</span>
                      </Flex>
                    ))}
              </Col>
              <Col span={8}>
                <div style={{ marginBottom: 4 }}>
                  <div style={{ fontWeight: 600, marginBottom: 6 }}>Tài liệu đính kèm: </div>
                  {data.tai_lieu?.map(tailieu => (
                    <a
                      // href={`api/duancntt/tailieu/${tailieu.id}/download`}
                      target="_blank"
                      rel="noreferrer"
                      key={tailieu.id}
                      onClick={() => handleDownload(tailieu, id)}
                    >
                      <Flex
                        align="center"
                        style={{ marginBottom: 10, borderBottom: '1px solid #E2E8F0', paddingBottom: 4 }}
                        justify="space-between"
                      >
                        <Flex align="center">
                          <BsFileEarmarkPdfFill size={28} color="#2C5282" style={{ marginRight: 4 }} />
                          <div>
                            <div style={{ fontWeight: 500 }}>{tailieu.ten_tai_lieu ? tailieu.ten_tai_lieu : '---'}</div>
                          </div>
                        </Flex>
                        <MdDownload size={22} />
                      </Flex>
                    </a>
                  ))}
                </div>
              </Col>
            </Row>

            {data.tom_tat_quy_mo && <Row gutter={16} style={{ padding: 10, paddingTop: 10 }}></Row>}

            <Row gutter={16} style={{ padding: 10, paddingTop: 0 }}>
              {data.tom_tat_quy_mo && (
                <Col span={12}>
                  <div
                    style={{
                      fontWeight: 500,
                      textAlign: 'justify',
                      fontSize: 15,
                      color: colors.blue[800],
                      lineHeight: 1.4,
                      background: colors.white,
                      padding: 10,
                      border: '1px solid #9999',
                      borderRadius: 10,
                      position: 'relative'
                    }}
                  >
                    <BiSolidQuoteLeft
                      color={colors.green[500]}
                      size={30}
                      style={{ position: 'absolute', left: 10, background: colors.white, top: -16 }}
                    />
                    {data?.tom_tat_quy_mo}
                  </div>
                </Col>
              )}

              <Col span={12}>
                {data?.kho_khan && (
                  <div style={{ backgroundColor: colors.red[100], borderRadius: 10, marginBottom: 10 }}>
                    <div
                      style={{
                        color: colors.white,
                        padding: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontWeight: 600,
                        background: colors.red[300]
                      }}
                    >
                      Khó khăn
                    </div>
                    <div
                      style={{
                        padding: 10,
                        fontWeight: 500
                      }}
                    >
                      {data?.kho_khan}
                    </div>
                  </div>
                )}
                {data?.ton_tai && (
                  <div style={{ backgroundColor: colors.red[100], borderRadius: 10 }}>
                    <div
                      style={{
                        color: colors.white,
                        padding: 10,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                        fontWeight: 600,
                        background: colors.red[300]
                      }}
                    >
                      Tồn tại
                    </div>
                    <div
                      style={{
                        padding: 10,
                        fontWeight: 500
                      }}
                    >
                      {data?.ton_tai}
                    </div>
                  </div>
                )}
              </Col>
            </Row>
          </div>

          <div style={{ height: 10 }}></div>

          {/* <ListTarget
              nhiem_vu_du_an={data?.nhiem_vu_du_an.sort(
                (a, b) => new Date(a.ngay_hoan_thanh) - new Date(b.ngay_hoan_thanh)
              )}
              id={data.id}
            />

            <div style={{ height: 10 }}></div>

            <Progress
              tien_do_du_an={data?.tien_do_du_an.sort(
                (a, b) => dayjs(a.ngay_hoan_thanh).diff(dayjs(b.ngay_hoan_thanh), 'month') > 0
              )}
              id={data.id}
            /> */}
          {/* <ThueBaoOneBSS duancntt={data.id}></ThueBaoOneBSS> */}
        </>
      )}
      {isShowFormDoanhThu && (
        <FormDoanhThu
          data={data}
          onClose={() => setIsShowFormDoanhThu(false)}
          onFinish={() => {
            fetchData();
            setIsShowFormDoanhThu(false);
          }}
        />
      )}
    </InfomationProjectsWrapper>
  );
}

export default InfomationProjects;
