import React from 'react';
import styled from 'styled-components';

import { RecipeIngredient } from '../../../../types/recipeIngredient';
import { Mode } from '../../type';

enum Input {
  NAME = 'NAME',
  AMOUNT = 'AMOUNT',
}

type props = {
  mode: Mode;
  id: number;
  recipeIngredient: RecipeIngredient;
  deleteElement: (id: number) => void;
  setName: (id: number, value: string) => void;
  setAmount: (id: number, value: string) => void;
};

const StyledElement = styled.div`
  margin : 2vw 0;
  width : 80vw;
  display : grid;
  grid-template-columns : 5vw 3fr 2fr 5vw;
  background : #EEEEEE;
  border-radius : 3px;

  span {
    padding : 0 2vw;
    font-size : 4.5vw;
    font-weight : 600;
  }

  input {
    width : 50%;
  }

  input:disabled {
    background : none;
    display : block;
    font-size : 3.5vw;
    width : 100%;
    line-height : 5vw;
    border : 0 solid black;
    color : black;
  }

  #amount {
    text-align : center;
    margin : 0 auto;
  }

  #amount:disabled {
    text-align : right;
  }

  button {
    color : rgba(0, 0, 0, 0);
    border : none;
    margin-top : 1vw;
    width : 4vw;
    height : 4vw;
    background : url(${process.env.PUBLIC_URL}/image/icon/edit/delete.png);
    background-size : cover;
  }
`;

const RecipeIngredientElement: React.FC<props> = ({ mode, id, recipeIngredient, deleteElement, setName, setAmount }) => {
  function setValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.className === Input.NAME) {
      setName(id, e.currentTarget.value);
    } else if (e.currentTarget.className === Input.AMOUNT) {
      setAmount(id, e.currentTarget.value);
    }
  }

  function deleteHandler() {
    deleteElement(id);
  }

  return (
    <StyledElement>
      <span>·</span>
      <input
        className={`${Input.NAME}`}
        value={recipeIngredient.ingredient.name}
        onChange={setValue}
        placeholder="재료 이름"
        disabled={mode === Mode.READ}
      />
      <input
        id="amount"
        className={`${Input.AMOUNT}`}
        value={recipeIngredient.amount}
        onChange={setValue}
        placeholder="수량"
        disabled={mode === Mode.READ}
      />
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <button type="button" onClick={deleteHandler}>
          X
        </button>
      )}
    </StyledElement>
  );
};

export default RecipeIngredientElement;
