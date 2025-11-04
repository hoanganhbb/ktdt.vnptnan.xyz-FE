import React, { useEffect, useState, useMemo } from 'react';
import { Button, Col, Flex, Row } from 'antd';
import MainLayout from '../../components/MainLayout';
// import PropTypes from 'prop-types'
import { colors } from '../../utils/theme';
import { FaDownload, FaLock, FaTrash, FaUnlock } from 'react-icons/fa6';
import { SiMicrosoftexcel } from 'react-icons/si';
import requestAPI from '../../utils/requestAPI';
import dayjs from 'dayjs';
import { toast } from 'sonner';
// import dayjs from 'dayjs';

function SettingsDoanhThu() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const result = await requestAPI.get(`api/duancntt/uploadfile`);
    console.log(result);
    setData(result.data);
  };

  const handleLockFile = async (ele) => {
    if (ele.is_locked) return
    const formData = new FormData()
    formData.append('thang_bao_cao', `${ele.thang}/${ele.nam}`)
    const result = await requestAPI.patch(`/api/duancntt/uploadfile`, formData);
    if (result.status == 200) fetchData()
  }

  const RenderItemData = ({ ele }) => {
    const element = useMemo(() => data?.data?.find(item => ele === item.thang), [ele]);

    return (
      <Flex align="center" gap={10} style={{ padding: 10 }} justify="space-between">
        <Flex gap={16} align="center">
          <SiMicrosoftexcel color={colors.green[600]} size={32} />
          <div>
            <div style={{ fontWeight: 600 }}>Tháng {ele}</div>
            {element && <div>Ngày cập nhập: {dayjs(element?.updated_at).format('DD/MM/YYYY')}</div>}
          </div>
        </Flex>
        {element && (
          <Flex style={{ cursor: 'pointer', padding: '2px 10px' }} gap={6}>
            <Button
              type="primary"
              size="small"
              icon={<FaDownload color={colors.white} />}
              onClick={() => window.open(element?.url)}
            ></Button>
            <Button
              size="small"
              icon={<FaTrash color={colors.red[600]} />}
            // onClick={() => handleRemoveFile()}
            ></Button>
            <Button
              size="small"
              icon={element?.is_locked ? <FaLock color={colors.green[600]} /> : <FaUnlock color={colors.green[600]} />}
              onClick={() => {
                handleLockFile(element)
              }}
            ></Button>
          </Flex>
        )}
      </Flex>
    );
  };

  const handleFileChange = e => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('thang_bao_cao', '7/2024')
    formData.append('file', file)
    try {
      const result = requestAPI.post('/api/duancntt/uploadfile', formData, {
        headers: {
          'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      if (result.status == 200) {
        toast.success('Cập nhật file thành công')
        fetchData()
      }
    } catch (error) {
      toast.error(JSON.stringify(error))
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <MainLayout>
      <Flex justify="space-between" align="center" style={{ marginBottom: 10 }}>
        <div
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: colors.blue[800]
          }}
        >
          Quản lý dữ liệu hóa đơn chủ động và Hạch toán HĐ trả sau
        </div>
        <input
          type="file"
          id="file-upload"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          onChange={handleFileChange}
          hidden
        />
        <label htmlFor="file-upload">
          <Flex gap={10} style={{ background: colors.blue[800], borderRadius: 8, padding: '8px 10px' }}>
            <FaDownload color={colors.white} size={16} />
            <div style={{ color: colors.white }}>Upload file</div>
          </Flex>
        </label>
      </Flex>
      <Row gutter={[16, 16]}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(ele => (
          <Col xs={24} md={12} xxl={8} key={ele}>
            <div
              style={{
                borderBottom: '1px solid #ccc',
                background: '#fff',
                borderRadius: 10
              }}
            >
              <RenderItemData ele={ele} />
            </div>
          </Col>
        ))}
      </Row>
    </MainLayout>
  );
}

SettingsDoanhThu.propTypes = {};

export default SettingsDoanhThu;
