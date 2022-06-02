import styled from 'styled-components';

const RecipeContainer = styled.div`
    position : relative;
    padding : 15px;
    width : 80vw;
    margin : 10vh auto;
`;

export { RecipeContainer };

const StyledList = styled.div`
  .title {
    font-size : 3.5vw;
  }
  margin-bottom : 7vw;

  .add {
    display : block;
    margin : 0 auto;
    color : rgba(0,0,0,0);
    width : 6vw;
    height : 6vw;
    border : none;
    background : url(${process.env.PUBLIC_URL}/image/icon/edit/add.png);
    background-size : cover;
  }
`;

export { StyledList };

const StyledCancelButton = styled.div`
  position : fixed;
  top : 12vh;
  right : 5vw;
  display : grid;
  width : 10vw;
  grid-template-rows : 10vw 10vw;
  button {
    display : block;
    color : rgba(0,0,0,0);
    width : 8vw;
    height : 9vw;
    border : none;
    background : url(${process.env.PUBLIC_URL}/image/icon/edit/delete.png);
    background-size : cover;
  }

  span {
    display : block;
    width : 8vw;
    margin : 0 auto;
    font-weight : 600;
  }

`;

export { StyledCancelButton };
