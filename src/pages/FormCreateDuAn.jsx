import React, { useState, useEffect, useRef } from 'react';
import MainLayout from '../components/MainLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import requestAPI from '../utils/requestAPI';
import { Button, Col, DatePicker, Flex, Form, Input, Row, Select, Space, Spin } from 'antd';
import { colors } from '../utils/theme';
import dayjs from 'dayjs';
import { BsArrowLeft } from 'react-icons/bs';
import { IoIosSave } from 'react-icons/io';
import { toast } from 'sonner';

function FormCreateDuAn() {
  const [searchParams] = useSearchParams();
  const cap_du_an = searchParams.get('cap_du_an') || ''
  const navigate = useNavigate();
  const DANH_MUC = useRef();
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`)])
      .then(res => {
        DANH_MUC.current = res[0].data;
        form.setFieldValue('cap_du_an', cap_du_an ? +cap_du_an : 9)
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
    form.submit();
    const objectAfterFormat = () =>
      Object.entries(form.getFieldsValue()).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});
    const body = objectAfterFormat();
    if (!body.trang_thai_hop_dong) return toast.error('Vui lòng nhập trạng thái hợp đồng');
    if (!body.cap_du_an) return toast.error('Vui lòng nhập cấp dự án');
    const formData = new FormData();
    for (var key in body) {
      formData.append(key, body[key]);
    }
    if (body?.don_vi_ky_ket?.length > 1) {
      formData.delete('don_vi_ky_ket');
      body.don_vi_ky_ket.map(ele => formData.append('don_vi_ky_ket', ele))
    }

    if (body?.don_vi_phoi_hop?.length > 1) {
      formData.delete('don_vi_phoi_hop');
      body.don_vi_phoi_hop.map(ele => formData.append('don_vi_phoi_hop', ele))
    }

    setIsLoading(true);
    requestAPI
      .post(`api/duancntt/`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(() => {
        toast.success('Tạo dự án thành công')
        navigate(-1);
      })
      .catch(e => toast.error(JSON.stringify(e)))
      .finally(() => setIsLoading(false))
  };

  const validateMessages = {
    required: "'${name}' là trường phải nhập!"
  };

  return (
    <MainLayout>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      <Form layout="vertical" form={form} name="control-hooks" validateMessages={validateMessages}>
        {DANH_MUC.current && (
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
                Thêm mới dự án cấp {cap_du_an === '10' ? 'huyện' : 'tỉnh'}
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
                <Form.Item label="Tên viết tắt" name="ten_viet_tat">
                  <Input.TextArea placeholder="Tên viết tắt" />
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item label="Tên dự án" name="ten_du_an">
                  <Input.TextArea placeholder="Tên dự án" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Chủ đầu tư" name="chu_dau_tu">
                  <Input.TextArea placeholder="Chủ đầu tư" />
                </Form.Item>
              </Col>

              <Col span={4}>
                <Form.Item label="Số hợp đồng" name="so_hop_dong">
                  <Input.TextArea placeholder="Số hợp đồng" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} style={{ padding: '0 16px' }}>
              <Col span={4}>
                <Form.Item
                  label="Ngày ký HĐ"
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
                  name="ngay_het_hop_dong"
                  getValueProps={i => (i ? { value: dayjs(i) } : '')}
                  getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="Ngày hết hạn hợp đồng" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item
                  label="Giá trị HĐ"
                  required
                  name="gia_tri_hop_dong"
                  getValueProps={text =>
                    text
                      ? {
                        value: text
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
                  <Input placeholder="Giá trị Hợp đồng" suffix="VNĐ" />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Cấp dự án" required name="cap_du_an">
                  <Select
                    placeholder="Cấp dự án"
                    options={[...DANH_MUC.current.cap_du_an]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Trạng thái hợp đồng" required name="trang_thai_hop_dong">
                  <Select
                    placeholder="Trạng thái hợp đồng"
                    options={[...DANH_MUC.current.trang_thai_hop_dong]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>

              <Col span={3}>
                <Form.Item label="Nhóm dịch vụ" name="nhom_dich_vu">
                  <Select
                    placeholder="Nhóm dịch vụ"
                    options={[...DANH_MUC.current.nhom_dich_vu]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
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
                    <Form.Item label="Lĩnh vực dự án" name="linh_vuc_du_an" required>
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

            {/* <div
            style={{
              fontWeight: 600,
              fontSize: 20,
              color: colors.blue[800],
              background: colors.white,
              padding: '10px 16px'
            }}
          >
            Tài liệu đính kèm
          </div>
          <Row gutter={16} style={{ padding: '0 16px' }}>
            {data.tai_lieu.map((item, idx) => (
              <Col span={24} key={idx}>
                <Flex
                  style={{ marginBottom: 10, borderBottom: `1px solid ${colors.gray[200]}`, paddingBottom: 5 }}
                  align="center"
                >
                  <BsFileEarmarkPdfFill size={30} color={colors.blue[800]} style={{ marginRight: 4 }} />{' '}
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.ten_tai_lieu ? item.ten_tai_lieu : 'File không có tên'}
                  </a>
                </Flex>
              </Col>
            ))}
          </Row> */}
          </div>
        )}
      </Form>
    </MainLayout>
  );
}

export default FormCreateDuAn;
