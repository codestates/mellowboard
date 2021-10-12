import styled from 'styled-components';

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: url(${(props) => props.img}) center center / cover no-repeat;
  width: 650px;
  height: 800px;
  margin: 80px;
  //width: 0rem;
  //margin: rem;
`;

export { ModalView };
