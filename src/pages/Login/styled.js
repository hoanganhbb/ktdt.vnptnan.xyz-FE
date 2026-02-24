/* eslint-disable max-len */
import styled from 'styled-components';

export const LoginWrapper = styled.div`
  background: linear-gradient(135deg, #0c356a 0%, #2456ba 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  .ant-btn > span {
    font-weight: 600;
  }
`;

export const LoginDestopWrapper = styled.div`
  background: linear-gradient(135deg, #0c356a 0%, #2456ba 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }

  .ant-btn > span {
    font-weight: 600;
  }

  .center-block {
    display: flex;
    flex-direction: row;
    gap: 60px;
    width: 100%;
    max-width: 1200px;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
  }

  .login-section {
    flex: 1;
    min-width: 0;
    animation: slideInLeft 0.8s ease-out;
  }

  .form-section {
    flex: 0 0 480px;
    min-width: 0;
    animation: slideInRight 0.8s ease-out;
  }

  @keyframes slideInLeft {
    from {
      transform: translateX(-50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(50px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @media (max-width: 1024px) {
    .center-block {
      gap: 30px;
    }

    .form-section {
      flex: 0 0 380px;
    }
  }

  @media (max-width: 768px) {
    padding: 20px 16px;

    .center-block {
      flex-direction: column;
      gap: 24px;
    }

    .login-section {
      display: none;
    }

    .form-section {
      flex: 1;
      width: 100%;
      max-width: 100%;
      animation: slideInUp 0.6s ease-out;
    }
  }

  @keyframes slideInUp {
    from {
      transform: translateY(30px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
