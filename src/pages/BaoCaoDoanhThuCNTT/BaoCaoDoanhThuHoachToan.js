import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import MainLayout from '../../components/MainLayout';
import { Table } from 'antd';
import { colors } from '../../utils/theme';
// import axios from 'axios';
import { formatCash } from '../../utils/constant';

function BaoCaoDoanhThuHoachToan() {
  const [data, setData] = useState();
  const DANH_MUC = useRef();

  const fetchData = async () => {
    const results = await Promise.all([
      requestAPI.get(`api/profile/`),
      requestAPI.get('/api/duancntt/baocaodoanhthuchitiet?thang_bao_cao=8/2024')
    ]);
    DANH_MUC.current = results[0].data;
    console.log(results[1]);
    setData(results[1].data);
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[800], textTransform: 'uppercase' }}>
          Biểu 5. Báo cáo đối soát doanh thu hạch toán và hóa đơn
        </div>
        {/* <div style={{ fontStyle: 'italic' }}>
          Từ ngày 01/09/2024 đến ngày 30/09/2024
        </div> */}
      </div>
      <Table
        dataSource={data?.data.sort((a, b) => a.ten_don_vi - b.ten_don_vi > 0)}
        pagination={false}
        style={{ fontSize: 10 }}
        bordered
        size="small"
        columns={[
          {
            title: 'STT',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 40,
            render: (value, row, index) => (
              <div>
                <div>{index + 1}</div>
              </div>
            )
          },
          {
            title: 'Tên đơn vị',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 140,
            render: (value, row) => <>{row.ten_don_vi.replace('Trung tâm Viễn thông', 'TTVT')}</>
          },
          {
            title: 'Dịch vụ',
            dataIndex: 'dich_vu',
            key: 'dich_vu',
            render: (value, row) => <>{DANH_MUC?.current?.nhom_dich_vu?.find(ele => row.dich_vu == ele.id)?.name}</>
          },
          // {
          //   title: 'Giá trị chưa thuế',
          //   dataIndex: 'gia_chua_thue',
          //   key: 'gia_chua_thue',
          //   align: 'center',
          //   width: 120,
          //   render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_truoc_VAT)}</div>
          // },
          // {
          //   title: 'VAT',
          //   dataIndex: 'gia_tri_hop_dong_VAT',
          //   key: 'gia_tri_hop_dong_VAT',
          //   align: 'center',
          //   width: 120,
          //   render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_VAT)}</div>
          // },
          {
            title: 'Giá trị Hợp đồng cả thuế VAT',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong)}</div>
          },
          {
            title: () => (
              <div>
                <div >Hạch toán</div>
                <div>Doanh thu chưa thuế</div>
              </div>
            ),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tong_doanh_thu)}</div>
          },
          {
            title: () => (
              <div>
                <div>Thuế VAT</div>
              </div>
            ),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tong_doanh_thu)}</div>
          },
          {
            title: () => (
              <div>
                <div>Tổng</div>
              </div>
            ),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            // render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tong_doanh_thu)}</div>
          },
          {
            title: () => (
              <div>
                <div>Tổng hóa đơn đã xuất</div>
              </div>
            ),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            // render: (value, row) => <div style={{ fontWeight: 600 }}></div>
          },
          {
            title: () => (
              <div>
                <div>Số lượng hóa đơn xuất tự động</div>
              </div>
            ),
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            // render: (value, row) => <div style={{ fontWeight: 600 }}></div>
          }
        ]}
      ></Table>
    </MainLayout>
  );
}

BaoCaoDoanhThuHoachToan.propTypes = {};

export default BaoCaoDoanhThuHoachToan;
