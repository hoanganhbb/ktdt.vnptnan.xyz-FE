import React, { useState, useEffect } from 'react';
import client from '../../utils/requestHttp';
import { Button, Input, Space } from 'antd';

function KeywordsManagement() {
  const [data, setData] = useState([]);
  const [inputKeyword, setInputKeyword] = useState('');

  const handleSubmitKeyword = value => {
    client.post(
      '/keywords/add',
      JSON.stringify({ value: value }),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  };

  const fetchData = async () => {
    const res = await client.get('/keywords');
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h3>Quản lý từ khóa lọc</h3>
      <Space style={{ marginBottom: 10 }}>
        <Input
          type="text"
          placeholder="Nhập thêm từ khóa"
          value={inputKeyword}
          onChange={e => setInputKeyword(e.target.value)}
        ></Input>
        <Button onClick={handleSubmitKeyword}>Thêm từ khóa</Button>
      </Space>
      <div
        style={{
          display: 'flex',
          flexFlow: 'wrap',
          border: '1px solid #B0BEC5',
          borderRadius: 6,
          padding: 8
        }}
      >
        {data.map(key => (
          <div
            style={{
              display: 'flex',
              flexFlow: 'wrap',
              color: 'white',
              backgroundColor: '#0f4871',
              borderRadius: 4,
              padding: '4px 12px'
            }}
            key={key._id}
          >
            {key.value}
          </div>
        ))}
      </div>
      {/* {JSON.stringify(data)} */}
    </div>
  );
}

export default KeywordsManagement;
