import React, { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types'
import requestAPI from '../../utils/requestAPI';
import MainLayout from '../../components/MainLayout';
import { Table } from 'antd';
import { colors } from '../../utils/theme';
import axios from 'axios';
import { formatCash } from '../../utils/constant';

function BaoCaoDoanhThuHoachToan() {
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

    setData(results[1].data.sort((a, b) => a.don_vi_ky_ket_display[0] - b.don_vi_ky_ket_display[0] > 0));
  };

  useEffect(() => {
    console.log(data);
    fetchData();
  }, []);

  return (
    <MainLayout>
      <div style={{ textAlign: 'center', marginBottom: 10 }}>
        <div style={{ fontWeight: 600, fontSize: 18, color: colors.blue[800], textTransform: 'uppercase' }}>
          Báo cáo đối soát doanh thu hạch toán và hóa đơn
        </div>
        <div style={{ fontStyle: 'italic' }}>
          Từ ngày 01/09/2024 đến ngày 30/09/2024
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
            width: 30,
            render: (value, row, index) => <div>
              <div>{index + 1}</div>
              {/* <div>ID{value}</div> */}
            </div>
          },
          {
            title: 'Tên đơn vị',
            dataIndex: 'id',
            key: 'id',
            width: 120,
            render: (value, row) => (
              <div style={{
                width: 180,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>{row.don_vi_ky_ket_display[0]}</div>
            )
          },
          {
            title: 'Nhóm dịch vụ',
            dataIndex: 'id',
            key: 'id',
            width: 150,
            render: (value, row) => (
              <>{DANH_MUC?.current?.nhom_dich_vu?.find(ele => row.nhom_dich_vu == ele.id)?.name}</>
            )
          },
          {
            title: 'Giá trị Hợp đồng',
            dataIndex: 'id',
            key: 'id',
            align: 'right',
            width: 100,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong)}</div>
            )
          },
          {
            title: 'GT HĐ chưa thuế',
            dataIndex: 'gia_chua_thue',
            key: 'gia_chua_thue',
            align: 'right',
            width: 100,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_truoc_VAT)}</div>
            )
          },
          {
            title: 'Thuế',
            dataIndex: 'vat',
            key: 'vat',
            align: 'center',
            width: 100,
            render: (value, row) => (
              <div style={{ fontWeight: 600 }}>{formatCash(row?.gia_tri_hop_dong_VAT)}</div>
            )
          },

          {
            title: 'Doanh thu chưa thuế',
            dataIndex: 'doanh_thu_chua_thue',
            key: 'id',
            align: 'right',
            width: 100,
            // render: (value, row) => (
            //   <div style={{ fontWeight: 600 }}>{formatCash(row?.doanh_thu_chua_thue)}</div>
            // )
          },
          {
            title: 'Thuế',
            dataIndex: 'thue_vat',
            key: 'id',
            align: 'right',
            width: 100,
            // render: (value, row) => (
            //   <div style={{ fontWeight: 600 }}>{formatCash(row?.thue_vat)}</div>
            // )
          }
        ]}
      >
      </Table>
    </MainLayout>
  );
}

BaoCaoDoanhThuHoachToan.propTypes = {};

export default BaoCaoDoanhThuHoachToan;
