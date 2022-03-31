import React, { useEffect, useState } from 'react';
import API from '../../api';
import NavigationBar from '../../component/navigationBar';
import SearchBar from '../../component/searchBar';
import ThumbnailBox from '../../component/thumbnailBox';
import { BaseRecipeDTO } from '../../types/recipe';
import { BaseUserDTO } from '../../types/user';
import { HeaderNavigationPage } from '../style';
import { SThumbnailSection } from './style';

type props = {
  signinUser: BaseUserDTO;
};

const MainPage: React.FC<props> = ({ signinUser }) => {
  const [recommendRecipe, setRecommendRecipe] = useState<BaseRecipeDTO[]>([]);
  const [subscribingChefNewRecipe, setSubscribingChefNewRecipe] = useState<BaseRecipeDTO[]>([]);
  const [mostLikedRecipe, setMostLikedRecipe] = useState<BaseRecipeDTO[]>([]);
  const [todayChef, setTodayChef] = useState<BaseUserDTO[]>([]);

  const subscribingChefNewRecipeBoxes = subscribingChefNewRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const recommendRecipeBoxes = recommendRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const mostLikedRecipeBoxes = mostLikedRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const todayChefBoxes = todayChef.map((user) => <ThumbnailBox baseInfo={user} />);

  function thumbnailClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    console.log(event);
  }

  useEffect(() => {
    async function getCommonRecipeList() {
      // '오늘 좋아요 랭킹순' 받아오기
      setMostLikedRecipe(
        (await API.Recipe.read.todayMostLiked()).map(
          (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
        ),
      );
      // '오늘의 쉐프' 받아오기
      setTodayChef(
        (await API.User.read.todayChef()).map((user: BaseUserDTO) => new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl)),
      );
    }
    async function getSigninRecipeList() {
      // '좋아요한 레시피와 비슷한 레시피' 받아오기
      setRecommendRecipe(
        (await API.Recipe.read.recommendation()).map(
          (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
        ),
      );
      // '구독한 쉐프의 새로운 레시피' 받아오기
      setSubscribingChefNewRecipe(
        (await API.Recipe.read.subscribeChefLatest()).map(
          (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
        ),
      );
    }
    getCommonRecipeList();
    getSigninRecipeList();
    if (signinUser.id !== -1) {
      //
    }
  }, []);

  return (
    <HeaderNavigationPage>
      <SearchBar />
      <SThumbnailSection role="presentation" onClick={thumbnailClickHandler}>
        {recommendRecipeBoxes}
      </SThumbnailSection>
      <SThumbnailSection role="presentation" onClick={thumbnailClickHandler}>
        {subscribingChefNewRecipeBoxes}
      </SThumbnailSection>
      <SThumbnailSection role="presentation" onClick={thumbnailClickHandler}>
        {mostLikedRecipeBoxes}
      </SThumbnailSection>
      <SThumbnailSection role="presentation" onClick={thumbnailClickHandler}>
        {todayChefBoxes}
      </SThumbnailSection>
      <NavigationBar />
    </HeaderNavigationPage>
  );
};

export default MainPage;
