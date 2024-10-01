import React, { useContext, useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import styled from 'styled-components';
import { Flex } from 'antd';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import dayjs from 'dayjs';
import { DataContext } from '../../utils/dataAppContext';
// import { formatCash } from '../../utils/constant';

const StyleWrapper = styled.div`
  background: white;
  height: 100%;

  .fc-scrollgrid {
    font-size: 11px;

    .fc-daygrid-event-dot {
      display: none;
    }

    .fc-daygrid-event-harness {
      font-size: 10px;
      height: 12px;
    }

    .fc-daygrid-day-top {
      flex-direction: row;
    }

    .fc-col-header-cell-cushion {
      font-weight: 500;
      color: #2b6cb0;
    }

    .fc-day-sun .fc-col-header-cell-cushion {
      color: red;
    }

    .fc-h-event .fc-event-title {
      text-align: right;
      width: 100%;
    }
  }
`;

function MoneyMonth() {
  const calendarRef = useRef();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dataList, setDataList] = useState([]);
  const { dataOut } = useContext(DataContext);

  const hanldeChangeDate = target => {
    const newDate = target
      ? dayjs(currentDate).add(1, 'month').format()
      : dayjs(currentDate).subtract(1, 'month').format();
    setCurrentDate(newDate);
    console.log(newDate);
    calendarRef.current.calendar.gotoDate(new Date(newDate));
  };

  useEffect(() => {
    const NumberDaysInMonth = dayjs(currentDate).daysInMonth();
    const ArrayDate = [];
    for (let index = 1; index <= NumberDaysInMonth; index++) {
      ArrayDate.push(dayjs(dayjs().date(index)).format('YYYY-MM-DD'));
    }
    const ArrayData = ArrayDate.map(date => {
      return {
        date,
        in: [],
        out: dataOut.filter(obj => obj.ngay_thuc_hien === date)
      };
    });
    setDataList(ArrayData);
    console.log('ArrayData', ArrayData);
    // dataOut.forEach(element => {
    //   calendarRef.current.calendar.addEvent({
    //     title: formatCash(dataOut
    //       .filter(ele => ele.ngay_thuc_hien === element.ngay_thuc_hien)
    //       .reduce((acc, currentValue) => acc + currentValue.so_tien, 0)), //formatCash(element.so_tien)
    //     start: element.ngay_thuc_hien,
    //     textColor: 'red'
    //   });
    // });
  }, [dataOut]);

  return (
    <StyleWrapper>
      <Flex justify="space-between" align="center" style={{ padding: 10, background: 'white' }}>
        <div onClick={() => hanldeChangeDate(0)}>
          <FaAngleLeft size={16} color="#0369a1" />
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: '#0369a1', textAlign: 'center' }}>
          {dayjs(currentDate).format('MM/YYYY')}
        </div>
        <div onClick={() => hanldeChangeDate(1)}>
          <FaAngleRight size={16} color="#0369a1" />
        </div>
      </Flex>
      {dataOut && !!dataOut.length && (
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin]}
          themeSystem="bootstrap5"
          initialView="dayGridMonth"
          firstDay={1}
          headerToolbar={false}
          initialDate={currentDate}
          showNonCurrentDates={false}
          fixedWeekCount={false}
          eventBackgroundColor="transparent"
          eventBorderColor="transparent"
          events={[
            dataOut.map(ele => {
              return {
                title: `ele.so_tien`,
                start: ele.ngay_thuc_hien,
                textColor: 'red'
              };
            })
          ]}
        />
      )}
      <div style={{ padding: 10, background: 'white' }}>
        {dataList.length}
        {dataList &&
          !!dataList.length &&
          dataList.map(data => {
            if (!(data.out.length || data.in.length)) return;
            return (
              <div key={data.date}>
                <div>{data.date}</div>
                <div>{data.out.length}</div>
              </div>
            );
          })}
      </div>
    </StyleWrapper>
  );
}

MoneyMonth.propTypes = {};

export default MoneyMonth;
