import styled from 'styled-components';
import { Card } from 'antd';

export const CardWrapper = styled(Card)`
  border-radius: 20px;
  margin-bottom: 10px;

  .container {
    /* display: flex; */
    /* justify-content: space-between; */
    /* align-items: center; */
  }

  .ant-card-head {
    background: #eeeeee;
    border-radius: 20px 20px 0 0;
  }

  .ant-card-head-title {
    font-weight: 600;
  }

  .ant-card-body {
    padding: 6px;
  }

  .ant-divider-horizontal {
    margin: 6px 0;
  }
`;

export const HomeWrapper = styled.div`
  .timecounter {
    position: fixed;
    background: rgba(18, 83, 144, 1);
    border-radius: 8px;
    font-size: 20px;
    z-index: 999;
    color: #fff;
    padding: 10px 0px;
    left: 0;
    top: 0;
    width: 100vw;
    font-weight: 600;
    /* width: 80px; */
    text-align: center;
    box-shadow: 2px 2px 5px 2px rgba(98, 83, 144, 0.9);
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
  }

  min-height: 100vh;
  background: rgb(49, 143, 232);
  background: linear-gradient(0deg, rgba(49, 143, 232, 1) 0%, rgba(18, 83, 144, 1) 100%);
  padding-top: 60px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const ViewImageWrapper = styled.div`
  padding: 5px;
  border: 1px dashed #0c356a;
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  width: 25px;
  display: flex;
  margin-left: 6px;
`;
