import React, { useContext, useState } from 'react';
// import PropTypes from 'prop-types'
import { Button, Col, Flex, Row } from 'antd';
// import { FaWallet } from 'react-icons/fa';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { collection, addDoc } from 'firebase/firestore';

import styles from './style.module.css';
import SelectTag from './SelectTag';
import dayjs from 'dayjs';
import dataFirebase from '../../utils/firebase';
import { DataContext } from '../../utils/dataAppContext';

function GhiChep() {
  const [isChiTien, setIsChiTien] = useState(true);
  const [selectCategoryId, setSelectCategoryId] = useState('');
  const [value, setValue] = useState('');
  const [currentDate, setCurrentDate] = useState(dayjs());
  const { fetchData } = useContext(DataContext);

  const hanldeChangeDate = target => {
    const newDate = target ? dayjs(currentDate).add(1, 'day') : dayjs(currentDate).subtract(1, 'day');
    setCurrentDate(dayjs(newDate));
  };

  const handleSubmit = async () => {
    console.log({
      ghi_chu: '',
      ngay_thuc_hien: dayjs(currentDate).format('YYYY-MM-DD'),
      so_tien: value,
      category: selectCategoryId
    });
    await addDoc(collection(dataFirebase, 'expenses'), {
      ghi_chu: '',
      ngay_thuc_hien: dayjs(currentDate).format('YYYY-MM-DD'),
      so_tien: value,
      category: selectCategoryId
    });
    fetchData();
  };

  return (
    <div>
      {/* <Flex justify="space-between" align="center" style={{ padding: 10, background: 'white', marginBottom: 6 }}>
        <FaWallet size={26} color="#2B6CB0" />
        <div style={{ fontSize: 24, fontWeight: 600, color: '#2B6CB0' }}>8,939,933đ</div>
      </Flex> */}
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: '16px 10px', background: 'white', marginBottom: 6 }}
      >
        <div onClick={() => hanldeChangeDate(0)}>
          <FaAngleLeft size={16} color="#0369a1" />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0369a1', textAlign: 'center' }}>
          {dayjs(currentDate).format('DD/MM/YYYY')}
        </div>
        <div onClick={() => hanldeChangeDate(1)}>
          <FaAngleRight size={16} color="#0369a1" />
        </div>
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        style={{ padding: 10, background: '#0284c7', marginBottom: 6, borderRadius: '0 0px 10px 10px' }}
      >
        <input
          className={styles.input_wrapper}
          placeholder="0"
          inputMode="numeric"
          value={
            value.toString()
              ? value
                .toString()
                .toString()
                .replaceAll(',', '')
                .split('')
                .reverse()
                .reduce((prev, next, index) => {
                  return (index % 3 ? next : next + ',') + prev;
                })
              : ''
          }
          onChange={e => {
            setValue(e.target.value.replaceAll(',', ''));
          }}
        ></input>
      </Flex>
      <Row
        style={{
          margin: 10,
          background: 'white',
          marginBottom: 6,
          border: '1px solid #e5e7eb',
          borderRadius: 10
        }}
      >
        <div
          style={{
            position: 'absolute',
            height: 30,
            width: 'calc((100vw - 20px) / 2)',
            borderRadius: 10,
            background: '#2B6CB0',
            transition: '200ms',
            transform: `translateX(${isChiTien ? '0' : '100%'})`
          }}
        ></div>
        <Col span={12}>
          <Flex
            justify="center"
            className={styles.tab_block}
            onClick={() => setIsChiTien(true)}
            style={{ color: isChiTien ? 'white' : '#2B6CB0' }}
          >
            Chi tiền
          </Flex>
        </Col>
        <Col span={12}>
          <Flex
            justify="center"
            className={styles.tab_block}
            onClick={() => setIsChiTien(false)}
            style={{ color: !isChiTien ? 'white' : '#2B6CB0' }}
          >
            Thu tiền
          </Flex>
        </Col>
      </Row>
      <Flex justify="space-between" align="center" style={{ padding: 10, background: 'white', marginBottom: 6 }}>
        <SelectTag setSelectCategoryId={setSelectCategoryId} selectCategoryId={selectCategoryId} />
      </Flex>
      <Flex justify="space-between" align="center" style={{ padding: '6px 10px 0 10px' }} onClick={handleSubmit}>
        <Button
          type="primary"
          style={{ height: 42, textTransform: 'uppercase', borderRadius: 10, background: '#57534e' }}
          block
        >
          <div style={{ fontWeight: 600, fontSize: 16, textAlign: 'center' }}>Nhập khoản chi</div>
        </Button>
      </Flex>
    </div>
  );
}

GhiChep.propTypes = {};

export default GhiChep;
