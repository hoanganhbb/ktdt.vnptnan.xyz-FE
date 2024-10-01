import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import { colors } from '../../utils/theme';
import { Modal, Row, Col, Flex } from 'antd';
import DetailThueBaoOneBSS from './DetailThueBaoOneBSS';
import { FaTrash } from 'react-icons/fa6';
import TimKiemThueBaoOne from './TimKiemThueBaoOne';
import { toast } from 'sonner';

function ThueBaoOneBSS({ duancntt }) {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchData = async () => {
    const results = await requestAPI.get(
      `https://api.ktdt.vnptnan.xyz/api/duancntt/thuebaoonebss?du_an_cntt=${duancntt}`
    );
    setData(results.data);
  };

  const handleDelete = async id => {
    try {
      const result = await requestAPI.delete(`https://api.ktdt.vnptnan.xyz/api/duancntt/thuebaoonebss/${id}`);
      if (result.status == '204') {
        toast.success('Xóa thành công');
        fetchData();
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, []);

  return (
    <>
      <div
        style={{
          background: colors.blue[100],
          justifyContent: 'space-between',
          borderRadius: 10,
          padding: '10px 16px 20px 16px',
          boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
        }}
      >
        <Flex align="center" justify="space-between" style={{ marginBottom: 8 }}>
          <div style={{ fontWeight: 600, color: colors.primary, fontSize: 18 }}>
            Thuê bao OneBSS của Hợp đồng ({data?.length})
          </div>
        </Flex>
        <Row gutter={16}>
          <Col span={12}>
            {data?.map(ele => (
              <Flex
                key={ele.id}
                align="center"
                justify="space-between"
                style={{ borderBottom: '1px solid #ccc', fontWeight: 500 }}
              >
                <div style={{ padding: '4px 0' }} onClick={() => setSelected(ele)}>
                  {ele?.ma_thue_bao}
                </div>
                <Flex
                  align="center"
                  justify="center"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleDelete(ele.id)}
                >
                  <FaTrash color={colors.red[600]}></FaTrash>
                </Flex>
              </Flex>
            ))}
          </Col>
          <Col span={12}>
            <TimKiemThueBaoOne onSuccess={() => fetchData()} du_an_cntt={duancntt} />
          </Col>
        </Row>
      </div>
      <Modal open={!!selected} onCancel={() => setSelected(null)} footer={null} title="Thông tin thuê bao chi tiết">
        <DetailThueBaoOneBSS ma_thue_bao={selected?.ma_thue_bao}></DetailThueBaoOneBSS>
      </Modal>
    </>
  );
}

ThueBaoOneBSS.propTypes = {};

export default ThueBaoOneBSS;
