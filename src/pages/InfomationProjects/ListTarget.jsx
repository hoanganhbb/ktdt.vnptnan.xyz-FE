import React, { useRef, useState, useLayoutEffect } from 'react';
import PropTypes from 'prop-types';
import { Col, Flex, Row } from 'antd';
import { colors } from '../../utils/theme';
import dayjs from 'dayjs';
import { LuClock2 } from 'react-icons/lu';
import { BsFillPencilFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const listMonth = Array.from(Array(12).keys());

function ListTarget({ nhiem_vu_du_an, id }) {
  const navigate = useNavigate();
  const colEle = useRef();
  const [colWidth, setColWidth] = useState();

  useLayoutEffect(() => {
    console.log(colEle.current.getBoundingClientRect().width);
    setColWidth(colEle.current.getBoundingClientRect().width);
  }, []);

  return (
    <div
      style={{
        background: '#EBF8FF',
        justifyContent: 'space-between',
        borderRadius: 10,
        padding: '10px 16px 20px 16px',
        boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
      }}
    >
      {/* <div>{JSON.stringify(nhiem_vu_du_an)}</div> */}
      <Flex align="center" justify="space-between" style={{ fontWeight: 600, color: colors.primary, fontSize: 18 }}>
        MỤC TIÊU DỰ ÁN ({nhiem_vu_du_an.length})
        <Flex style={{ cursor: 'pointer', padding: '0 10px' }} onClick={() => navigate(`/duancntt/target/${id}`)}>
          <BsFillPencilFill color="#2C5282" size={18} />
        </Flex>
      </Flex>
      <div style={{ marginBottom: 10, color: colors.blue[900] }}>Hôm nay: {dayjs().format('DD/MM/YYYY')}</div>
      <div
        style={{
          borderRadius: 10,
          backgroundSize: '30px 30px',
          backgroundImage: `linear-gradient(to right, ${colors.gray[200]} 1px, transparent 1px),
      linear-gradient(to bottom, ${colors.gray[200]} 1px, transparent 1px)`,
          position: 'relative'
        }}
      >
        <div
          style={{
            position: 'absolute',
            height: '100%',
            width: 1,
            background: colors.red[600],
            left: dayjs().month() * colWidth + (colWidth / dayjs().daysInMonth()) * dayjs().date(),
            top: 0
          }}
        ></div>
        <Row>
          {listMonth.map((item, idx) => (
            <Col span={2} key={idx} ref={colEle}>
              <div
                style={{
                  padding: 10,
                  background: colors.blue[`${item < 9 ? item + 1 : 9}00`],
                  color: item > 5 ? colors.white : 'unset'
                }}
              >
                Tháng {item + 1}
              </div>
            </Col>
          ))}
        </Row>
        {nhiem_vu_du_an.map((item, idx) => (
          <div
            key={idx}
            style={{
              padding: 6,
              borderRadius: 8,
              width: 'max-content',
              maxWidth: colWidth * 12 - dayjs(item.ngay_hoan_thanh).month() * colWidth,
              overflow: 'hidden',
              minWidth: 300,
              boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
              background: item.trang_thai_nhiem_vu_cntt === 8 ? colors.red[400] : colors.teal[500],
              color: colors.white,
              marginBottom: 5,
              marginTop: 5,
              position: 'relative',
              left:
                dayjs(item.ngay_hoan_thanh).month() === 11
                  ? (dayjs(item.ngay_hoan_thanh).month() - 2) * colWidth
                  : dayjs(item.ngay_hoan_thanh).month() * colWidth
            }}
          >
            <div style={{ fontWeight: 600, marginBottom: 8, fontSize: 15 }}>{item.noi_dung}</div>
            <div style={{ marginBottom: 2 }}>Chủ trì: {item.don_vi_chu_tri_by_text}</div>
            <Flex align="center">
              <LuClock2 size={14} style={{ marginRight: 4 }} />
              {dayjs(item.ngay_hoan_thanh).format('DD/MM/YYYY')}
            </Flex>
          </div>
        ))}
      </div>
    </div>
  );
}

ListTarget.propTypes = {
  tien_do_du_an: PropTypes.object
};

export default ListTarget;
