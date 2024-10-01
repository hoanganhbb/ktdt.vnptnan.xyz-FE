import styled from 'styled-components';

const UploadImageWrapper = styled.div`
  display: flex;
  position: relative;
  z-index: 3;
  overflow: hidden;

  label {
    padding: 5px;
    border: 1px dashed #0c356a;
    border-radius: 6px;
    justify-content: center;
    align-items: center;
    width: 25px;
    display: flex;
    z-index: 3;
    position: relative;
  }
`;

export { UploadImageWrapper };
