import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../api';
import RecipeSearchResultBox from '../../component/searchResultBox/recipe';
import UserSearchResultBox from '../../component/searchResultBox/user';
import { ReadRecipeDTO } from '../../types/recipe';
import { ReadUserDTO } from '../../types/user';
import Header from '../../component/header';
import NavigationBar from '../../component/navigationBar';
import { PageTitle } from '../../component/searchResultBox/style';
import { Container } from '../main/style';
import { DataType, SearchType } from '../../types/enum';

import { NotFound } from '../../component/notfound';

const SearchResultPage: React.FC = () => {
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const [params] = useSearchParams();
  const naviagate = useNavigate();
  const domain = location.pathname.split('/')[1];
  const [name, value] = params
    .toString()
    .split('=')
    .map((chunk) => decodeURI(chunk));

  const searchResultBoxes =
    searchResults.length !== 0 ? (
      searchResults.map((data: ReadRecipeDTO | ReadUserDTO) => {
        return 'title' in data ? <RecipeSearchResultBox recipeData={data} /> : <UserSearchResultBox userData={data} />;
      })
    ) : (
      <NotFound>검색 결과가 존재하지 않습니다</NotFound>
    );

  useEffect(() => {
    async function search() {
      if (domain === DataType.USER) {
        setSearchResults(await API.User.read.byNickname(value));
      } else if (domain === DataType.RECIPE) {
        if (name === SearchType.RECIPE_TITLE) {
          setSearchResults(await API.Recipe.read.byTitle(value));
        } else if (name === SearchType.TAG) {
          setSearchResults(await API.Recipe.read.byTag(value));
        } else if (name === SearchType.INGREDIENT) {
          if (value.charAt(0) !== '[') {
            setSearchResults(await API.Recipe.read.byIngredient([value]));
          } else {
            setSearchResults(await API.Recipe.read.byIngredient(value.slice(1, value.length - 1).split('%2C')));
          }
        } else {
          naviagate('/');
        }
      } else {
        naviagate('/');
      }
    }
    search();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <PageTitle>
          {`${domain}` === 'recipes' ? (
            '이런 건 어떠세요?'
          ) : (
            <>
              <div>
                <span>{`${value}`}</span> 에 대한
              </div>
              <div>쉐프 검색 결과 입니다</div>
            </>
          )}
        </PageTitle>
        <div>{searchResultBoxes}</div>
      </Container>
      <NavigationBar />
    </>
  );
};

export default SearchResultPage;
