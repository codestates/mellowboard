import styled from 'styled-components';
import { ReactComponent as Close } from '../../../images/icon/xmark-solid.svg';

export default styled(Close)`
  position: fixed;
  color: black;
  width: 30px;
  height: 30px;
  margin: 5px;

  &:hover {
    color: #ec589b;
  }
`;
