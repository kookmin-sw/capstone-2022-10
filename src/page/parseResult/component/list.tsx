import React from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { ingredientResultListAtom } from '../../../state';
import IngredientElement from './element';

const SearchIngredientList: React.FC = () => {
  const [ingredients, setIngredients] = useRecoilState(ingredientResultListAtom);

  function addElement() {
    setIngredients([...ingredients, '']);
  }

  function deleteElement(id: number) {
    setIngredients(ingredients.filter((_, index) => index !== id));
  }

  function setName(id: number, name: string) {
    setIngredients(ingredients.map((ingredient, idx) => (idx === id ? name : ingredient)));
  }

  return (
    <InputBox>
      {ingredients.map((ingredient, index) => (
        <IngredientElement id={index} ingredientName={ingredient} deleteElement={deleteElement} setName={setName} />
      ))}
      <AddIngredientButton src="image/icon/navBar/addRecipe.png" alt="addRecipe" onClick={addElement} />
    </InputBox>
  );
};

const AddIngredientButton = styled.img`
  display: block;
  width: 20%;
  padding: 2vh 0 2vh 0;
  margin: auto;
`;

const InputBox = styled.div`
  display: block;
  width: 50fr;
  margin: auto;
`;

export default SearchIngredientList;
