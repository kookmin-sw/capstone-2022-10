import React from 'react';
import styled from 'styled-components';
import { MultilineInput } from 'react-input-multiline';

import { Mode } from '../type';

type props = {
  mode: Mode;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
};

const StyledDescription = styled.div`
  margin : 2vw auto;
  font-size : 4vw;
  margin-bottom : 3vw;
  width : 80vw;

  .wrap {
    margin : 2vw 0;
    width : 76vw;
    border : 1px solid black;
    border-radius : 5px;
    padding : 2vw;
  }
  
  #input {
    width : 76vw;
  }
`;

const Description: React.FC<props> = ({ mode, description, setDescription }) => {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setDescription(e.currentTarget.value);
  }

  return (
    <StyledDescription>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <>
          <p>설명문</p>
          <div className="wrap">
            <MultilineInput id="input" placeholder="최대 150자 까지 입력 가능합니다" value={description} onChange={changeHandler} />
          </div>
        </>
      )}
      {description && mode === Mode.READ && <p>{description}</p>}
    </StyledDescription>
  );
};

export { Description };
