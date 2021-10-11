import React, { useState } from 'react';
import CommentList from './CommentList';
import Wrapper from './Wrapper';
import TextArea from './TextBox';
import Label from './Label';
import {
  CheckButton,
  CancelButton,
  EditAltButton,
  DeleteButton,
} from './Button';

export default function Comment({ comment, isMine }) {
  const [editMode, setEditMode] = useState(false);
  const editHandler = () => {
    setEditMode(!editMode);
  };
  // console.log(comment, isMine);

  if (isMine && !editMode) {
    return (
      <>
        <CommentList>
          <Label>{comment}</Label>
          <Wrapper>
            <EditAltButton onClick={editHandler} />
            <DeleteButton />
          </Wrapper>
        </CommentList>
      </>
    );
  }
  if (isMine && editMode) {
    return (
      <>
        <CommentList>
          <TextArea />
          <Wrapper>
            <CheckButton />
            <CancelButton />
            <DeleteButton />
          </Wrapper>
        </CommentList>
      </>
    );
  }
  return (
    <>
      <CommentList>
        <Label>{comment}</Label>
      </CommentList>
    </>
  );
}
