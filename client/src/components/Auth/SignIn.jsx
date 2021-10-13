import React, { useState } from 'react';
import axios from 'axios';
// import {axios} from '../../App';
import { Form, FormTitle, Input, Button, ErrorMessage } from './Form';

export default function SignIn({ handleSession, openAuthHandler }) {
  const [formState, setFormState] = useState({
    userId: '',
    password: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
    setErrorMsg('');
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    axios
      .post('/auth/signin', formState)
      .then((res) => {
        handleSession(res.data.accessToken);
        // 로그인 성공 이후 모달을 닫는 등의 추가가 필요함
        // alert('로그인에 성공했습니다.');
        openAuthHandler();
      })
      .catch((err) => {
        try {
          const { status } = err.response;
          if (status >= 400 && status < 500) {
            setErrorMsg('아이디와 비밀번호를 확인해주세요.');
            setTimeout(() => setErrorMsg(''), 5000);
          } else {
            setErrorMsg('통신에 문제가 발생했습니다. 잠시 후 시도해주세요.');
          }
        } catch (err) {
          setErrorMsg('통신에 문제가 발생했습니다. 잠시 후 시도해주세요.');
          console.log(err);
        }
      });
  };

  return (
    <Form>
      <FormTitle>Sign In</FormTitle>
      <Input
        type="ID"
        placeholder="ID"
        name="userId"
        value={formState.userId}
        onChange={handleFormChange}
      />
      <Input
        type="password"
        placeholder="password"
        name="password"
        value={formState.password}
        onChange={handleFormChange}
      />
      <ErrorMessage>{errorMsg}</ErrorMessage>
      <Button className="btn" onClick={handleSignIn}>
        Sign in
      </Button>
    </Form>
  );
}
