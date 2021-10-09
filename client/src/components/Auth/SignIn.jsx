import React, { useState } from 'react';
import { Form, FormTitle, Input, Button } from './Form';

export default function SignIn() {
  const [formState, setFormState] = useState({
    id: '',
    password: '',
  });

  const handleFormChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Form>
      <FormTitle>Sign In</FormTitle>
      <Input type="ID" placeholder="ID" />
      <Input type="password" placeholder="password" />
      <Button className="btn">Sign in</Button>
    </Form>
  );
}
