import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  width: 80vw;
  margin: 0 auto;
`;

const SThumbnailSection = styled.div`
display: grid;
width : 80vw;
grid-template-columns: repeat(3, 1fr);
grid-template-rows: repeat(2, 30vw);
background : none; /*#EEEEEE*/
gap : 3vw 2vw;
margin : 3vh auto;
margin-bottom : 5vh;
}
`;

const Container = styled.body`
  position: relative;
  margin: 10vh 0 8vh 0;
  padding: 15px;

  @media all and (min-aspect-ratio: 400/650) {
    .addRecipe {
      width: 10vh;
      display: grid;
      grid-template-rows: 7vh 1fr;
      img {
        margin: 0 auto;
        width: 6vh;
        height: 6vh;
      }
      span {
        font-size: 2.5vh;
      }
    }
  }
`;

const StyledLink = styled(Link)`
  display: block;
  position: fixed;
  width: 10vw;
  height: 10vw;
  right: 5vw;
  bottom: 15vh;
  text-align: center;
  text-decoration: none;
  span {
    font-size: 3vw;
    color: #26e07f;
  }
`;

const StyledImg = styled.img`
  width: ${(props) => props.width};
`;

StyledImg.defaultProps = {
  src: 'image/icon/header',
};

export { StyledImg, StyledLink, Container, Title, SThumbnailSection };
