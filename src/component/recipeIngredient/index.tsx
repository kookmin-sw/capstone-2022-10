import React from 'react';
import { RecipeIngredient } from '../../types/recipeIngredient';

type props = {
  data: RecipeIngredient;
};

const RecipeIngredientBox: React.FC<props> = ({ data }) => {
  return (
    <>
      <p className="이름">{data.ingredient.name}</p>
      <p className="수량">{data.amount}</p>
    </>
  );
};

export default RecipeIngredientBox;
