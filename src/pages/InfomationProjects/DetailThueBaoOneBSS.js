import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types'
import dayjs from 'dayjs';
import md5 from 'js-md5';
import axios from 'axios';
import { Flex } from 'antd';

function DetailThueBaoOneBSS({ ma_thue_bao }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const results = await axios.post(`https://cskh.vnptnghean.com.vn:1443/KTDT/CHITIET_TB_CNTT`, {
      MA_TB: ma_thue_bao,
      hashkeyInput: md5(
        `CNTT_${dayjs().format('YYYY')}${dayjs().format('MM')}${dayjs().format('DD')}${dayjs().format('HH')}`
      ).toLocaleUpperCase(),
      PAGE: 1,
      PAGESIZE: 100
    });
    setData(results.data.Data[0]);
  };

  useEffect(() => {
    if (!ma_thue_bao) return;
    fetchData();
  }, [ma_thue_bao]);

  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <Flex
          align="center"
          justify="space-between"
          key={value}
          style={{ borderBottom: '1px solid #ccc', paddingBottom: 4, marginBottom: 4 }}
        >
          <div style={{ fontWeight: 500 }}>{key}: </div>
          <div>{value}</div>
        </Flex>
      ))}
    </>
  );
}

DetailThueBaoOneBSS.propTypes = {};

export default DetailThueBaoOneBSS;
