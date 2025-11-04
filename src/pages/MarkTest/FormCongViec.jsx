import React, { useState } from 'react';
import { Button, DatePicker, Form, Input, Select, Typography, Row, Col } from 'antd';
// import moment from 'moment';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';

function FormCongViec({ danhmuc, onFinish }) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);
    const values = form.getFieldsValue();
    const formData = new FormData();
    formData.append('so_eoffice', values.so_eoffice);
    formData.append('noi_dung', values.noi_dung);
    formData.append('noi_dung_chi_dao', values.noi_dung_chi_dao);
    formData.append('don_vi_chu_tri', values.don_vi_chu_tri);
    if (values.don_vi_phoi_hop) {
      values.don_vi_phoi_hop.forEach(element => {
        formData.append('don_vi_phoi_hop', element);
      });
    }
    formData.append('ngay_het_han', values.ngay_het_han.format('YYYY-MM-DD'));
    requestAPI
      .post(`api/congviec/`, formData, {
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
          <Col span={12}>
            <Form.Item label="Số eOffice" name="so_eoffice">
              <Input placeholder="Nhập số eOffice" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Ngày giao" name="ngay_giao">
              <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} placeholder="Chọn thời hạn"></DatePicker>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Nội dung" name="noi_dung">
          <Input.TextArea rows={4} placeholder="Nhập nội dung công việc" />
        </Form.Item>
        <Form.Item label="Nội dung chỉ đạo" name="noi_dung_chi_dao">
          <Input.TextArea rows={4} placeholder="Nhập nội dung công việc" />
        </Form.Item>
        <Form.Item label="Đơn vị chủ trì" name="don_vi_chu_tri">
          <Select options={danhmuc.don_vi_chu_tri} fieldNames={{ label: 'name', value: 'id' }} />
        </Form.Item>
        <Form.Item label="Đơn vị phối hợp" name="don_vi_phoi_hop">
          <Select mode="multiple" options={danhmuc.don_vi_phoi_hop} fieldNames={{ label: 'name', value: 'id' }} />
        </Form.Item>
        <Form.Item label="Hạn xử lý" name="ngay_het_han">
          <DatePicker style={{ width: '100%' }} format={'DD/MM/YYYY'} placeholder="Chọn thời hạn"></DatePicker>
        </Form.Item>
        <Form.Item>
          <Button style={{ height: 42 }} type="primary" block onClick={handleSubmit} loading={isLoading}>
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
