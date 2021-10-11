import styled, { css } from 'styled-components';
import { Delete } from 'styled-icons/fluentui-system-filled';
import { EditAlt } from 'styled-icons/boxicons-regular';
import { Check } from 'styled-icons/bootstrap';
import { Cancel } from 'styled-icons/material';

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
