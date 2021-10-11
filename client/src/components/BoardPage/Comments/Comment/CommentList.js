import styled from "styled-components";

export default styled.li`
  border: 1px solid black;
  margin: 1rem 1rem 1rem -1.5rem;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Serif KR';

  .close_btn {
    width: 1.5rem;
    margin-left: 94.5%;
  }

  .my_comment {
    display: flex;
    justify-content: space-between;
  }

  #input_btns_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;