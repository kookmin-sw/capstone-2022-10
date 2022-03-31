import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import Modal from '../component/modal';
import Header from '../component/header';
import NavigationBar from '../component/navigationBar';

import MainPage from '../page/main';
import SigninPage from '../page/signin';
import SignupPage from '../page/signup';
import UserDetail from '../page/user';
import { signinUserAtom } from '../state';

const IndexRouter: React.FC = () => {
  const signinUser = useRecoilValue(signinUserAtom);

  return (
    <Suspense fallback={<div>loading</div>}>
      <BrowserRouter>
        <Header />
        <NavigationBar />
        <Modal />
        <Routes>
          {/* 메인페이지 */}
          <Route path="/" element={<MainPage signinUser={signinUser} />} />
          {/* 로그인 페이지 */}
          <Route path="/signin" element={<SigninPage signinUser={signinUser} />} />
          {/* 회원가입 페이지 */}
          <Route path="/signup" element={<SignupPage signinUser={signinUser} />} />
          {/* 유저 디테일 페이지 (+ 마이페이지) */}
          <Route path="/users/:id" element={<UserDetail signinUser={signinUser} />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default IndexRouter;
