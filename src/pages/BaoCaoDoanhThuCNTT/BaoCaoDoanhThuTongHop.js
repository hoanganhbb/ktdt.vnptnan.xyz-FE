import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import MainLayout from '../../components/MainLayout';
import { Table } from 'antd';
import { colors } from '../../utils/theme';
import axios from 'axios';
import { formatCash } from '../../utils/constant';

function BaoCaoDoanhThuTongHop() {
  const [data, setData] = useState([]);
  const DANH_MUC = useRef();

  const fetchData = async () => {
    const results = await Promise.all([
      requestAPI.get(`api/profile/`),
      axios.post('https://api-node.ktdt.vnptnan.xyz/baocaodoanhthu/tonghop', {
        don_vi: ''
      })
    ]);
    console.log(results);
    DANH_MUC.current = results[0].data;

    const result = []

    results[1].data.forEach(element => {
      element.data.forEach(ele => {
        result.push(
          {
            ...ele,
            ten_don_vi: element.key
          })
      });
    });

    console.log(result);
    setData(result);
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[800], textTransform: 'uppercase' }}>
          Báo cáo Tổng hợp doanh thu các đơn vị theo sản phẩm dịch vụ
        </div>
        <div style={{ fontStyle: 'italic' }}>
          Từ ngày .../... đến ngày .../...
        </div>
      </div>
      <Table
        dataSource={data}
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
            render: (value, row, index) => <div>
              <div>{index + 1}</div>
            </div>
          },
          {
            title: 'Tên đơn vị',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 140,
            render: (value, row) => (
              <>{row.ten_don_vi.replace('Trung tâm Viễn thông', 'TTVT')}</>
            )
          },
          {
            title: 'Dịch vụ',
            dataIndex: 'id',
            key: 'id',
            render: (value, row) => (
              <>{DANH_MUC?.current?.nhom_dich_vu?.find(ele => row.index == ele.id)?.name}</>
            )
          },
          {
            title: 'Giá trị chưa thuế',
            dataIndex: 'gia_chua_thue',
            key: 'gia_chua_thue',
            align: 'center',
            width: 120,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_truoc_VAT)}</div>
            )
          },
          {
            title: 'VAT',
            dataIndex: 'gia_tri_hop_dong_VAT',
            key: 'gia_tri_hop_dong_VAT',
            align: 'center',
            width: 120,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_VAT)}</div>
            )
          },
          {
            title: 'Giá trị Hợp đồng',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
            width: 100,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong)}</div>
            )
          },
        ]}
      >
      </Table>
    </MainLayout>
  );
}

BaoCaoDoanhThuTongHop.propTypes = {};

export default BaoCaoDoanhThuTongHop;
