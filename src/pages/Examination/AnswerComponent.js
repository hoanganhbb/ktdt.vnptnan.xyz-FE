import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Typography } from 'antd';
import { CheckCircle } from 'react-feather';

function AnswerComponent({ listDapAn, data, onSubmit, onClose }) {
  const listDapAnRef = useRef(listDapAn);
  const [selectedDapAn, setSelectedDapAn] = useState(null);

  const handleSelectDapAn = (isLeave, ele) => {
    if (ele) setSelectedDapAn(ele);
    const answerID = ele ? ele.id : selectedDapAn.id;
    onSubmit(data.id, answerID);
    if (isLeave) onClose();
  };

  useEffect(() => {
    if (data.lua_chon_dap_an) setSelectedDapAn(listDapAn.find(ele => ele.id === data.lua_chon_dap_an));
  }, [data]);

  return (
    <div>
      <Typography.Paragraph style={{ marginTop: 4, marginBottom: 6, fontWeight: 500 }}>
        Chọn đáp án đúng:{' '}
      </Typography.Paragraph>
      {listDapAn &&
        listDapAnRef.current.map(ele => (
          <div
            key={ele.id}
            style={{
              border: '1px dashed #424242',
              borderRadius: 6,
              padding: 6,
              marginBottom: 10,
              borderColor: selectedDapAn && selectedDapAn.id === ele.id ? '#4CAF50' : '#424242',
              background: selectedDapAn && selectedDapAn.id === ele.id ? '#4CAF50' : 'white'
            }}
            className="flex-baseline-center"
            onClick={() => handleSelectDapAn(false, ele)}
          >
            <CheckCircle
              style={{ marginRight: 10 }}
              size={16}
              color={selectedDapAn && selectedDapAn.id === ele.id ? 'white' : '#424242'}
            ></CheckCircle>
            <Typography.Paragraph
              style={{ marginBottom: 0, color: selectedDapAn && selectedDapAn.id === ele.id ? 'white' : '#424242' }}
            >
              {ele.noi_dung}
            </Typography.Paragraph>
          </div>
        ))}
      {/* <Button type="primary" style={{ margin: '0px 0' }} block onClick={() => handleSelectDapAn(true)}>
        Xác nhận lựa chọn
      </Button> */}
      {/* <>{JSON.stringify(data)}</> */}
    </div>
  );
}

AnswerComponent.propTypes = {
  data: PropTypes.object,
  listDapAn: PropTypes.array
};

export default AnswerComponent;
