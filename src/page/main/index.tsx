import React, { useEffect, useState } from 'react';
import API from '../../api';

import Header from '../../component/header';
import NavigationBar from '../../component/navigationBar';
import { NotFound } from '../../component/notfound';
import SearchBar from '../../component/searchBar';
import ThumbnailBox from '../../component/thumbnailBox';
import { useSigninUser } from '../../hook';
import { ImagePath } from '../../static';

import { JWT } from '../../types/etc';
import { BaseRecipeDTO } from '../../types/recipe';
import { BaseUserDTO } from '../../types/user';
import { SThumbnailSection, Container, Title, StyledLink, StyledImg } from './style';

enum SectionTitle {
  RECOMMAND = '좋아요한 레시피와 비슷한 레시피',
  SUBSCRIBING_NEW = '구독한 쉐프의 새로운 레시피',
  TODAY_RANKING = '오늘 좋아요 랭킹 순',
  TODAY_CHEF = '오늘의 쉐프',
}

enum ErrorMessage {
  NO_SUBSCRIBING = '구독중인 쉐프가 존재하지 않습니다',
  NO_TODAY_UPLOADED = '오늘 등록된 레시피가 존재하지 않습니다',
}

const MainPage: React.FC = () => {
  const { getSigninUser, setSigninUser } = useSigninUser();
  const [recommendRecipe, setRecommendRecipe] = useState<BaseRecipeDTO[]>([]);
  const [subscribingChefNewRecipe, setSubscribingChefNewRecipe] = useState<BaseRecipeDTO[]>([]);
  const [mostLikedRecipe, setMostLikedRecipe] = useState<BaseRecipeDTO[]>([]);
  const [todayChef, setTodayChef] = useState<BaseUserDTO[]>([]);

  const subscribingChefNewRecipeBoxes =
    subscribingChefNewRecipe.length !== 0 ? (
      subscribingChefNewRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />)
    ) : (
      <NotFound>{ErrorMessage.NO_SUBSCRIBING}</NotFound>
    );
  const recommendRecipeBoxes = recommendRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />);
  const mostLikedRecipeBoxes =
    mostLikedRecipe.length !== 0 ? (
      mostLikedRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />)
    ) : (
      <NotFound>{ErrorMessage.NO_TODAY_UPLOADED}</NotFound>
    );
  const todayChefBoxes = todayChef.map((user) => <ThumbnailBox baseInfo={user} />);

  useEffect(() => {
    async function getCommonRecipeList() {
      const todayMostLikedChef = (await API.Recipe.read.todayMostLiked()).map(
        (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
      );
      setMostLikedRecipe(todayMostLikedChef);

      const todayRecommandChef = (await API.User.read.todayChef()).map(
        (user: BaseUserDTO) => new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl),
      );
      setTodayChef(todayRecommandChef);
    }
    async function getSigninRecipeList() {
      const recommendation = (await API.Recipe.read.recommendation()).map(
        (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
      );
      setRecommendRecipe(recommendation);

      const subscribeChefLatest = (await API.Recipe.read.subscribeChefLatest()).map(
        (recipe: BaseRecipeDTO) => new BaseRecipeDTO(recipe.id, recipe.title, recipe.thumbnailUrl),
      );
      setSubscribingChefNewRecipe(subscribeChefLatest);
    }
    async function getSigninUserInfo() {
      setSigninUser(await API.User.read.signinUserInfo());
    }

    getCommonRecipeList();
    if (getSigninUser().id !== -1) {
      getSigninRecipeList();
    } else if (localStorage.getItem(JWT)) {
      getSigninUserInfo().then(() => getSigninRecipeList());
    }
  }, []);

  return (
    <>
      <Header />
      <Container>
        <SearchBar />
        {getSigninUser().id !== -1 && (
          <>
            <StyledLink to="/recipes/new" className="addRecipe">
              <StyledImg width="10vw" src={`${ImagePath.Button.ADD_RECIPE}`} alt="레시피 업로드" />
            </StyledLink>
            <Title>{SectionTitle.RECOMMAND}</Title>
            <SThumbnailSection role="presentation">{recommendRecipeBoxes}</SThumbnailSection>
            <Title>{SectionTitle.SUBSCRIBING_NEW}</Title>
            <SThumbnailSection role="presentation">{subscribingChefNewRecipeBoxes}</SThumbnailSection>
          </>
        )}
        <Title>{SectionTitle.TODAY_RANKING}</Title>
        <SThumbnailSection role="presentation">{mostLikedRecipeBoxes}</SThumbnailSection>
        <Title>{SectionTitle.TODAY_CHEF}</Title>
        <SThumbnailSection role="presentation">{todayChefBoxes}</SThumbnailSection>
      </Container>
      <NavigationBar />
    </>
  );
};

export default MainPage;
