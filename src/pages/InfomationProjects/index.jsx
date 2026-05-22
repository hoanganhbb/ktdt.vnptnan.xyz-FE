import React, { useEffect, useState, useRef } from 'react';
import { Row, Typography, Col, Flex, Spin, Tag, Button, Timeline } from 'antd';
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
import { steps } from '../../utils';

const InfoLine = ({ label, value, tone = 'default' }) => (
  <Flex className={`info-line ${tone === 'strong' ? 'strong' : ''}`} justify="space-between" gap={12}>
    <span className="label">{label}</span>
    <span className="value">{value || '---'}</span>
  </Flex>
);

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
      requestAPI.get('api/profile/'),
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

  const linhVucNames =
    DANH_MUC.current?.linh_vuc_du_an
      ?.filter(element => data?.linh_vuc_du_an?.includes(element.id))
      .map(ele => ele.name)
      .join(', ') || '---';

  const trangThaiHopDong =
    DANH_MUC.current?.trang_thai_hop_dong?.find(ele => ele.id === data?.trang_thai_hop_dong)?.name || '---';

  const currentStepValue = Number(data?.buoc_thuc_hien || 0);
  const currentStep = steps.find(step => step.value === currentStepValue);

  return (
    <InfomationProjectsWrapper>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen />
      {data && (
        <>
          <div className="project-shell">
            <Flex align="center" justify="space-between" className="project-header" wrap="wrap" gap={10}>
              <Flex align="center" className="project-header-left" gap={10}>
                <button className="back-btn" type="button" onClick={() => navigate(-1)}>
                  <ArrowLeft size={18} color={colors.primary} />
                </button>
                <Typography.Title level={4} className="project-title">
                  {data.ten_du_an}
                </Typography.Title>
              </Flex>

              <Flex className="project-actions" align="center" gap={10}>
                <Button type="primary" ghost onClick={() => setIsShowFormDoanhThu(true)}>
                  Doanh thu dự kiến
                </Button>
                <button className="edit-btn" type="button" onClick={() => navigate(`/duancntt/update/${id}`)}>
                  <BsFillPencilFill color="#2C5282" size={18} />
                </button>
              </Flex>
            </Flex>

            <div className="project-divider"></div>

            <Row gutter={[16, 16]} className="info-grid">
              <Col xs={24} md={12} lg={8}>
                <div className="info-card">
                  <InfoLine label="Tên viết tắt" value={data.ten_viet_tat} />
                  <InfoLine label="Chủ đầu tư" value={data.chu_dau_tu} />
                  <InfoLine label="Lĩnh vực" value={linhVucNames} />
                  <InfoLine label="Số hợp đồng" value={data.so_hop_dong} />
                  <InfoLine
                    label="Ngày ký kết hợp đồng"
                    value={data.ngay_hop_dong ? dayjs(data.ngay_hop_dong).format('DD/MM/YYYY') : ''}
                  />
                  <InfoLine
                    label="Ngày bắt đầu hợp đồng"
                    value={data.ngay_bat_dau_hop_dong ? dayjs(data.ngay_bat_dau_hop_dong).format('DD/MM/YYYY') : ''}
                  />
                  <InfoLine
                    label="Ngày hết hạn hợp đồng"
                    value={data.ngay_het_hop_dong ? dayjs(data.ngay_het_hop_dong).format('DD/MM/YYYY') : ''}
                  />
                </div>
              </Col>

              <Col xs={24} md={12} lg={8}>
                <div className="info-card">
                  <InfoLine
                    label="Giá trị hợp đồng"
                    value={data.gia_tri_hop_dong ? `${formatCash(data.gia_tri_hop_dong)} VNĐ` : ''}
                    tone="strong"
                  />
                  <InfoLine
                    label="Chi phí nội bộ"
                    value={data.chi_phi_noi_bo ? `${formatCash(data.chi_phi_noi_bo)} VNĐ` : ''}
                  />
                  <InfoLine
                    label="Thời hạn hợp đồng"
                    value={
                      data.ngay_bat_dau_hop_dong && data.ngay_het_hop_dong
                        ? `${dayjs(data.ngay_het_hop_dong).diff(dayjs(data.ngay_bat_dau_hop_dong), 'month') + 1} tháng`
                        : ''
                    }
                  />

                  <Flex className="info-line" justify="space-between" gap={12}>
                    <span className="label">Trạng thái hợp đồng</span>
                    <span className="value">
                      <Tag color={data.trang_thai_hop_dong === 6 ? 'green' : 'red'}>{trangThaiHopDong}</Tag>
                    </span>
                  </Flex>

                  {data.doanh_thu_du_kien &&
                    !!data.doanh_thu_du_kien.length &&
                    data.doanh_thu_du_kien
                      .sort((a, b) => a.nam - b.nam)
                      .map(ele => (
                        <InfoLine key={ele.id} label={`Năm ${ele.nam}`} value={`${formatCash(ele.gia_tri)} VNĐ`} />
                      ))}
                </div>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <div className="info-card">
                  <div className="step-header">
                    <div className="step-current-number">{currentStepValue || '---'}</div>
                    <div>
                      <div className="step-header-label">Bước thực hiện hiện tại</div>
                      <div className="step-header-name">{currentStep?.name || 'Chưa cập nhật bước thực hiện'}</div>
                    </div>
                  </div>

                  <div style={{ marginLeft: 12 }}>
                    <Timeline className="project-steps-timeline" mode="left">
                      {[...steps]
                        .sort((a, b) => a.value - b.value)
                        .map(step => {
                          const status =
                            step.value < currentStepValue
                              ? 'done'
                              : step.value === currentStepValue
                                ? 'current'
                                : 'upcoming';

                          return (
                            <Timeline.Item
                              key={step.value}
                              className={`project-step-item ${status}`}
                              dot={<span className={`project-step-dot ${status}`}>{step.value}</span>}
                            >
                              <span className="project-step-name" style={{ marginLeft: 4 }}>
                                {step.name}
                              </span>
                            </Timeline.Item>
                          );
                        })}
                    </Timeline>
                  </div>
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 16]} className="bottom-grid">
              {data.tom_tat_quy_mo && (
                <Col xs={24} lg={12}>
                  <div className="quote-card">
                    <BiSolidQuoteLeft
                      color={colors.green[500]}
                      size={30}
                      style={{ position: 'absolute', left: 12, background: colors.white, top: -16 }}
                    />
                    {data.tom_tat_quy_mo}
                  </div>
                </Col>
              )}

              {data.kho_khan && data.ton_tai && (
                <Col xs={24} lg={12}>
                  <div className="alert-card" style={{ marginBottom: 10 }}>
                    <div className="alert-title">Khó khăn</div>
                    <div className="alert-content">{data.kho_khan}</div>
                  </div>

                  <div className="alert-card">
                    <div className="alert-title">Tồn tại</div>
                    <div className="alert-content">{data.ton_tai}</div>
                  </div>
                </Col>
              )}

              <Col xs={24} md={24} lg={12}>
                <div className="info-card file-card">
                  <div className="file-card-title">Tài liệu đính kèm</div>
                  {data.tai_lieu?.map(tailieu => (
                    <button
                      className="file-item"
                      type="button"
                      key={tailieu.id}
                      onClick={() => handleDownload(tailieu)}
                    >
                      <Flex align="center" justify="space-between" gap={12}>
                        <Flex align="center">
                          <BsFileEarmarkPdfFill size={24} color="#2C5282" style={{ marginRight: 8 }} />
                          <div>
                            <div className="file-name">{tailieu.ten_tai_lieu || '---'}</div>
                          </div>
                        </Flex>
                        <MdDownload size={20} color="#2C5282" />
                      </Flex>
                    </button>
                  ))}
                </div>
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
