import React from 'react';
import styled from 'styled-components';
import { BaseRecipeDTO } from '../../types/recipe';
import { BaseUserDTO } from '../../types/user';

type props = {
  baseInfo: BaseRecipeDTO | BaseUserDTO;
};

const SThumbnailBox = styled.div`
  width: 50px;
  height: 50px;
  background-color: gray;
`;

const ThumbnailBox: React.FC<props> = ({ baseInfo }) => {
  console.log(baseInfo);
  return (
    <SThumbnailBox key={baseInfo.id}>
      <img src={baseInfo.thumbnailUrl} alt="으악 썸네일이 없어요" />
    </SThumbnailBox>
  );
};

export default ThumbnailBox;
