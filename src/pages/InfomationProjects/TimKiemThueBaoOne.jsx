import React, { useState } from 'react';
import { Select, Button, Flex } from 'antd';
// import { LOAI_TB_DATA } from '../../utils/constant';
import { colors } from '../../utils/theme';
import axios from 'axios';
import dayjs from 'dayjs';
import { md5 } from 'js-md5';
import { MdBookmarkAdd } from 'react-icons/md';
import requestAPI from '../../utils/requestAPI';
import { toast } from 'sonner';

function TimKiemThueBaoOne({ du_an_cntt, onSuccess }) {
  const [data, setData] = useState([]);

  const [filter, setFilter] = useState({
    DONVI_ID: null,
    LOAITB_ID: null
  });

  const handleSearch = async () => {
    const results = await axios.post(`https://cskh.vnptnghean.com.vn:1443/KTDT/CHITIET_TB_CNTT`, {
      ...filter,
      PAGE: 1,
      PAGESIZE: 10000,
      hashkeyInput: md5(
        `CNTT_${dayjs().format('YYYY')}${dayjs().format('MM')}${dayjs().format('DD')}${dayjs().format('HH')}`
      ).toLocaleUpperCase()
    });
    setData(results.data.Data);
  };

  const handleAddThueBao = async ma_thue_bao => {
    try {
      const result = await requestAPI.post(`https://api.ktdt.vnptnan.xyz/api/duancntt/thuebaoonebss`, {
        du_an_cntt,
        ma_thue_bao
      });
      console.log(result.status);
      if (result.status == '201') {
        console.log('ok');
        onSuccess();
      }
    } catch (error) {
      toast.error(JSON.stringify(error));
    }
  };

  return (
    <div style={{ background: colors.white, borderRadius: 8, padding: 10 }}>
      <div style={{ fontWeight: 500, color: colors.blue[800], marginBottom: 4 }}>Tìm kiếm thuê bao oneBSS</div>
      <Select
        options={[]}
        fieldNames={{ label: 'TEN_DV', value: 'DONVI_ID' }}
        style={{ width: '40%' }}
        placeholder="Đơn vị"
        value={filter.DONVI_ID}
        onChange={e =>
          setFilter({
            ...filter,
            DONVI_ID: e
          })
        }
      ></Select>{' '}
      <Select
        options={[]}
        fieldNames={{ label: 'LOAIHINH_TB', value: 'LOAITB_ID' }}
        style={{ width: '40%' }}
        placeholder="Dịch vụ"
        showSearch
        filterOption={(input, option) => (option?.LOAIHINH_TB ?? '').toLowerCase().includes(input.toLowerCase())}
        value={filter.LOAITB_ID}
        onChange={e =>
          setFilter({
            ...filter,
            LOAITB_ID: e
          })
        }
      ></Select>{' '}
      <Button style={{ width: '15%' }} onClick={() => handleSearch()}>
        Tìm kiếm
      </Button>
      <div>
        {data?.map(ele => (
          <Flex
            key={ele.id}
            align="center"
            justify="space-between"
            style={{ borderBottom: '1px solid #ccc', fontWeight: 500, marginBottom: 6, borderRadius: 10, padding: 6 }}
          >
            <div>
              <div>Mã thuê bao: {ele?.MA_TB}</div>
              <div>Dịch vụ: {ele?.LOAIHINH_TB}</div>
              <div>Tên thuê bao: {ele?.TEN_TB}</div>
              <div>Gói cước: {ele?.GOI_CUOC}</div>
            </div>
            <Flex
              align="center"
              justify="center"
              style={{ cursor: 'pointer' }}
              onClick={() => handleAddThueBao(ele.MA_TB)}
            >
              <MdBookmarkAdd color={colors.blue[600]} size={22}></MdBookmarkAdd>
            </Flex>
          </Flex>
        ))}
      </div>
    </div>
  );
}

TimKiemThueBaoOne.propTypes = {};

export default TimKiemThueBaoOne;
