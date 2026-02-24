import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import requestAPI from '../../utils/requestAPI';
import { Spin, Flex, Table, Form, Input, Button, Space, Row, Col, Select, DatePicker } from 'antd';
import { colors } from '../../utils/theme';
// import dayjs from 'dayjs';
import { BsPencilFill } from 'react-icons/bs';
import { ArrowLeft } from 'react-bootstrap-icons';
import dayjs from 'dayjs';
import { FaSave } from 'react-icons/fa';

function FormTarget() {
  const navigate = useNavigate();
  const { id } = useParams();
  const DANH_MUC = useRef();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState();

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get(`/api/duancntt/${id}`)])
      .then(res => {
        DANH_MUC.current = res[0].data;
        setData(res[1].data);
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

  const handleSubmit = () => {
    console.log(form.getFieldsValue(true));
    setIsLoading(true);
    const body = { ...form.getFieldsValue(true) };
    requestAPI
      .patch(`api/duancntt/nhiemvu/${body.id}`, body)
      .then(() => {
        setSelectedItem();
        fetchData();
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
          // navigate(-1);
        }, 300)
      );
  };

  return (
    <>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      {data && selectedItem && (
        <div
          style={{
            background: 'white',
            borderRadius: 10,
            padding: '16px',
            boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
            marginBottom: 16
          }}
        >
          <div style={{ fontWeight: 500, marginBottom: 10, fontSize: 16, color: colors.primary }}>
            {selectedItem && selectedItem.id ? 'Chỉnh sửa mục tiêu' : 'Thêm mới mục tiêu'}
          </div>
          <Form layout="vertical" form={form} name="control-hooks">
            <Form.Item label="Nội dung" required name="noi_dung">
              <Input.TextArea placeholder="Nội dung nhiệm vụ" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={6}>
                <Form.Item label="Đơn vị chủ trì" required name="don_vi_chu_tri">
                  <Select
                    placeholder="Đơn vị chủ trì"
                    options={[...DANH_MUC.current.don_vi_chu_tri]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item
                  label="Hạn hoàn thành"
                  required
                  name="ngay_hoan_thanh"
                  getValueProps={i => (i ? { value: dayjs(i) } : '')}
                  getValueFromEvent={onChange => dayjs(onChange).format('YYYY-MM-DD')}
                >
                  <DatePicker style={{ width: '100%' }} placeholder="Hạn hoàn thành" format="DD/MM/YYYY" />
                </Form.Item>
              </Col>

              <Col span={6}>
                <Form.Item label="Trạng thái" required name="trang_thai_nhiem_vu_cntt">
                  <Select
                    defaultValue={[...DANH_MUC.current.trang_thai_nhiem_vu_cntt][0].id}
                    placeholder="Trạng thái"
                    options={[...DANH_MUC.current.trang_thai_nhiem_vu_cntt]}
                    fieldNames={{ label: 'name', value: 'id' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Flex justify="flex-end">
              <Space>
                <Button
                  type="default"
                  onClick={() => {
                    setSelectedItem();
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  type="primary"
                  icon={<FaSave style={{ position: 'relative', top: 2 }} />}
                  onClick={() => handleSubmit()}
                >
                  Lưu lại
                </Button>
              </Space>
            </Flex>
          </Form>
        </div>
      )}

      {data && (
        <div
          style={{
            background: 'white',
            borderRadius: 10,
            padding: '0 10px',
            boxShadow: selectedItem ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px' : 'unset',
            filter: selectedItem ? 'blur(3px)' : 'unset'
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
            <Flex align="center" justify="flex-start" style={{ width: '100%', padding: '20px 16px' }}>
              <div style={{ margin: 0, color: colors.primary, fontSize: 18, fontWeight: 500 }}>{data?.ten_du_an}</div>
            </Flex>
          </Flex>
          <Table
            dataSource={data.nhiem_vu_du_an.sort((a, b) => new Date(a.ngay_hoan_thanh) - new Date(b.ngay_hoan_thanh))}
            pagination={false}
            columns={[
              {
                title: 'STT',
                dataIndex: 'index',
                key: 'name',
                width: 50,
                align: 'center',
                render: (value, row, idx) => <>{idx + 1}</>
              },
              {
                title: 'Nội dung',
                dataIndex: 'noi_dung',
                key: 'noi_dung'
                // width: '50%',
              },
              {
                title: 'Đơn vị chủ trì',
                dataIndex: 'don_vi_chu_tri',
                key: 'don_vi_chu_tri',
                render: (value, row) => <>{row.don_vi_chu_tri_by_text}</>
              },
              {
                title: 'Hạn hoàn thành',
                dataIndex: 'ngay_hoan_thanh',
                key: 'ngay_hoan_thanh',
                render: value => <>{dayjs(value).format('DD/MM/YYYY')}</>
              },
              {
                title: 'Trạng thái',
                dataIndex: 'trang_thai_nhiem_vu_cntt',
                key: 'trang_thai_nhiem_vu_cntt',
                render: value => <>{DANH_MUC.current?.trang_thai_nhiem_vu_cntt.find(ele => ele.id === value).name}</>
              },
              {
                title: '',
                dataIndex: 'name',
                key: 'name',
                render: (value, row) => (
                  <Flex style={{ cursor: 'pointer' }}>
                    <BsPencilFill
                      size={18}
                      color={colors.primary}
                      onClick={() => {
                        setSelectedItem(row);
                        form.setFieldsValue(row);
                      }}
                    />
                  </Flex>
                )
              }
            ]}
          ></Table>
        </div>
      )}
      {/* {JSON.stringify(data?.nhiem_vu_du_an)} */}
    </>
  );
}

export default FormTarget;
