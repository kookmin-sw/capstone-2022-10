import React from 'react';
import styled from 'styled-components';

type props = {
  id: number;
  ingredientName: string;
  deleteElement: (id: number) => void;
  setName: (id: number, value: string) => void;
};

const PLACE_HOLDER = '위쪽부터 재료를 입력해주세요.';

const SearchIngredientElement: React.FC<props> = ({ id, ingredientName, deleteElement, setName }) => {
  function setValue(e: React.ChangeEvent<HTMLInputElement>) {
    setName(id, e.currentTarget.value);
  }

  function remove() {
    deleteElement(id);
  }

  return (
    <InputBox>
      <InputName value={ingredientName} onChange={setValue} placeholder={PLACE_HOLDER} />
      <DeleteIngredient src="image/icon/edit/delete.png" alt="deleteIgredient" onClick={remove} />
    </InputBox>
  );
};

const InputName = styled.input`
  display: inline;
  font-size: 1rem;
  width: 80%;
  margin: 2vh auto 2vh 10vw;
  text-align: left;
  text-indent: 3%;
`;

const DeleteIngredient = styled.img`
  display: inline;
  padding: 2vh 4vw 2vh 2vw;
  margin: 0.5vh 1vw 0.5vh 1vw;
  width: 30%;
  grid-column-start: 2;
  grid-column-end: 3;
`;

const InputBox = styled.div`
  display: grid;
  grid-template-columns: 8fr 2fr;
  margin: auto;
`;

export default SearchIngredientElement;
