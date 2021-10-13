import styled from 'styled-components';

export default styled.ul`
  list-style: none;
  display: flex;
  min-width: 20rem;
  flex-direction: column;
  height: 100%;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    flex-wrap: wrap;
    max-width: 55rem;
  }
`;
