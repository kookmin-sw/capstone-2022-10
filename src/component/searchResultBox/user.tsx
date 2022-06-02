import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ReadUserDTO } from '../../types/user';
import { StyledSRBox } from './style';

type props = {
  userData: ReadUserDTO;
};

const UserSearchResultBox: React.FC<props> = ({ userData }) => {
  const navigate = useNavigate();

  function clickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id } = event.currentTarget.dataset;
    navigate(`../../users/${id}`);
  }

  return (
    <StyledSRBox key={userData.id} data-id={userData.id} onClick={clickHandler} role="presentation">
      <div>
        <img
          className="thumbnail"
          src={
            userData.thumbnailUrl !== 'empty'
            ? userData.thumbnailUrl
            : `${process.env.PUBLIC_URL}/image/icon/header/defaultProfile.png`
          }
          alt="으악 사진이 없어요"
        />
      </div>
      <div className="chefInfo">
        <div className="chefName">
          <img
            src={
              userData.grade
              ? userData.grade
              : `${process.env.PUBLIC_URL}/image/icon/header/defaultProfile_trans.png`
            }
            alt="으악 사진이 없어요"
          />
          <h3>{userData.nickname}</h3>
        </div>
        <h5>{userData.description}</h5>
        <p>구독자 수 : {userData.numberOfFan}</p>
        <p>좋아요 수 : {userData.numberOfLike}</p>
      </div>
    </StyledSRBox>
  );
};

export default UserSearchResultBox;
