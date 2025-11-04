import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../../components/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import requestAPI from '../../utils/requestAPI';
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Space, Spin } from 'antd';
import { colors } from '../../utils/theme';
import dayjs from 'dayjs';
import { BsFileEarmarkPdfFill, BsArrowLeft } from 'react-icons/bs';
import { IoIosSave } from 'react-icons/io';
import { FaFileCirclePlus, FaTrashCan } from 'react-icons/fa6';
import { BiDownload } from "react-icons/bi";
import UploadFile from './UploadFile';
import { toast } from 'sonner';

function FormDuAnCNTT() {
  const navigate = useNavigate();
  const { id } = useParams();
  const DANH_MUC = useRef();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);

  const fetchData = (slient = false) => {
    if (!slient) setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get(`/api/duancntt/${id}`)])
      .then(res => {
        DANH_MUC.current = res[0].data;
        setData(res[1].data);
        form.setFieldsValue({ ...res[1].data });
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 300)
      );
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmitForm = () => {
    setIsLoading(true);
    const body = { ...form.getFieldsValue() };
    requestAPI
      .patch(`api/duancntt/${id}`, body)
      .then(res => {
        console.log(res);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
          navigate(-1);
        }, 300)
      );
  };

  const handleDeleteFile = fileId => {
    requestAPI
      .delete(`api/duancntt/tailieu/${fileId}`)
      .then(() => {
        toast.success('Xóa tài liệu đính kèm thành công');
        fetchData({ slient: true });
      })
      .catch(e => toast.error(e));
  };

  return (
    <MainLayout>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      <Form layout="vertical" form={form} name="control-hooks">
        {/* {JSON.stringify(data)} */}
        {data && (
          <div
            style={{
              borderRadius: 10,
              background: colors.white,
              boxShadow: 'rgba(100, 100, 111, 0.3) 0px 7px 29px 0px',
              visibility: isLoading ? 'hidden' : 'visible'
            }}
          >
            <Flex
              style={{
                background: colors.white,
                borderRadius: '10px 10px 0 0',
                padding: '10px 16px'
              }}
              align="center"
              justify="space-between"
            >
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  color: colors.blue[800],
                  background: colors.white
                }}
              >
                Thông tin chung
              </div>
              <Space>
                <Button
                  icon={<BsArrowLeft size={16} style={{ top: 3, position: 'relative' }} />}
                  onClick={() => navigate(-1)}
                >
                  Trở lại
                </Button>

                <Button
                  type="primary"
                  icon={<IoIosSave size={16} style={{ top: 3, position: 'relative' }} />}
                  onClick={() => handleSubmitForm()}
                >
                  Lưu
                </Button>
              </Space>
            </Flex>
            <div style={{ height: 5 }}></div>
            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={4}>
                <Form.Item label="Tên viết tắt" required name="ten_viet_tat">
                  <Input.TextArea placeholder="Tên viết tắt" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Tên dự án" required name="ten_du_an">
                  <Input.TextArea placeholder="Tên dự án" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Chủ đầu tư" required name="chu_dau_tu">
                  <Input.TextArea placeholder="Chủ đầu tư" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Số hợp đồng" required name="so_hop_dong">
                  <Input.TextArea placeholder="Số hợp đồng" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={4}>
                <Form.Item
                  label="Ngày ký HĐ"
                  required
                  name="ngay_hop_dong"
                  getValueProps={i => (i ? { value: dayjs(i) } : '')}
                  getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="Ngày ký hợp đồng" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item
                  label="Ngày bắt đầu hợp đồng"
                  required
                  name="ngay_bat_dau_hop_dong"
                  getValueProps={i => (i ? { value: dayjs(i) } : '')}
                  getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="Ngày bắt đầu hợp đồng" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Ngày hết hạn hợp đồng"
                  required
                  name="ngay_het_hop_dong"
                  getValueProps={i => (i ? { value: dayjs(i) } : '')}
                  getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="Ngày hết hạn hợp đồng" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Giá trị HĐ"
                  required
                  name="gia_tri_hop_dong"
                  getValueProps={text =>
                    text
                      ? {
                        value: text
                          .toString()
                          .replaceAll(',', '')
                          .split('')
                          .reverse()
                          .reduce((prev, next, index) => {
                            return (index % 3 ? next : next + ',') + prev;
                          })
                      }
                      : ''
                  }
                  getValueFromEvent={onChange => {
                    return onChange.target.value.replaceAll(',', '');
                  }}
                >
                  <Input placeholder="Giá trị hợp đồng" suffix="VNĐ" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item
                  label="Chi phí nội bộ"
                  required
                  name="chi_phi_noi_bo"
                  getValueProps={text =>
                    text
                      ? {
                        value: text
                          .toString()
                          .replaceAll(',', '')
                          .split('')
                          .reverse()
                          .reduce((prev, next, index) => {
                            return (index % 3 ? next : next + ',') + prev;
                          })
                      }
                      : ''
                  }
                  getValueFromEvent={onChange => {
                    return onChange.target.value.replaceAll(',', '');
                  }}
                >
                  <Input placeholder="Chi phí nội bộ" suffix="VNĐ" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Cấp dự án" required name="cap_du_an">
                  <Select
                    placeholder="Cấp dự án"
                    options={[...DANH_MUC.current.cap_du_an]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Trạng thái hợp đồng" required name="trang_thai_hop_dong">
                  <Select
                    placeholder="Trạng thái hợp đồng"
                    options={[...DANH_MUC.current.trang_thai_hop_dong]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Nhóm dịch vụ" required name="nhom_dich_vu">
                  <Select
                    placeholder="Nhóm dịch vụ"
                    options={[...DANH_MUC.current.nhom_dich_vu]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>
              <Col span={4}>
                <Form.Item label="Mã sản phẩm dịch vụ" required name="ma_san_pham_dich_vu">
                  <Input placeholder="Mã sản phẩm dịch vụ" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={12}>
                <Form.Item label="Tóm tắt quy mô" name="tom_tat_quy_mo">
                  <Input.TextArea rows={5} placeholder="Tóm tắt quy mô" />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item label="Lĩnh vực dự án" name="linh_vuc_du_an">
                      <Select
                        mode="multiple"
                        placeholder="Lĩnh vực"
                        options={[...DANH_MUC.current.linh_vuc_du_an]}
                        fieldNames={{ label: 'name', value: 'id' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Đơn vị ký kết" name="don_vi_ky_ket">
                      <Select
                        mode="multiple"
                        placeholder="Đơn vị ký kết"
                        options={[...DANH_MUC.current.don_vi_ky_ket]}
                        fieldNames={{ label: 'name', value: 'id' }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item label="Đơn vị phối hợp" name="don_vi_phoi_hop">
                      <Select
                        mode="multiple"
                        placeholder="Đơn vị phối hợp"
                        options={[...DANH_MUC.current.don_vi_phoi_hop]}
                        fieldNames={{ label: 'name', value: 'id' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={12}>
                <Form.Item label="Tồn tại" name="ton_tai">
                  <Input.TextArea rows={5} placeholder="Tồn tại" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Khó khăn" name="kho_khan">
                  <Input.TextArea rows={5} placeholder="Khó khăn" />
                </Form.Item>
              </Col>
            </Row>

            <Flex style={{ padding: '10px 16px', width: '40%' }} align="center">
              <div
                style={{
                  fontWeight: 600,
                  fontSize: 20,
                  color: colors.blue[800]
                }}
              >
                Tài liệu đính kèm
              </div>
              <FaFileCirclePlus
                style={{ marginLeft: 10, position: 'relative', top: 1, cursor: 'pointer' }}
                size={26}
                color={colors.blue[800]}
                onClick={() => setIsOpenUpload(true)}
              />
            </Flex>

            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={12}>
                {data.tai_lieu.map((item, idx) => (
                  <Flex
                    style={{ marginBottom: 10, borderBottom: `1px solid ${colors.gray[200]}`, paddingBottom: 5 }}
                    align="center"
                    key={idx}
                    justify="space-between"
                  >
                    <Flex align="center">
                      <BsFileEarmarkPdfFill size={30} color={colors.blue[800]} style={{ marginRight: 4 }} />{' '}
                      <a href={item.url} target="_blank" rel="noreferrer">
                        {item.ten_tai_lieu ? item.ten_tai_lieu : 'File không có tên'}
                      </a>
                    </Flex>
                    <Flex align='center' style={{ gap: 6, position: 'relative', top: 3 }}>
                      <BiDownload
                        size={20}
                        color={colors.blue[800]}
                        style={{ cursor: 'pointer' }}
                        onClick={e => {
                          e.preventDefault();
                          window.open(item.url);
                        }}
                      />
                      <FaTrashCan
                        color={colors.red[600]}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleDeleteFile(item.id)}
                      />
                    </Flex>
                  </Flex>
                ))}
              </Col>
            </Row>
          </div>
        )}
      </Form>
      {isOpenUpload && (
        <UploadFile
          data={data}
          refresh={() => fetchData({ slient: true })}
          onClose={() => setIsOpenUpload(false)}
        ></UploadFile>
      )}
    </MainLayout>
  );
}

export default FormDuAnCNTT;
