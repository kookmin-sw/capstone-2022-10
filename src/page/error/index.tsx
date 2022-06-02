import React from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import { ImagePath } from '../../static';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  function clickHandler() {
    navigate('/');
  }

  return (
    <StyledDiv>
      <div>
        <h1>문제가 발생했습니다.</h1>
        <h1>문제가 계속되는 경우, 관리자에게 알려주세요</h1>
      </div>
      <button type="button" onClick={clickHandler}>
        이전으로
      </button>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  background-image: linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${ImagePath.Status.ERORR});
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  div {
    margin-bottom: 10vh;
    height: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
`;

export default ErrorPage;
