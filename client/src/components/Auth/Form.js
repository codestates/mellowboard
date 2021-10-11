import styled from 'styled-components';

export const Form = styled.form`
  background-color: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 3rem;
  height: 100%;
  text-align: center;
`;

export const ErrorMessage = styled.div`
  color: red;
  font-size: small;
  display: inline-block;
  width: 100%;
  text-align: left;
`;

export const FormTitle = styled.h2`
  font-weight: 300;
  margin: 0;
  margin-bottom: 1.25rem;
`;

export const Link = styled.a`
  color: var(--gray);
  font-size: 0.9rem;
  margin: 1.5rem 0;
  text-decoration: none;
`;

export const Input = styled.input`
  background-color: #fff;
  border: none;
  padding: 0.9rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
`;

export const Button = styled.button`
  background-color: var(--blue);
  background-image: linear-gradient(90deg, var(--blue) 0%, var(--lightblue) 74%);
  border-radius: 20px;
  border: 1px solid var(--blue);
  color: var(--white);
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: bold;
  letter-spacing: 0.1rem;
  padding: 0.9rem 4rem;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
`;
