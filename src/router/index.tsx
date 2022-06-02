import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainPage from '../page/main';
import SigninPage from '../page/signin';
import SignupPage from '../page/signup';
import SearchResultPage from '../page/searchResult';
import UserDetailPage from '../page/user';
import RecipePage from '../page/recipe';

import ParseResult from '../page/parseResult';
import { Mode } from '../page/recipe/type';
import ErrorPage from '../page/error';

const IndexRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>loading</div>}>
      <BrowserRouter>
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<MainPage />} />
          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SigninPage />} />
          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignupPage />} />
          {/* 검색 결과 페이지 : 유저 검색 */}
          <Route path="/users/search" element={<SearchResultPage />} />
          {/* 유저 디테일 페이지 (+ 마이페이지) */}
          <Route path="/users/:id" element={<UserDetailPage />} />
          {/* 이미지 인식 결과 및 재료 입력 페이지 */}
          <Route path="parseresult" element={<ParseResult />} />
          {/* 검색 결과 페이지 : 레시피 검색 */}
          <Route path="/recipes/search" element={<SearchResultPage />} />
          {/* 레시피 등록 페이지 */}
          <Route path="/recipes/new" element={<RecipePage initMode={Mode.CREATE} />} />
          {/* 레시피 디테일 페이지 */}
          <Route path="/recipes/:id/update" element={<RecipePage initMode={Mode.UPDATE} />} />
          {/* 레시피 디테일 페이지 */}
          <Route path="/recipes/:id" element={<RecipePage initMode={Mode.READ} />} />
          <Route path="/*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default IndexRouter;
