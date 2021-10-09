import styled from 'styled-components';
import { Button } from './Form';

const OverlayContainer = styled.div`
  height: 100%;
  left: 50%;
  overflow: hidden;
  position: absolute;
  top: 0;
  transition: transform 0.6s ease-in-out;
  width: 50%;
  z-index: 100;
`;

export default function Overlay({handleActive}) {
  return (
    <OverlayContainer className="container__overlay">
      <div className="overlay">
        <div className="overlay__panel overlay--left">
          <Button onClick={() => handleActive(false)}>Sign In</Button>
        </div>
        <div className="overlay__panel overlay--right">
          <Button onClick={() => handleActive(true)}>Sign Up</Button>
        </div>
      </div>
    </OverlayContainer>
  );
}
