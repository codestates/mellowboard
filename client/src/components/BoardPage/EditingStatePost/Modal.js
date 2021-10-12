import styled from 'styled-components';

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: url(${(props) => props.img}) center center / cover no-repeat;
  height: 100%;
  //width: 0rem;
  //margin: rem;
`;

export { ModalView };
