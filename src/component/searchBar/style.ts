import styled from 'styled-components';

const StyledSearchBar = styled.div`
  display : grid;
  grid-template-columns : 5vh 1fr 5vh;
  margin : 1vh auto;
  margin-bottom : 4vh;
  height : 5vh;
  width : 80vw;
  background : #CBF3F0;
  border-radius : 10px;

  select {
    display : inline-block;
    color : #2EC4B6;
    background: #CBF3F0;
    font-size : 2.5vh;
    text-align : center;
    border: none;
    border-radius : 10px;
    -webkit-appearance: none; /* 네이티브 외형 감추기 */
    -moz-appearance: none;
    appearance: none;
    option {
      background : white;
    }
  }

  select:disabled {

  }

  input {
    display : inline-block;
    padding : 0 1vh;
    background : rgb(255, 255, 255, 0.5);
    border : none;
  }

  button {
    display : inline-block;
    margin : 1vh;
    color : rgb(0, 0, 0, 0);
    width : 3vh;
    height : 3vh;
    border : none;
    background : url(${process.env.PUBLIC_URL}/image/icon/search/search.png);
    background-size: cover;
  }
`;

export { StyledSearchBar };
