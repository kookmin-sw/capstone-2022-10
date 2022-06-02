import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import API from '../../api';

import Input from '../../component/input';
import { useSigninUser } from '../../hook';

import { BaseUserDTO } from '../../types/user';

import Header from '../../component/header';
import { Container } from '../main/style';
import { PageTitle, StyledFormButtonSection, StyledForm } from '../../component/style';
import { JWT } from '../../types/etc';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const { getSigninUser, setSigninUser } = useSigninUser();

  const [email, setEmail] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = useState<string>('');

  useEffect(() => {
    if (getSigninUser().id !== -1) {
      navigate('/');
    }
  }, []);

  async function signinHandler() {
    let isAllGood = true;
    // 이메일 검증 (최소 길이)
    if (email.length < 10) {
      setEmailErrorMessage('최소 10자 이상이어야 합니다');
      isAllGood = false;
    }
    // 이메일 검증 (형식 검증)
    if (email.indexOf('@') < 0) {
      setEmailErrorMessage('유효하지 않은 형식입니다');
      isAllGood = false;
    }
    // 이메일 검증 (중복 검사)
    const { idDuplicated } = await API.Auth.isEmailDuplicated(email);
    if (!idDuplicated) {
      setEmailErrorMessage('이미 사용중인 이메일입니다');
      isAllGood = false;
    }
    // 비밀번호 검증 (최소길이)
    if (password.length < 10) {
      setPasswordErrorMessage('비밀번호가 너무 짧습니다');
      isAllGood = false;
    }
    // 비밀번호 확인 검증 (같은지 비교)
    if (password !== confirmPassword) {
      setConfirmPasswordErrorMessage('비밀번호가 일치하지 않습니다');
      isAllGood = false;
    }
    if (isAllGood) {
      const user = await API.Auth.signup(email, password, confirmPassword);
      setSigninUser(new BaseUserDTO(user.id, user.nickname, user.thumbnailUrl));
      localStorage.setItem(JWT, user.jwt);
      navigate('../');
    }
  }

  function cancelHanlder() {
    navigate(-1);
  }

  return (
    <>
      <Header />
      <Container>
        <PageTitle className="페이지 타이틀">회원 가입</PageTitle>
        <StyledForm className="입력 폼">
          <Input title="아이디(이메일)" type="text" setValue={setEmail} placeholder="" errorMessage={emailErrorMessage} />
          <Input title="비밀번호" type="password" setValue={setPassword} placeholder="8자 이상" errorMessage={passwordErrorMessage} />
          <Input
            title="비밀번호 확인"
            type="password"
            setValue={setConfirmPassword}
            placeholder=""
            errorMessage={confirmPasswordErrorMessage}
          />
        </StyledForm>
        <StyledFormButtonSection className="버튼 색션">
          <button className="요청 버튼" type="button" onClick={signinHandler}>
            회원가입
          </button>
          <button className="취소 버튼" type="button" onClick={cancelHanlder}>
            취소
          </button>
        </StyledFormButtonSection>
      </Container>
    </>
  );
};

export default SignupPage;
