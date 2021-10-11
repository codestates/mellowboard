import React, { useState } from 'react';
import axios from 'axios';
import TextBox from '../Comment/TextBox';
import Wrapper from '../Comment/Wrapper';
import { CheckButton } from '../Comment/Button';

export default function WritingComment() {
  const url = `${process.env.REACT_APP_API_URL}/comments`;
  const [comment, setComment] = useState('');
  const onChangeHandler = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };
  const writingCommentHandler = () => {
    axios({
      method: 'post',
      url,
      data: {
        postId: 1,
        comment,
      },
    })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Wrapper>
      <TextBox value={comment} onChange={onChangeHandler} />
      <CheckButton onClick={writingCommentHandler} />
    </Wrapper>
  );
}
