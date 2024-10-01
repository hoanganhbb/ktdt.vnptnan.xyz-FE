import React, { useState } from 'react';
import { Button, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
// import moment from 'moment';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';

function FormCongViec({ danhmuc, onFinish }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    const values = form.getFieldsValue();
    if (!values.ngay_het_han) return toast.error('Hạn xử lý bắt buộc nhập');
    if (!values.ca_nhan_chu_tri) return toast.error('Phải có cá nhân chủ trì');
    if (!values.lanh_dao_phu_trach) return toast.error('Phải có lãnh đạo phụ trách');
    if (!values.lanh_dao_vtt) return toast.error('Phải có lãnh đạo phụ trách');
    setIsLoading(true);
    const formData = new FormData();
    formData.append('noi_dung', values.noi_dung);
    formData.append('noi_dung_chi_dao', values.noi_dung_chi_dao);
    formData.append('lanh_dao_vtt', values.lanh_dao_vtt);
    formData.append('lanh_dao_phu_trach', values.lanh_dao_phu_trach);
    formData.append('ca_nhan_chu_tri', values.ca_nhan_chu_tri);
    formData.append('so_eoffice', values.so_eoffice);
    if (values.ca_nhan_phoi_hop) {
      values.ca_nhan_phoi_hop.forEach(element => {
        formData.append('ca_nhan_phoi_hop', element);
      });
    }
    formData.append('ngay_het_han', values.ngay_het_han.format('YYYY-MM-DD'));
    requestAPI
      .post(`api/congviecktdt/`, formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      .then(res => {
        if (res.statusText === 'OK') toast.success('Cập nhật việc thành công');
        onFinish();
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div>
      <Form
        layout="vertical"
        form={form}
      // onValuesChange={onFormLayoutChange}
      >
        <Row gutter={16}>
          <Col span="12">
            <Form.Item label="Số eOffice" name="so_eoffice">
              <Input placeholder="Nhập số eOffice" />
            </Form.Item>
          </Col>
          <Col span="12"></Col>
          <Col span="12">
            <Form.Item label="Lãnh đạo VTT" name="lanh_dao_vtt">
              <Select
                placeholder="Lãnh đạo Viễn thông tỉnh"
                options={danhmuc.users.filter(item => [34, 16, 35, 86].includes(item.id))}
                fieldNames={{ label: 'name', value: 'id' }}
              />
            </Form.Item>
          </Col>
          <Col span="12">
            <Form.Item label="Lãnh đạo phụ trách" name="lanh_dao_phu_trach">
              <Select
                placeholder="Lãnh đạo phòng"
                options={danhmuc.users.filter(item => [59, 15, 24].includes(item.id))}
                fieldNames={{ label: 'name', value: 'id' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Nội dung" name="noi_dung">
          <Input.TextArea rows={4} placeholder="Nhập nội dung công việc" />
        </Form.Item>
        <Form.Item label="Nội dung chỉ đạo" name="noi_dung_chi_dao">
          <Input.TextArea rows={4} placeholder="Nhập nội dung công việc" />
        </Form.Item>
        <Form.Item label="Cá nhân chủ trì" name="ca_nhan_chu_tri" required>
          <Select
            options={danhmuc.users.filter(
              item => ![38, 59, 15, 24, 34, 16, 35, 33, 86].includes(item.id) && !!item.name.trim()
            )}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Form.Item>
        <Form.Item label="Cá nhân phối hợp" name="ca_nhan_phoi_hop">
          <Select
            mode="multiple"
            options={danhmuc.users.filter(
              item => ![38, 59, 15, 24, 34, 16, 35, 33, 86].includes(item.id) && !!item.name.trim()
            )}
            fieldNames={{ label: 'name', value: 'id' }}
          />
        </Form.Item>
        <Form.Item label="Hạn xử lý" name="ngay_het_han" required>
          <DatePicker
            style={{ width: '100%', height: 38 }}
            format={'DD/MM/YYYY'}
            placeholder="Chọn thời hạn"
          ></DatePicker>
        </Form.Item>
        <Form.Item>
          <Button
            style={{ height: 48, borderRadius: 16 }}
            type="primary"
            block
            onClick={handleSubmit}
            loading={isLoading}
          >
            <Typography.Text strong style={{ color: 'white' }}>
              LƯU CÔNG VIỆC
            </Typography.Text>
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default FormCongViec;
