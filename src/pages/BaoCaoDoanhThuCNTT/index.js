import MainLayout from '../../components/MainLayout';
import { Row, Col, Flex } from 'antd';
import React from 'react';
import { FaSheetPlastic } from 'react-icons/fa6';
import { colors } from '../../utils/theme';
import { useNavigate } from 'react-router-dom';

function BaoCaoDoanhThuCNTTPage() {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Row gutter={16}>
        <Col xs={8} onClick={() => navigate('/baocao/doanhthutonghop')}>
          <div
            style={{
              padding: 10,
              background: colors.white,
              borderRadius: 10,
              borderBottom: '1px solid #eee',
              minHeight: 80
            }}
          >
            <Flex align="center" gap={16}>
              <FaSheetPlastic size={22} color={colors.green[600]}></FaSheetPlastic>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                Biểu 17. Báo cáo Tổng hợp doanh thu các đơn vị theo sản phẩm dịch vụ
              </div>
            </Flex>
          </div>
        </Col>
        <Col xs={8} onClick={() => navigate('/baocao/doanhthuhachtoan')}>
          <div
            style={{
              padding: 10,
              background: colors.white,
              borderRadius: 10,
              borderBottom: '1px solid #eee',
              minHeight: 80
            }}
          >
            <Flex align="center" gap={16}>
              <FaSheetPlastic size={22} color={colors.green[600]}></FaSheetPlastic>
              <div style={{ fontSize: 16, fontWeight: 600 }}>
                Biểu 5. Báo cáo đối soát doanh thu hạch toán và hóa đơn
              </div>
            </Flex>
          </div>
        </Col>
      </Row>
    </MainLayout>
  );
}

BaoCaoDoanhThuCNTTPage.propTypes = {};

export default BaoCaoDoanhThuCNTTPage;
