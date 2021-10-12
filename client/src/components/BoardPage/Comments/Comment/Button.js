import styled, { css } from 'styled-components';
import { ReactComponent as Delete } from '../../../../images/icon/trash-can-solid.svg';
import { ReactComponent as EditAlt } from '../../../../images/icon/pen-to-square-solid.svg';
import { ReactComponent as Check } from '../../../../images/icon/circle-check-solid.svg';
import { ReactComponent as Cancel } from '../../../../images/icon/xmark-solid.svg';

const sharedIconStyle = css`
  color: #23221e;
  font-size: 1em;
  margin: 0.25em;
  padding: 0.1em 0.1em;
  border: 2px solid #23221e;
  border-radius: 3px;
  width: 20px;
  height: 20px;

  &:hover {
    color: #ec589b;
    border: 2px solid #ec589b;
  }
`;

const CheckButton = styled(Check)`
  ${sharedIconStyle}
`;
const CancelButton = styled(Cancel)`
  ${sharedIconStyle}
`;

const EditAltButton = styled(EditAlt)`
  ${sharedIconStyle}
`;

const DeleteButton = styled(Delete)`
  ${sharedIconStyle}
`;

export { CheckButton, CancelButton, EditAltButton, DeleteButton };
