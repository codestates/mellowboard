import React, { useState } from 'react';
import axios from 'axios';
import TextBox from './TextBox';
import Wrapper from './Wrapper';
import { CheckButton } from '../Comment/Button';

export default function WritingComment({ refreshHandler }) {
  const [comment, setComment] = useState('');
  const onChangeHandler = (event) => {
    setComment(event.target.value);
    console.log(comment);
  };
  const writingCommentHandler = () => {
    axios({
      method: 'post',
      url: '/comments',
      data: {
        postId: 1,
        comment,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        refreshHandler();
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
