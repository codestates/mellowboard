import styled from 'styled-components';

const ModalBackdrop = styled.div`
  margin: 0;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: url(${(props) => props.img}) center center / cover no-repeat;
  width: 650px;
  max-height: 100%;
  margin: 80px;
  @media screen and (max-width: 500px) {
    margin: 0;
    padding: 0;
    width: 100%;
  }
  //width: 0rem;
  //margin: rem;
`;

export { ModalView, ModalBackdrop };
