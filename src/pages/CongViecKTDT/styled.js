import styled from 'styled-components';

export const HomeWrapper = styled.div`
  /* .action-wrapper {
    display: none;
  }

  .ant-table-row:hover .action-wrapper {
    display: flex;
  } */

  .popover-wrapper {
    display: inline-flex;
    align-items: center;
  }

  .ant-table-tbody > tr.ant-table-row:hover {
    cursor: pointer;
  }

  .ant-table-tbody > tr.ant-table-row:hover > td {
    background: none !important;
  }

  /* .table-striped-rows tr:nth-child(2n) td {
    background-color: #fbfbfb;
  } */
  .table-striped-rows thead {
    background-color: #f1f1f1;
  }

  .ant-table-row.task-expired {
    background: #ffcdd2;
  }

  .ant-radio-wrapper {
    line-height: 30px;
  }
`;

export const CenterBlock = styled.div`
  border-radius: 16px;
  padding: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CenterContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 10px 6px 16px 10px;
  padding-top: 40px;
  position: relative;

  .ant-btn > span {
    font-weight: 600;
    letter-spacing: 0.3px;
  }
`;

export const IconBlock = styled.div`
  position: absolute;
  left: 20px;
  /* top: -30px; */
  height: 60px;
  width: 60px;
  border-radius: 9999px;
  background: #fff;
  box-shadow: 2px 4px 10px 2px rgba(13, 71, 161, 0.2);
  /* transform: translateX(-50%); */
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LogoutBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
