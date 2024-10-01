import React from 'react';
// import PropTypes from 'prop-types'
import { CATEGORY_CHI } from './constant';
import { Col, Flex, Row } from 'antd';
function SelectTag({ selectCategoryId, setSelectCategoryId }) {

  const handleSelect = (id) => {
    setSelectCategoryId(id)
  }

  return (
    <Row gutter={10}>
      {CATEGORY_CHI.map(ele => (
        <Col span={8} key={ele.id}>
          <Flex
            align="center"
            justify="center"
            style={{
              borderRadius: 10,
              border: '1px solid #E2E8F0',
              height: 50,
              marginBottom: 6,
              padding: 6,
              background: selectCategoryId === ele.id ? '#0369a1' : 'transparent',
              transition: '200ms'
            }}
            onClick={() => handleSelect(ele.id)}
          >
            <div
              style={{
                textAlign: 'center',
                color: selectCategoryId === ele.id ? 'white' : '#2C5282',
                fontSize: 13,
                fontWeight: 500,
              }}
            >

              {ele.name}
            </div>
          </Flex>
        </Col>
      ))}
    </Row>
  );
}

SelectTag.propTypes = {};

export default SelectTag;
