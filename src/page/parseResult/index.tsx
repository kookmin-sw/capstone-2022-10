import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import Header from '../../component/header';
import { ingredientResultListAtom } from '../../state';
import SearchIngredientList from './component/list';

const ParseResult: React.FC = () => {
  const navigate = useNavigate();
  const ingredients = useRecoilValue(ingredientResultListAtom);

  async function findRecipeHandler() {
    if (ingredients.length === 0) {
      alert('재료를 입력해주세요.');
    } else if (ingredients.some((ingredient) => ingredient === '')) {
      alert('빈칸이 존재해서는 안됩니다.');
    } else {
      navigate(`/recipes/search?ingredient=[${ingredients.join(',')}]`);
    }
  }

  return (
    <>
      <Header />
      <Title>재료 입력하기</Title>
      <SubmitForm>
        <SearchIngredientList />
      </SubmitForm>
      <SubmitButton type="submit" onClick={findRecipeHandler}>
        레시피 찾기
      </SubmitButton>
    </>
  );
};

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  width: 100%;
  margin: 15vh 0 0 0;
  text-align: center;
`;

const SubmitForm = styled.form`
  display: block;
  grid-template-columns: 2fr 10fr 2fr;
  grid-template-rows: 1fr 4fr 1fr;
  margin: 3vh auto;
  margin-bottom: 20vh;
  height: auto;
  width: 80vw;
  background: #cbf3f0;
  border-radius: 20px;
`;

const SubmitButton = styled.button`
  // Mobile
  overflow: hidden;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 8vh;
  border: none;
  background: #2ec4b6;
  box-shadow: 0px -4px 4px rgba(0, 0, 0, 0.25);
  display: grid;
  place-content: center;
  color: white;
  font-size: 20px;
  font-weight: 600;
  z-index: 100;

  @media screen and (min-width: 500px) {
    // PC
    height: 10%;
  }
`;

export default ParseResult;
