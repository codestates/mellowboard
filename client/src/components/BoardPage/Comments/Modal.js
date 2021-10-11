import styled from 'styled-components';

const ModalBackdrop = styled.div`
  margin: 0;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1rem;
  background: wheat center center / cover no-repeat;
  width: 650px;
  margin: 80px;
`;

export { ModalView, ModalBackdrop };
