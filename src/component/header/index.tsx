import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHeader = styled.header`
//mobile  
position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  background: #ff9f1c;
  margin: 0;
  box-shadow : 0px 5px 10px #adadad;
  display : grid;
  grid-template-columns: 1fr 2fr 1fr;
`;

const StyledImg = styled.img`
  width: ${(props) => props.width};
  display: block;
  margin: auto;
`;

StyledImg.defaultProps = {
  src: 'image/icon/header',
};

const StyledLink = styled(Link)`
  display: block;
  margin: auto;
  text-align: center;
`;

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  console.log(pathname);
  return (
    <StyledHeader>
      <StyledLink to="/">
        {
          pathname !== '/'
          ? <StyledImg width="30px" src="image/icon/header/goBack.png" onClick={() => navigate(-1)} />
          : null
        }
      </StyledLink>
      <StyledImg width="100px" src="image/icon/header/headerLogo.png" />
      <StyledLink to="/">
        {
          pathname !== '/'
          ? <StyledImg width="50px" src="image/icon/header/home.png" />
          : null
        }
      </StyledLink>
    </StyledHeader>

  );
};

export default Header;
