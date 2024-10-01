import React, { useEffect, useState } from 'react'
import styles from './style.module.css';
import { Flex } from 'antd';
import { FaHouse } from 'react-icons/fa6';
import { FaPen, FaReceipt } from 'react-icons/fa';
import { DataContext } from '../../utils/dataAppContext';
import dataFirebase from '../../utils/firebase';
import { collection, getDocs } from "firebase/firestore";

const HomeCustomizeWrapper = ({ children, setTabIndex }) => {
  const [dataOut, setDataOut] = useState([]);
  const [dataIn, setDataIn] = useState([]);

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(dataFirebase, "expenses"));
    const newData = []
    querySnapshot.forEach((doc) => {
      newData.push({
        id: doc.id,
        ...doc.data(),
      })
    });
    setDataOut(newData)
  }

  useEffect(() => {
    fetchData()
    console.log(dataOut);
  }, [])

  return <DataContext.Provider value={{ dataOut, setDataOut, setDataIn, dataIn, fetchData }}>
    <div className={styles.root}>
      {children}
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: 75,
          bottom: 0,
          background: 'white',
        }}
      >
        <Flex justify="space-between" style={{ padding: '0 20px', height: 60 }}>
          <Flex align="center" justify="center" onClick={() => setTabIndex(1)}>
            <FaHouse size={20} color="#2B6CB0" />
          </Flex>
          <Flex align="center" justify="center" onClick={() => setTabIndex(2)}>
            <FaPen size={20} color="#2B6CB0" />
          </Flex>
          <Flex align="center" justify="center">
            <FaReceipt size={20} color="#2B6CB0" onClick={() => setTabIndex(3)} />
          </Flex>
        </Flex>
      </div>
    </div>
  </DataContext.Provider>
}

export default HomeCustomizeWrapper