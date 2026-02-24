import styled from 'styled-components';
import { colors } from '../../utils/theme';
import { Layout } from 'antd';

export const LayoutWrapper = styled(Layout)`
  .cirle-box {
    display: flex;
    padding: 10px;
    height: 40px;
    width: 40px;
    background: #f5f5f5;
    border-radius: 9999px;
    align-items: center;
    justify-content: center;
    color: ${colors.primary};
  }

  .ant-menu-item-selected {
    background: #e0f2fe;
  }

  .ant-menu-item .ant-menu-title-content {
    font-weight: 500;
  }

  .ant-menu-item-selected .ant-menu-title-content {
    font-weight: 700;
  }
`;

export const MenuItemWrapper = styled.div`
  background: ${props => (props.isactive ? '#f5f5f5' : 'transparent')};
  height: 42px;
  line-height: 42px;
  border-radius: 10px 0 0 10px;
  color: ${props => (props.isactive ? colors.primary : 'white')};
  position: relative;
  padding-left: 10px;
  margin-bottom: 15px;
  cursor: pointer;
  display: flex;
  align-items: center;

  .top-dot {
    position: absolute;
    height: 20px;
    width: 30px;
    /* background: ${colors.primary}; */
    background: #f5f5f5;
    right: -5px;
    border-radius: 4px;
    top: -15px;

    &::after {
      position: absolute;
      content: '';
      height: 15px;
      width: 30px;
      background: ${colors.primary};
      border-radius: 0 0 20px 0;
      right: 5px;
      top: 0;
    }
  }

  .bottom-dot {
    position: absolute;
    height: 20px;
    width: 30px;
    /* background: ${colors.primary}; */
    background: #f5f5f5;
    right: -5px;
    border-radius: 4px;
    bottom: -20px;

    &::after {
      position: absolute;
      content: '';
      height: 20px;
      width: 30px;
      background: ${colors.primary};
      border-radius: 0 20px 0 0;
      right: 5px;
      top: 0px;
    }
  }

  .icon-wrap {
    width: 30px;
    text-align: center;
    margin-right: 15px;
    display: inline-flex;
    justify-content: center;
  }
`;
