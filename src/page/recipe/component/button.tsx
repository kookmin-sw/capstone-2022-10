import React from 'react';
import styled from 'styled-components';
import { Mode } from '../type';

type props = {
  mode: string;
  clickHandler: () => void;
};

const StyledButton = styled.button`
  border : none;
  background : #2EC4B6;
  overflow : hidden;
  bottom : 0;
  width : 100vw;
  height : 10vh;
  background : #2EC4B6;
  color : white;
  font-size : 5vw;
`;

const Button: React.FC<props> = ({ mode, clickHandler }) => {
  return (
    <StyledButton type="button" onClick={clickHandler}>
      {mode === Mode.CREATE ? '레시피 업로드' : '레시피 변경하기'}
    </StyledButton>
  );
};
export { Button };
