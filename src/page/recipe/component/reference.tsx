import React from 'react';
import styled from 'styled-components';
import { Mode } from '../type';

type props = {
  mode: Mode;
  referenceUrl: string;
  setReferenceUrl: React.Dispatch<React.SetStateAction<string>>;
};

const StyledReferenceUrl = styled.div`
  font-size : 3.5vw;
  margin-bottom : 2vw;
  div {
    display : grid;
    grid-template-columns : 18vw 1fr;
    p {
      line-height : 6vw;
    }
    input {
      padding-left : 2vw;
      height : 5vw;
    }
  }
`;


const ReferenceUrl: React.FC<props> = ({ mode, referenceUrl, setReferenceUrl }) => {
  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setReferenceUrl(e.currentTarget.value);
  }

  return (
    <StyledReferenceUrl>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <div>
          <p>참고 주소 : </p>
          <input value={referenceUrl} placeholder="참고 주소" onChange={changeHandler} />
        </div>
      )}
      {referenceUrl && mode === Mode.READ && <p>참고 주소 : {referenceUrl}</p>}
    </StyledReferenceUrl>
  );
};

export { ReferenceUrl };
