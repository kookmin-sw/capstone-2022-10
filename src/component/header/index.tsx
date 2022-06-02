import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useSigninUser } from '../../hook';
import { isModalOpenAtom, modalTypeAtom, triggerAtom } from '../../state';
import { ModalType } from '../modal/type';
import { ImagePath } from '../../static';

const StyledHeader = styled.header`
  //mobile
  overflow: hidden;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100vw;
  height: 10vh;
  background: #ff9f1c;
  margin: 0;
  box-shadow: 0px 5px 10px #adadad;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  z-index: 100;

  .profile {
    border-radius: 50%;
  }

  @media all and (min-aspect-ratio: 400/650) {
    display: grid;
    grid-template-columns: 12vh 1fr 12vh 3vh;
    img {
      width: 8vh;
    }

    .logo {
      width: 18vh;
    }

    .back {
      width: 5vh;
    }

    button {
      width: 8vh;
      height: 8vh;
    }
  }
`;

const StyledImg = styled.img`
  width: ${(props) => props.width};
  display: block;
  margin: auto;
`;

StyledImg.defaultProps = {
  src: 'image/icon/header',
};

const LogoutButton = styled.button`
  width: 12vw;
  height: 12vw;
  margin: auto;
  color: rgba(0, 0, 0, 0);
  border: none;
  background: url(${process.env.PUBLIC_URL}${ImagePath.Button.LOG_OUT});
  background-size: cover;
`;

function ProfileComponent() {
  const { pathname } = useLocation();
  const { getSigninUser } = useSigninUser();
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const navigate = useNavigate();
  const [trigger, setTrigger] = useRecoilState(triggerAtom);

  function clickModalHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setIsModalOpen(!isModalOpen);
    setModalType(event.currentTarget.id);
  }

  return (
    <>
      {getSigninUser().id !== -1 && pathname === `/users/${getSigninUser().id}` ? (
        <LogoutButton id={ModalType.CONFIRM_SIGNOUT} type="button" onClick={clickModalHandler}>
          로그아웃
        </LogoutButton>
      ) : getSigninUser().id !== -1 ? (
        <StyledImg
          className="profile"
          width="12vw"
          src={`${getSigninUser().thumbnailUrl}`}
          alt="profile"
          onClick={() => {
            navigate(`/users/${getSigninUser().id}`);
            setTrigger(trigger + 1);
          }}
        />
      ) : (
        <StyledImg
          width="10vw"
          src={`${process.env.PUBLIC_URL}${ImagePath.User.NO_MEMBER_PROFILE}`}
          alt="signin"
          onClick={() => {
            navigate('/signin');
          }}
        />
      )}
    </>
  );
}

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [trigger, setTrigger] = useRecoilState(triggerAtom);

  return (
    <StyledHeader>
      <StyledImg
        className="back"
        width="8vw"
        src={`${process.env.PUBLIC_URL}${ImagePath.Button.GO_BACK}`}
        onClick={() => {
          navigate(-1);
          setTimeout(() => setTrigger(trigger + 1));
        }}
      />
      <StyledImg
        className="logo"
        width="30vw"
        src={`${process.env.PUBLIC_URL}${ImagePath.Button.LOGO}`}
        alt="home"
        onClick={() => navigate('/')}
      />
      <ProfileComponent />
    </StyledHeader>
  );
};

export default Header;
