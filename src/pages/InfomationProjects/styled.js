import styled from 'styled-components';

export const InfomationProjectsWrapper = styled.div`
  li {
    position: relative;
  }

  li::before {
    content: '';
    height: 12px;
    width: 12px;
    border-radius: 9999px;
    position: absolute;
    left: -25px;
    top: 0;
    background: #00897b;
    border: 6px solid #f5f5f5;
  }
`;
