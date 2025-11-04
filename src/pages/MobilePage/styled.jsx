import styled from 'styled-components';

export const HomeWrapper = styled.div`
  font-size: 14px;
  flex: 1;
  padding-bottom: env(safe-area-inset-bottom); /* tránh bị che khuất bởi notch iPhone */

  .header-mobile-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background: #fff;
    border-bottom: 1px solid #ddd;
    align-items: center;
    z-index: 1000;
    padding-top: env(safe-area-inset-top);
  }

  .icon-button {
    cursor: pointer;
    padding: 8px;
    border-radius: 8px;
    background: #cccccc70;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .time-end-block {
    position: absolute;
    top: 10px;
    right: 12px;
    background: #c14f25;
    color: #fff;
    padding: 1px 6px 1px 6px;
    border-radius: 5px;
    font-weight: 600;
  }
`;
