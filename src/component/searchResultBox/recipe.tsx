import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTagString } from '../../helper';
import { ReadRecipeDTO } from '../../types/recipe';
import { StyledSRBox } from './style';

type props = {
  recipeData: ReadRecipeDTO;
};

const RecipeSearchResultBox: React.FC<props> = ({ recipeData }) => {
  const navigate = useNavigate();

  function clickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id } = event.currentTarget.dataset;
    navigate(`../../recipes/${id}`);
  }

  return (
    <StyledSRBox key={recipeData.id} data-id={recipeData.id} onClick={clickHandler} role="presentation">
      <div>
        <img
          className="thumbnail"
          src={recipeData.thumbnailUrl}
          alt="으악 사진이 없어요"
        />
      </div>
      <div className="recipeInfo">
        <h5>{recipeData.user.nickname}</h5>
        <h3>{recipeData.title}</h3>
        <p>{getTagString(recipeData.tags)}</p>
      </div>
    </StyledSRBox>
  );
};

export default RecipeSearchResultBox;
