import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comment from './Comment';
import CommentsWrapper from './CommentsWrapper';
import Wrapper from './Wrapper';

export default function Comments() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios({
      method: 'get',
      url: '/comments/mypage',
      loading: false,
    })
      .then((res) => {
        // setComments(res.data.comments);
        setComments(res.data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const refreshHandler = async () => {
    await axios({
      method: 'get',
      url: '/comments/mypage',
    })
      .then((res) => {
        setComments(res.data.comments);
        // console.log(prevComments);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <CommentsWrapper>
        <Wrapper>
          {comments.map((el) => (
            <Comment
              key={el.id}
              comment={el.comment}
              commentId={el.id}
              refreshHandler={refreshHandler}
            />
          ))}
        </Wrapper>
      </CommentsWrapper>
    </>
  );
}
