import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSigninUser } from '../../hook';
import { BaseUserDTO } from '../../types/user';
import { JWT } from '../../types/etc';
import API from '../../api';

import Header from '../../component/header';
import { Container } from '../main/style';
import { PageTitle, StyledFormButtonSection, StyledForm } from '../../component/style';
import { StyledInput, StyledLink } from './style';

const SigninPage: React.FC = () => {
  const { getSigninUser, setSigninUser } = useSigninUser();

  const navigate = useNavigate();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (getSigninUser().id !== -1) {
      navigate('/');
    }
  }, []);

  async function clickHandler() {
    const id = idRef.current!.value;
    const password = passwordRef.current!.value;

    const user = await API.Auth.login(id, password);

    setSigninUser(new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl));
    localStorage.setItem(JWT, user.jwt);
    navigate('/');
  }

  return (
    <>
      <Header />
      <Container>
        <PageTitle>로그인</PageTitle>
        {/* form 리펙토링 필요 -> componenet로 분리 고민 */}
        <StyledForm id="form">
          <h5>아이디</h5>
          <StyledInput ref={idRef} placeholder="영문 최대 15자" />
          <h5>비밀번호</h5>
          <StyledInput ref={passwordRef} type="password" placeholder="영문 최대 30자" />
        </StyledForm>
        <StyledFormButtonSection>
          <button type="button" onClick={clickHandler}>
            로그인
          </button>
          <StyledLink to="/signup">회원가입</StyledLink>
        </StyledFormButtonSection>
      </Container>
    </>
  );
};

export default SigninPage;
