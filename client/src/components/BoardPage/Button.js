import styled, { css } from 'styled-components';
import { ReactComponent as Delete } from '../../images/icon/trash-solid.svg';
import { ReactComponent as EditAlt } from '../../images/icon/pen-to-square-solid.svg';

const sharedIconStyle = css`
  color: #23221e;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.1em 0.1em;
  border: 2px solid #23221e;
  border-radius: 3px;
  width: 30px;
  height: 30px;
  color: rgba(52, 137, 222, 0.8);

  &:hover {
    color: #ec589b;
    border: 2px solid #ec589b;
  }
`;

const EditAltButton = styled(EditAlt)`
  ${sharedIconStyle}
`;

const DeleteButton = styled(Delete)`
  ${sharedIconStyle}
`;

export { EditAltButton, DeleteButton };
