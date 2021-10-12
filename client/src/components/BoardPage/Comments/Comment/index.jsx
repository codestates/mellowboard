import React, { useState } from 'react';
import axios from 'axios';
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

export default function Comment({
  comment,
  isMine,
  commentId,
  refreshHandler,
}) {
  const [editMode, setEditMode] = useState(false);
  const editHandler = () => {
    setEditMode(!editMode);
  };

  const [editedComment, setEditedComment] = useState(comment);

  const onChangeHandler = (event) => {
    setEditedComment(event.target.value);
  };
  const checkHandler = () => {
    axios({
      method: 'patch',
      url: '/comments',
      data: {
        commentId,
        comment: editedComment,
      },
    })
      .then((res) => {
        console.log(res.data.message);
        refreshHandler();
        setEditMode(!editMode);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteHandler = () => {
    axios({
      method: 'delete',
      url: '/comments',
      data: {
        commentId,
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

  if (isMine && !editMode) {
    return (
      <>
        <CommentList>
          <Label>{editedComment}</Label>
          <Wrapper>
            <EditAltButton onClick={editHandler} />
            <DeleteButton onClick={deleteHandler} />
          </Wrapper>
        </CommentList>
      </>
    );
  }
  if (isMine && editMode) {
    return (
      <>
        <CommentList>
          <TextArea value={editedComment} onChange={onChangeHandler} />
          <Wrapper>
            <CheckButton onClick={checkHandler} />
            <CancelButton onClick={editHandler} />
            <DeleteButton onClick={deleteHandler} />
          </Wrapper>
        </CommentList>
      </>
    );
  }
  return (
    <>
      <CommentList>
        <Label>{editedComment}</Label>
      </CommentList>
    </>
  );
}
