import React, { useState } from 'react';
import { Mode } from '../../type';

import { RecipeIngredient } from '../../../../types/recipeIngredient';
import IngredientElement from './element';
import { Ingredient } from '../../../../types/ingredient';
import { StyledList } from '../style';

type props = {
  mode: Mode;
  recipeIngredients: RecipeIngredient[];
  setRecipeIngredients: React.Dispatch<React.SetStateAction<RecipeIngredient[]>>;
};

let nextId = 1;
const RecipeIngredientList: React.FC<props> = ({ mode, recipeIngredients, setRecipeIngredients }) => {
  const [renderer, setRenderer] = useState(0);

  function addElement() {
    setRecipeIngredients([...recipeIngredients, new RecipeIngredient(nextId, '', new Ingredient(-1, ''))]);
    nextId += 1;
  }

  function deleteElement(id: number) {
    setRecipeIngredients([...recipeIngredients.filter((recipeIngredient) => recipeIngredient.id !== id)]);
  }

  function setName(id: number, name: string) {
    recipeIngredients.some((recipeIngredient) => {
      if (recipeIngredient.id === id) {
        recipeIngredient.ingredient.name = name;
        setRenderer(renderer + 1);
        return true;
      }
      return false;
    });
  }

  function setAmount(id: number, amount: string) {
    recipeIngredients.some((recipeIngredient) => {
      if (recipeIngredient.id === id) {
        recipeIngredient.amount = amount;
        setRenderer(renderer + 1);
        return true;
      }
      return false;
    });
  }

  return (
    <StyledList>
      <div className="title">재료 및 필요한 양 :</div>
      {recipeIngredients &&
        recipeIngredients.map((recipeIngredient) => {
          nextId += 1;
          return (
            <IngredientElement
              mode={mode}
              id={recipeIngredient.id}
              recipeIngredient={recipeIngredient}
              deleteElement={deleteElement}
              setName={setName}
              setAmount={setAmount}
            />
          );
        })}
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <button className="add" type="button" onClick={addElement}>
          +
        </button>
      )}
    </StyledList>
  );
};

export { RecipeIngredientList };
