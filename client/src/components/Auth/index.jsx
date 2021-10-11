import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Overlay from './Overlay';

const showForm = keyframes`
  0%,
  49.99% {
    opacity: 0;
    z-index: 1;
  }

  50%,
  100% {
    opacity: 1;
    z-index: 5;
  }
`;

const AuthRoot = styled.div`
  /* COLORS */
  --white: #e9e9e9;
  --gray: #333;
  --blue: #0367a6;
  --lightblue: #008997;

  /* RADII */
  --button-radius: 0.7rem;

  /* SIZES */
  --max-width: 758px;
  --max-height: 420px;

  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;


  align-items: center;
  background-color: var(--white);
  background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg");
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: grid;
  height: 100vh;
  place-items: center;

  .container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .container--signin {
    transform: translateX(100%);
  }

  .container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
  }

  .container.right-panel-active .container--signup {
    animation: ${showForm} 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
  }

  .container.right-panel-active .container__overlay {
    transform: translateX(-100%);
  }


  .overlay {
    /* background-color: var(--lightblue); */
    /* background: url("https://res.cloudinary.com/dci1eujqw/image/upload/v1616769558/Codepen/waldemar-brandt-aThdSdgx0YM-unsplash_cnq4sb.jpg"); */
    background-color: rgba( 255, 255, 255, 0 );
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
    background-color: rgba(255, 255, 255 ,0);
  }

  .overlay--left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay--left {
    transform: translateX(0);
  }

  .overlay--right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay--right {
    transform: translateX(20%);
  }

  button:active {
    transform: scale(0.95);
  }

  button:focus {
    outline: none;
  }

`;

const Container = styled.div`
  background-color: rgba( 255, 255, 255, 0 ); // 투명하게
  border-radius: var(--button-radius);
  box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25),
    0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
  height: var(--max-height);
  max-width: var(--max-width);
  overflow: hidden;
  position: relative;
  width: 100%;

`;

const ContainerForm = styled.div`
  height: 100%;
  position: absolute;
  top: 0;
  transition: all 0.6s ease-in-out;

  form > button {
    margin-top: 1.5rem;
  }
`;

export default function Auth({ handleSession }) {
  const [active, setActive] = useState(false);

  // 회원가입, 로그인 보기 전환
  const handleActive = (bool) => setActive(bool);

  return (
    <AuthRoot>
      <Container className={active ? 'container right-panel-active' : 'container'}>
        <ContainerForm className="container--signup">
          <SignUp handleSession={handleSession} />
        </ContainerForm>
        <ContainerForm className="container--signin">
          <SignIn handleSession={handleSession} />
        </ContainerForm>
        <Overlay handleActive={handleActive} />
      </Container>
    </AuthRoot>
  );
}
