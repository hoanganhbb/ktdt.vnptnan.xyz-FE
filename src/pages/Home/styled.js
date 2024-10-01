import styled from 'styled-components';

export const HomeWrapper = styled.div`
  /* background: rgb(49, 143, 232);
  background: linear-gradient(0deg, rgba(49, 143, 232, 1) 0%, rgba(4, 59, 111, 1) 100%); */
  min-height: 100vh;
  /* background-image: url('https://i.pinimg.com/564x/16/f5/33/16f533be82bbc108034ba91d183ab91d.jpg'); */
  background-size: cover;
  background-position: 0 0;
  p,
  span,
  div {
    font-size: 15px;
  }

  .ant-divider {
    color: #fff;
    margin-bottom: 40px;
  }

  .ant-divider-with-text::after,
  .ant-divider-with-text::before {
    border-color: #fff;
  }

  .ant-divider-inner-text {
    font-weight: 600;
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
  top: -30px;
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
