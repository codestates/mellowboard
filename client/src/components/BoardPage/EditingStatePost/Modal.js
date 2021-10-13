import styled from 'styled-components';

export default styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  background: url(${(props) => props.img}) center center / cover no-repeat;
  height: 100%;
  min-height: 30rem;
`;
