import React from 'react';
import styled from 'styled-components';
import PostBackground from '../../images/background/03.png';

const MyPostList = styled.li`
  background: url(${PostBackground}) center center / cover no-repeat;
  /* border: 3px solid blue; */
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 1rem -1.4rem;
  border-radius: 0.5rem;
  color: white;

  @media screen and (min-width: 768px) {
    width: 50%;
    margin: 1rem -2rem;

    :nth-child(2n) {
      margin-left: 3.5rem;
    }
  }

  #hash_btn_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  #hash_tags {
    border: 3px solid orange;
    margin: 3rem;
    display: flex;
  }

  .hash_tag {
    border: 3px solid purple;
    margin-left: 0.5rem;
    font-size: 2rem;
  }

  #btn_container {
    margin-right: 1rem;
  }

  #top_btns {
    display: flex;
    justify-content: space-between;
  }

  #background_btn {
    margin-left: 50%;
    margin-top: 1rem;
    width: 5rem;
    cursor: pointer;
  }

  #close_btn {
    height: 1.5rem;
    cursor: pointer;
  }
`;

const PostText = styled.p`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 3rem;
`;

const TextArea = styled.textarea`
  margin: 3rem 5rem;
  border: 3px solid green;
  font-family: 'Noto Serif KR';
  font-size: 3rem;
  height: 60rem;
  opacity: 0.4;
`;

export default function MyPosts() {
  return (
    <>
      <MyPostList>
        <PostText>
          사랑과 가슴속에 이네들은 이 헤일 강아지, 부끄러운 봅니다. 하나의
          비둘기, 하나에 봄이 책상을 동경과 별 어머니, 봅니다. 딴은 이제 별에도
          이름자를 까닭입니다. 이름과, 시와 별빛이 한 북간도에 소학교
          버리었습니다. 다하지 별이 내린 이름자를 하나에 추억과 쓸쓸함과 것은
          거외다. 그러나 한 내 어머니 이런 시와 지나가는 아무 봅니다. 없이
          어머님, 강아지, 부끄러운 별 어머님, 그러나 까닭입니다. 책상을
          까닭이요, 별이 하나에 봄이 이름을 아름다운 별 까닭입니다. 아이들의
          시인의 당신은 가을로 계십니다. 하나에 사람들의 별이 계십니다.
        </PostText>
        <div id="hash_btn_container">
          <div id="hash_tags">
            <span className="hash_tag"># hash</span>
            <span className="hash_tag"># tag</span>
          </div>
          <span id="btn_container">
            <button id="modify_btn">수정</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
      <MyPostList>
        <div id="top_btns">
          <button id="background_btn">배경 선택</button>
          <button id="close_btn">&times;</button>
        </div>
        <TextArea />
        <div id="hash_btn_container">
          <div id="hash_tags">
            <input className="input_hash_tag" value="#" placeholder="#" />
            <input className="input_hash_tag" placeholder="#" />
          </div>
          <span id="btn_container">
            <button id="modify_btn">확인</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
      <MyPostList>
        <PostText>
          대통령은 법률이 정하는 바에 의하여 훈장 기타의 영전을 수여한다.
          헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
          헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야
          한다. 모든 국민은 소급입법에 의하여 참정권의 제한을 받거나 재산권을
          박탈당하지 아니한다. 국가는 지역간의 균형있는 발전을 위하여 지역경제를
          육성할 의무를 진다. 모든 국민은 양심의 자유를 가진다. 법률안에 이의가
          있을 때에는 대통령은 제1항의 기간내에 이의서를 붙여 국회로 환부하고,
          그 재의를 요구할 수 있다. 국회의 폐회중에도 또한 같다. 법관은 탄핵
          또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지 아니하며,
          징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을 받지
          아니한다.
        </PostText>
        <div id="hash_btn_container">
          <div id="hash_tags">
            <span className="hash_tag"># hash</span>
            <span className="hash_tag"># tag</span>
          </div>
          <span id="btn_container">
            <button id="modify_btn">수정</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
      <MyPostList>
        <div id="top_btns">
          <button id="background_btn">배경 선택</button>
          <button id="close_btn">&times;</button>
        </div>
        <TextArea />
        <div id="hash_btn_container">
          <div id="hash_tags">
            <input className="input_hash_tag" value="#" placeholder="#" />
            <input className="input_hash_tag" placeholder="#" />
          </div>
          <span id="btn_container">
            <button id="modify_btn">확인</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
      <MyPostList>
        <PostText>
          정당은 법률이 정하는 바에 의하여 국가의 보호를 받으며, 국가는 법률이
          정하는 바에 의하여 정당운영에 필요한 자금을 보조할 수 있다.
          헌법재판소의 장은 국회의 동의를 얻어 재판관중에서 대통령이 임명한다.
        </PostText>
        <div id="hash_btn_container">
          <div id="hash_tags">
            <span className="hash_tag"># hash</span>
            <span className="hash_tag"># tag</span>
          </div>
          <span id="btn_container">
            <button id="modify_btn">수정</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
      <MyPostList>
        <div id="top_btns">
          <button id="background_btn">배경 선택</button>
          <button id="close_btn">&times;</button>
        </div>
        <TextArea />
        <div id="hash_btn_container">
          <div id="hash_tags">
            <input className="input_hash_tag" value="#" placeholder="#" />
            <input className="input_hash_tag" placeholder="#" />
          </div>
          <span id="btn_container">
            <button id="modify_btn">확인</button>
            <button id="delete_btn">삭제</button>
          </span>
        </div>
      </MyPostList>
    </>
  );
}
