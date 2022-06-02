import React, { useState } from 'react';
import { RecipeDescription } from '../../../../types/recipeDescription';
import { Mode } from '../../type';
import DescriptionElement from './element';
import { StyledList } from '../style';
import { ImagePath } from '../../../../static';

type props = {
  mode: Mode;
  s3: AWS.S3;
  recipeDescriptions: RecipeDescription[];
  setRecipeDescriptions: React.Dispatch<React.SetStateAction<RecipeDescription[]>>;
};

const RecipeDescriptionList: React.FC<props> = ({ mode, s3, recipeDescriptions, setRecipeDescriptions }) => {
  const [renderer, setRenderer] = useState(0);

  function addElement() {
    setRecipeDescriptions([
      ...recipeDescriptions,
      new RecipeDescription(
        recipeDescriptions.length,
        '',
        `${process.env.PUBLIC_URL}${ImagePath.LOGO_TRANSPARENT}`,
        recipeDescriptions.length,
      ),
    ]);
  }

  function deleteElement(id: number) {
    setRecipeDescriptions([]);
    setTimeout(() => setRecipeDescriptions(recipeDescriptions.filter((recipeDescription) => recipeDescription.id !== id)));
  }

  function setDescription(id: number, description: string) {
    recipeDescriptions.some((recipeDescription) => {
      if (recipeDescription.id === id) {
        recipeDescription.imageDescription = description;
        setRenderer(renderer + 1);
        return true;
      }
      return false;
    });
  }

  function setImageUrl(id: number, imageUrl: string) {
    recipeDescriptions.some((recipeDescription) => {
      if (recipeDescription.id === id) {
        recipeDescription.imageUrl = imageUrl;
        setRenderer(renderer + 1);
        return true;
      }
      return false;
    });
  }

  return (
    <StyledList>
      <div className="title">조리 과정</div>
      {recipeDescriptions &&
        recipeDescriptions.map((description) => {
          return (
            <DescriptionElement
              mode={mode}
              id={description.id}
              imageUrl={description.imageUrl}
              imageDescription={description.imageDescription}
              s3={s3}
              deleteElement={deleteElement}
              setDescription={setDescription}
              setImageUrl={setImageUrl}
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

export { RecipeDescriptionList };
