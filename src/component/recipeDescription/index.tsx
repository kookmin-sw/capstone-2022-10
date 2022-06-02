import React from 'react';
import { ImagePath } from '../../static';
import { RecipeDescription } from '../../types/recipeDescription';

type props = {
  data: RecipeDescription;
};

const RecipeDescriptionBox: React.FC<props> = ({ data }) => {
  return (
    <div>
      <div>
        <img src={data.imageUrl} alt={`${ImagePath.LOGO}`} />
      </div>
      <div>
        <p>{data.imageDescription}</p>
      </div>
    </div>
  );
};

export default RecipeDescriptionBox;
