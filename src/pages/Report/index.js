import React, { useEffect, useRef, useState } from 'react';
import MainLayout from '../../components/MainLayout/index';
import { Divider, Flex, Spin, Table } from 'antd';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';
// import { selectorDuAnCapTinhConHieuLuc } from '../../utils/index';
import { colors } from '../../utils/theme';
import { TRANG_THAI_HD_DA_KY, DU_AN_CAP_HUYEN_ID, TRANG_THAI_HD_CHUA_KY } from '../../utils';
import dayjs from 'dayjs';
import { FaInfoCircle } from 'react-icons/fa';
import { FaFileSignature } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

function ReportPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const DANH_MUC = useRef();
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);

  const fetchData = () => {
    setIsLoading(true);
    Promise.all([requestAPI.get(`api/profile/`), requestAPI.get('api/duancntt/')])
      .then(response => {
        DANH_MUC.current = response[0].data;
        console.log(response[1].data);
        const newData = response[1].data;
        setData(newData);
        setFilterData(newData);
      })
      .catch(e => toast.error(e))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(filterData, data);

  return (
    <MainLayout>
      <Spin tip="Đang tải dữ liệu..." spinning={isLoading} fullscreen></Spin>
      <div>
        <Divider
          orientation="left"
          style={{
            color: colors.blue[800],
            borderColor: colors.blue[800],
            marginBottom: 6,
            fontSize: 16,
            fontWeight: 600
          }}
        >
          HỢP ĐỒNG ĐÃ KÝ ({filterData.filter(ele => ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY).length}) | CẤP
          HUYỆN ĐÃ KÝ (
          {
            filterData.filter(
              ele => ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY && ele.cap_du_an === DU_AN_CAP_HUYEN_ID
            ).length
          }
          )
          | CẤP HUYỆN CHƯA KÝ (
          {
            filterData.filter(
              ele => ele.trang_thai_hop_dong === TRANG_THAI_HD_CHUA_KY && ele.cap_du_an === DU_AN_CAP_HUYEN_ID
            ).length
          }
          )
        </Divider>
        <Table
          columns={[
            {
              title: 'STT',
              dataIndex: 'name',
              key: 'name',
              render: (text, row, idx) => <>{idx + 1}</>,
              width: 60,
              align: 'center'
            },
            {
              title: 'ID',
              dataIndex: 'id',
              key: 'id',
              width: 60,
              align: 'center'
            },

            {
              title: 'Tên dự án',
              dataIndex: 'ten_du_an',
              key: 'ten_du_an',
              render: (value, record) => (
                <>
                  <div style={{ fontWeight: 500 }}>
                    {record.ten_viet_tat} | {record.chu_dau_tu}
                  </div>
                  <div style={{ fontWeight: 600 }}>{value}</div>
                </>
              )
            },
            {
              title: 'Ngày hết hạn',
              dataIndex: 'ngay_het_hop_dong',
              key: 'ngay_het_hop_dong',
              width: 200,
              render: value => (
                <>
                  <div style={{ color: colors.blackAlpha[500], fontWeight: 600 }}>
                    {dayjs(value).format('DD/MM/YYYY')}
                  </div>
                  <div>Còn lại: {dayjs(value).diff(dayjs(), 'day')} ngày</div>
                </>
              )
            },
            {
              title: '',
              dataIndex: 'id',
              key: 'id',
              render: value => (
                <Flex gap={16} style={{ cursor: 'pointer' }}>
                  <FaInfoCircle
                    color={colors.blue[800]}
                    size={18}
                    onClick={() => {
                      window.open(`https://api.ktdt.vnptnan.xyz/admin/quanlycongviec/duancntt/${value}/change/`);
                    }}
                  />

                  <FaFileSignature
                    color={colors.blue[800]}
                    size={18}
                    onClick={() => {
                      navigate(`/duancntt/${value}`);
                    }}
                  />
                </Flex>
              )
            }
          ]}
          size="small"
          pagination={false}
          rowKey="id"
          dataSource={filterData
            .filter(ele => ele.trang_thai_hop_dong === TRANG_THAI_HD_DA_KY)
            .sort((a, b) => dayjs(a.ngay_het_hop_dong).diff(dayjs(b.ngay_het_hop_dong), 'day'))
            .slice(0, 10)}
        ></Table>
      </div>
    </MainLayout>
  );
}

ReportPage.propTypes = {};

export default ReportPage;
