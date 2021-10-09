import React, { useState } from 'react';
import { Form, FormTitle, Input, Button } from './Form';

export default function SignUp() {
  const [formState, setFormState] = useState({
    id: '',
    password: '',
    password2: '',
    email: '',
  });

  const handleFormChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const checkIdOverlap = (e) => {
    // ID중복검사
    e.preventDefault();
  };


  return (
    <Form>
      <FormTitle>Signup</FormTitle>
      <Input type="text" placeholder="User" />
      <Input type="email" placeholder="email" />
      <Input type="password" placeholder="password" />
      <Input type="password" placeholder="password 확인" />
      <Button>SignUp</Button>
    </Form>
  );
}
