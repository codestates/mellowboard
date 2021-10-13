import styled, { css } from 'styled-components';
import { ReactComponent as Write } from './images/icon/feather-pointed-solid.svg';
// import { ReactComponent as Write } from './images/icon/pen-fancy-solid.svg';

const sharedIconStyle = css`
  color: #23221e;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.1em 0.1em;
  //border: 2px solid #23221e;
  border-radius: 3px;
  width: 50px;
  height: 50px;
  color: blanchedalmond;

  &:hover {
    color: #eccb58;
    //border: 2px solid #ec589b;
  }
`;

export default styled(Write)`
  ${sharedIconStyle}
`;
