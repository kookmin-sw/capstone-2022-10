import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { signinUserAtom } from '../../state';
import { BaseUserDTO } from '../../types/user';

type props = {
  signinUser: BaseUserDTO;
};

const SigninPage: React.FC<props> = ({ signinUser }) => {
  const setSigninUser = useSetRecoilState(signinUserAtom);

  const navigate = useNavigate();
  const idRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (signinUser.id !== -1) {
      navigate('/');
    }
  }, []);

  async function clickHandler() {
    const id = idRef.current?.value;
    const password = passwordRef.current?.value;

    const response = await fetch('http://localhost:4000/api/users', {
      method: 'post',
      mode: 'cors',
      body: JSON.stringify({ id, password }),
    });
    const json = await response.json(); // 로그인한 유저 정보 (id, nickname, JWT 반환)
    // 예외처리 필요
    localStorage.setItem('JWT', json.JWT);
    setSigninUser(new BaseUserDTO(json.id, json.nickname, json.thumbnailUrl));
  }

  return (
    <>
      {/* header 위치할 곳 */}
      <h1>header</h1>
      {/* 페이지 제목 위치할 곳 */}
      <h1>로그인</h1>
      {/* form 리펙토링 필요 -> componenet로 분리 고민 */}
      <form id="form">
        <p>아이디</p>
        <input ref={idRef} placeholder="영문 최대 15자" />
        <p>비밀번호</p>
        <input ref={passwordRef} placeholder="영문 최대 30자" />
      </form>
      <button type="button" onClick={clickHandler}>
        로그인
      </button>
    </>
  );
};

export default SigninPage;
