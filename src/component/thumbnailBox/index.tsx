import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { triggerAtom } from '../../state';
import { DataType } from '../../types/enum';
import { BaseRecipeDTO } from '../../types/recipe';
import { BaseUserDTO } from '../../types/user';

type props = {
  baseInfo: BaseRecipeDTO | BaseUserDTO;
};

const SThumbnailBox = styled.div`
  display: inline-block;
  width: 24vw;
  height: 24vw;

  img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .name {
    width : 24vw;
    margin: 1px;
    padding: 4px 0;
    font-weight: 600;
    text-align: center;
    font-size: 13px;
    
    @media all and (min-aspect-ratio : 400/650) {
      font-size : 2.5vh;
    }
  }
`;

const ThumbnailBox: React.FC<props> = ({ baseInfo }) => {
  const [trigger, setTrigger] = useRecoilState(triggerAtom);
  const navigate = useNavigate();
  const name = 'title' in baseInfo ? baseInfo.title : baseInfo.nickname;

  function thumbnailClickHandler(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    const { id, type } = event.currentTarget.dataset;
    if (Number(id) > 0) {
      if (type === DataType.RECIPE) {
        navigate(`/recipes/${id}`);
      } else if (type === DataType.USER) {
        navigate(`/users/${id}`);
        setTrigger(trigger + 1);
        window.scrollTo(0, 0);
      }
    }
  }

  return (
    <SThumbnailBox
      key={baseInfo.id}
      onClick={thumbnailClickHandler}
      data-id={baseInfo.id}
      data-type={'title' in baseInfo ? DataType.RECIPE : DataType.USER}
    >
      <img src={baseInfo.thumbnailUrl} alt="으악 썸네일이 없어요" />
      <div className="name">{name.length > 6 ? name.slice(0, 6).concat('..') : name}</div>
    </SThumbnailBox>
  );
};

export default ThumbnailBox;
