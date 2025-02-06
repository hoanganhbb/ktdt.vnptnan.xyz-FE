import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import MainLayout from '../../components/MainLayout';
import { Table } from 'antd';
import { colors } from '../../utils/theme';
import { formatCash } from '../../utils/constant';

function BaoCaoDoanhThuTongHop() {
  const [data, setData] = useState();
  const DANH_MUC = useRef();

  const fetchData = async () => {
    const results = await Promise.all([
      requestAPI.get(`api/profile/`),
      requestAPI.get('/api/duancntt/baocaodoanhthuchitiet?thang_bao_cao=8/2024')
    ]);
    console.log(results);
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
          Biểu 17. Báo cáo Tổng hợp doanh thu các đơn vị theo sản phẩm dịch vụ
        </div>
        <div style={{ fontStyle: 'italic' }}>Từ ngày .../... đến ngày .../...</div>
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
          {
            title: 'Giá trị Hợp đồng',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong)}</div>
          },
          {
            title: 'Giá trị chưa thuế',
            dataIndex: 'gia_chua_thue',
            key: 'gia_chua_thue',
            align: 'center',
            width: 120,
            render: (value, row) => {
              return <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_truoc_VAT)}</div>
            }
          },
          {
            title: 'VAT',
            dataIndex: 'gia_tri_hop_dong_VAT',
            key: 'gia_tri_hop_dong_VAT',
            align: 'center',
            width: 120,
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_VAT)}</div>
          },

          // {
          //   title: 'Tổng',
          //   dataIndex: 'id',
          //   key: 'id',
          //   align: 'center',
          //   width: 100,
          //   render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tong_doanh_thu)}</div>
          // },
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
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tien_thue)}</div>
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
            render: (value, row) => <div style={{ fontWeight: 600 }}>{formatCash(row?.tong_tat_ca_du_lieu)}</div>
          }
        ]}
      ></Table>
    </MainLayout>
  );
}

BaoCaoDoanhThuTongHop.propTypes = {};

export default BaoCaoDoanhThuTongHop;
