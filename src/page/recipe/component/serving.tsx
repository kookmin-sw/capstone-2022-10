import React, { useRef } from 'react';
import styled from 'styled-components';
import { Mode } from '../type';

type props = {
  mode: Mode;
  serving: number;
  setServing: React.Dispatch<React.SetStateAction<number>>;
};

const StyledServe = styled.div`
  font-size : 3.5vw;
  margin-bottom : 2vw;
  div {
    width : 30vw;
    display : grid;
    grid-template-columns : 10vw 1fr;
    p {
      line-height : 6vw;
    }
    input {
      height : 5vw;
    }
  }
`;

const Serving: React.FC<props> = ({ mode, serving, setServing }) => {
  const selectRef = useRef<HTMLSelectElement>(null);

  function changeHandler() {
    setServing(Number(selectRef.current!.value));
  }

  return (
    <StyledServe>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <div>
          <p>기준 : </p>
          <select ref={selectRef} className="select" onChange={changeHandler}>
            <option value="1">1인분</option>
            <option value="2">2인분</option>
            <option value="3">3인분</option>
            <option value="4">4인분</option>
            <option value="5">5인분 이상</option>
          </select>
        </div>
      )}
      {serving && mode === Mode.READ && <p>기준 : {serving}인분</p>}
    </StyledServe>
  );
};

export { Serving };
