import React from 'react';
import styled from 'styled-components';

import { useSigninUser } from '../../../hook';
import { BaseUserDTO } from '../../../types/user';
import { Mode } from '../type';
import { PageTitle } from '../../../component/style';

type props = {
  mode: Mode;
  user: BaseUserDTO;
  isMyRecipe: boolean;
  bookMarkImageUrl: string;
  updateHandler: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  deleteHandler: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  bookmarkHandler: () => void;
  title: string;
  titleHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const StyledHeader = styled.div`
  background: none;
  margin-top: 1.5vh;
  display: grid;
  grid-template-columns: 15vw 1fr 15vw;
  .left {
    background: #eeeeee;
    display: inline-block;
    width: 15vw;
    height: 15vw;
    border-radius: 10px;
    img {
      width: 15vw;
    }
  }

  .middle {
    padding: 1.5vw 3vw;
    font-size: 3vw;

    input {
      background: none;
      font-size: 5vw;
      width: 100%;
      height: 6vw;
      margin-top: 2vw;
      border-radius: 5px;
    }

    input:disabled {
      font-weight: 600;
      padding: 0;
      width: 100%;
      height: 8vw;
      font-size: 5vw;
      border: 0px solid black;

      @media all and (min-aspect-ratio: 400/650) {
        font-size: 4vh;
      }
    }
  }

  .right {
    padding: 1.5vw;
    .button {
      width: 5vw;
      height: 5vw;
    }
    .delete {
      margin-left: 2vw;
    }
    .subscribe {
      width: 10vw;
      height: 10vw;
      margin: 2.5vw;
    }
  }
`;

export { StyledHeader };

const RecipeHeader: React.FC<props> = ({
  mode,
  user,
  isMyRecipe,
  bookMarkImageUrl,
  updateHandler,
  deleteHandler,
  bookmarkHandler,
  title,
  titleHandler,
}) => {
  const { getSigninUser } = useSigninUser();
  return (
    <>
      {mode === Mode.CREATE && <PageTitle>레시피 생성</PageTitle>}
      <StyledHeader>
        <div className="left">
          <img src={mode === Mode.READ ? user?.thumbnailUrl : getSigninUser()?.thumbnailUrl} alt="으악" />
        </div>

        <div className="middle">
          <p className="chefName">
            {mode === Mode.READ && user?.nickname}
            {(mode === Mode.CREATE || mode === Mode.UPDATE) && getSigninUser()?.nickname}
          </p>
          <input value={title} disabled={mode === Mode.READ} onChange={titleHandler} placeholder="제목" />
        </div>

        <div className="right">
          {mode === Mode.READ && isMyRecipe && (
            <>
              <img
                className="edit button"
                src={`${process.env.PUBLIC_URL}/image/icon/edit/pencil.png`}
                alt="수정 버튼"
                onClick={updateHandler}
              />
              <img
                className="delete button"
                src={`${process.env.PUBLIC_URL}/image/icon/edit/trashBlack.png`}
                alt="삭제 버튼"
                onClick={deleteHandler}
              />
            </>
          )}
          {mode === Mode.READ && !isMyRecipe && (
            <img className="subscribe" src={bookMarkImageUrl} alt="북마크 버튼" onClick={bookmarkHandler} />
          )}
        </div>
      </StyledHeader>
    </>
  );
};

export { RecipeHeader };
