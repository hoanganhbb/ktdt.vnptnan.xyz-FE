import React, { useState, useEffect } from 'react';
import { Button, Col, Flex, Input, Modal, Row } from 'antd';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import { IoAddCircleSharp } from 'react-icons/io5';

import RequestAPI from '../../utils/requestAPI';
import { colors } from '../../utils/theme';
import { formatCash } from '../../utils/constant';
import { toast } from 'sonner';
import { TrashFill } from 'react-bootstrap-icons';

function FormDoanhThu({ onClose, data, onFinish }) {
  const [dataDoanhThu, setDataDoanhThu] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setDataDoanhThu(data.doanh_thu_du_kien.sort((a, b) => a.nam - b.nam));
  }, [data]);

  const handleChangeValue = (value, index) => {
    const newData = [...dataDoanhThu];
    newData[index].gia_tri = value;
    setDataDoanhThu(newData);
  };

  const handleChangeYear = (value, index) => {
    const newData = [...dataDoanhThu];
    newData[index].nam = value;
    setDataDoanhThu(newData);
  };

  const handleSaveDoanhThu = () => {
    const body = dataDoanhThu.filter(ele => !ele.id);
    console.log(body);
    const listRequest = body.map(res => {
      const formData = new FormData();
      formData.append('du_an', data.id);
      formData.append('nam', res.nam);
      formData.append('gia_tri', res.gia_tri);
      return RequestAPI.post('api/duancntt/doanhthudukien/', formData);
    });
    const bodyPatch = dataDoanhThu.filter(ele => ele.id);
    const listRequestPatch = bodyPatch.map(res => {
      const formData = new FormData();
      formData.append('du_an', data.id);
      formData.append('nam', res.nam);
      formData.append('gia_tri', res.gia_tri);
      return RequestAPI.patch(`api/duancntt/doanhthudukien/${res.id}`, formData);
    });
    setIsLoading(true);
    Promise.all([...listRequest, ...listRequestPatch])
      .then(() => {
        toast.success('Cập nhật doanh thu thành công');
        onFinish();
      })
      .catch(e => toast.error(JSON.stringify(e)))
      .finally(() => setIsLoading(false));
  };

  return (
    <Modal open title="Doanh thu dự kiến" width={1000} footer={null} onCancel={onClose}>
      {/* {JSON.stringify(dataDoanhThu)} */}
      <Row gutter={16}>
        <Col span={8}>
          <Flex gap={16}>
            <div style={{ width: 100, textAlign: 'center', color: colors.blue[700], fontWeight: 500, fontSize: 16 }}>
              Năm
            </div>
            <div style={{ width: 194, textAlign: 'center', color: colors.blue[700], fontWeight: 500, fontSize: 16 }}>
              Doanh thu
            </div>
          </Flex>
          {dataDoanhThu.map((ele, idx) => (
            <Flex
              gap={16}
              key={ele.id}
              style={{
                width: 320,
                textAlign: 'center',
                position: 'relative',
                marginBottom: 6
              }}
            >
              <Input
                value={ele.nam}
                onChange={e => handleChangeYear(e.target.value, idx)}
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: colors.blue[700],
                  fontWeight: 600,
                  width: 100,
                  padding: 0
                }}
              ></Input>
              <Input
                value={
                  ele.gia_tri.toString()
                    ? ele.gia_tri
                        .toString()
                        .toString()
                        .replaceAll(',', '')
                        .split('')
                        .reverse()
                        .reduce((prev, next, index) => {
                          return (index % 3 ? next : next + ',') + prev;
                        })
                    : ''
                }
                onChange={e => {
                  handleChangeValue(e.target.value.replaceAll(',', ''), idx);
                }}
                style={{
                  textAlign: 'center',
                  fontSize: 16,
                  color: colors.blue[700],
                  fontWeight: 600,
                  width: 194
                }}
              ></Input>
              <TrashFill
                color={colors.red[600]}
                size={16}
                style={{ marginTop: 7, cursor: 'pointer' }}
                onClick={() => {
                  if (!ele.id) {
                    setDataDoanhThu(dataDoanhThu.filter((item, index) => index !== idx));
                  } else {
                    RequestAPI.delete(`api/duancntt/doanhthudukien/${ele.id}`).then(() => {
                      setDataDoanhThu(dataDoanhThu.filter(element => element.id !== ele.id));
                    });
                  }
                }}
              ></TrashFill>
            </Flex>
          ))}
          <Flex
            justify="center"
            align="center"
            style={{
              background: colors.white,
              border: `1px dashed ${colors.blue[700]}`,
              cursor: 'pointer',
              borderRadius: 6,
              padding: '4px 0',
              marginTop: 10
            }}
            onClick={() => {
              setDataDoanhThu([
                ...dataDoanhThu,
                {
                  nam: '',
                  gia_tri: ''
                }
              ]);
            }}
          >
            <IoAddCircleSharp size={30} color={colors.blue[800]} />
          </Flex>
        </Col>
        <Col span={16}>
          <BarChart width={600} height={300} data={dataDoanhThu} margin={{ left: 35, top: 30 }}>
            <Bar
              dataKey="gia_tri"
              stroke="#8884d8"
              fill={colors.blue[500]}
              barSize={50}
              label={({ x, y, fill, value }) => (
                <text x={x - 20} y={y - 10} fill={fill}>
                  {value ? formatCash(value) : ''}
                </text>
              )}
            />
            {/* <CartesianGrid stroke="#ccc" strokeDasharray="5 5" /> */}
            <XAxis dataKey="nam" />
            <YAxis
              tickFormatter={value =>
                new Intl.NumberFormat('vi-VN', {
                  notation: 'compact',
                  compactDisplay: 'short'
                }).format(value)
              }
            />
            {/* <Tooltip /> */}
          </BarChart>
        </Col>
      </Row>
      <Flex justify="flex-end">
        <Flex align="center" gap={16}>
          <Button type="default" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button type="primary" loading={isLoading} onClick={() => handleSaveDoanhThu()}>
            Lưu lại
          </Button>
        </Flex>
      </Flex>
    </Modal>
  );
}

export default FormDoanhThu;
