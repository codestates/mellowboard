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
// import Avatar from "@material-ui/core/Avatar";
export default function Comment({ isLogin }) {
  const comment = {};
  comment.isMine = true;
  const [editMode, setEditMode] = useState(false);
  comment.comment = '아무거나 써봐';

  const editHandler = () => {
    setEditMode(!editMode);
  };

  if (comment.isMine && !editMode) {
    return (
      <>
        <CommentList>
          <Label>{comment.comment}</Label>
          <Wrapper>
            <EditAltButton onClick={editHandler} />
            <DeleteButton />
          </Wrapper>
        </CommentList>
      </>
    );
  }
  if (comment.isMine && editMode) {
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
        <Label>{comment.comment}</Label>
      </CommentList>
    </>
  );
}
