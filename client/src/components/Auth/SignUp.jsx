import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {
  Form, FormTitle, Input, Button,
} from './Form';

const ErrorMessage = styled.div`
  color: red;
  font-size: small;
  display: inline-block;
  width: 100%;
  text-align: left;
`;

export default function SignUp({ handleSession }) {
  const [formState, setFormState] = useState({
    userId: '',
    password: '',
    password2: '',
    email: '',
  });
  const [errorMsg, setErrorMsg] = useState({
    userId: '',
    email: '',
    password: '',
    password2: '',
  });

  const handleErrorMsg = (target, message) => {
    /**
     * 유효성 검사 실패시 에러 메세지를 출력하는 핸들러
     */
    setErrorMsg({
      ...errorMsg,
      [target]: message,
    });
  };

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    // 입력을 시작하면 에러메세지를 지움
    handleErrorMsg(e.target.name, '');
    if (e.target.name === 'password2' && formState.password !== e.target.value) {
      handleErrorMsg('password2', '패스워드가 일치하지 않습니다.');
    }
  };

  const handleSignUp = async (e) => {
    /**
     * 사용자 입력값 유효성 검사 및 회원가입 API 요청 핸들러
     */
    e.preventDefault();
    const form = document.querySelector('#signupForm');
    // 입력값 검사
    if (!formState.userId) {
      form.userId.focus();
      handleErrorMsg('userId', 'ID를 입력해주세요');
      return;
    }
    const idRegExp = /^[a-zA-z0-9]{4,12}$/;
    if (!idRegExp.test(formState.userId)) {
      form.userId.focus();
      handleErrorMsg('userId', '영문자와 숫자를 이용해 4~12자리로 입력해야 합니다.');
      return;
    }


    if (!formState.email) {
      form.email.focus();
      handleErrorMsg('email', '이메일 주소를 입력해주세요.');
      return;
    }
    const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
    if (!emailRegExp.test(formState.email)) {
      form.email.focus();
      handleErrorMsg('email', '올바른 이메일 주소를 입력해주세요.');
      return;
    }

    if (!formState.password) {
      form.password.focus();
      handleErrorMsg('password', '비밀번호를 입력해주세요.');
      return;
    }

    if (formState.password.length < 8) {
      form.password.focus();
      handleErrorMsg('password', '비밀번호는 8자 이상 입력해주세요.');
      return;
    }

    if (!formState.password2) {
      form.password2.focus();
      handleErrorMsg('password2', '비밀번호를 한번 더 입력해주세요');
      return;
    }
    // 아이디가 중복인지 확인
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/overlap`,
      { params: { id: formState.userId } });

    if (!res.data.result) {
      handleErrorMsg('userId', '중복된 ID 입니다.');
      return;
    }

    // 회원가입 API
    axios.post(`${process.env.REACT_APP_API_URL}/auth/signup`, formState)
      .then((res) => {
        if (!res.data.result) return;
        handleSession(res.data.accessToken);
        // 회원가입 성공알림.. 모달에 연결하면 모달을 닫는 부분 추가해야함
        alert("회원가입에 성공했습니다.");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Form id="signupForm">
      <FormTitle>Signup</FormTitle>
      <Input type="text" placeholder="User" name="userId" value={formState.userId} onChange={handleFormChange} />
      <ErrorMessage>{errorMsg.userId}</ErrorMessage>
      <Input type="email" placeholder="email" name="email" value={formState.email} onChange={handleFormChange} />
      <ErrorMessage>{errorMsg.email}</ErrorMessage>
      <Input type="password" placeholder="password" name="password" value={formState.password} onChange={handleFormChange} />
      <ErrorMessage>{errorMsg.password}</ErrorMessage>
      <Input type="password" placeholder="password 확인" name="password2" value={formState.password2} onChange={handleFormChange} />
      <ErrorMessage>{errorMsg.password2}</ErrorMessage>
      <Button onClick={handleSignUp}>SignUp</Button>
    </Form>
  );
}
