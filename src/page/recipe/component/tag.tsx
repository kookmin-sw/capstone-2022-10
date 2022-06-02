import React from 'react';
import styled from 'styled-components';

import { getTagString } from '../../../helper';
import { TagType } from '../../../types/tag';
import { Mode } from '../type';

type props = {
  mode: Mode;
  tags: TagType[];
  setTags: (value: React.SetStateAction<TagType[]>) => void;
};

const StyledTag = styled.div`
  color : #2EC4B6;
  font-size : 3.5vw;
  margin-top : 2vw;

  .tagInfo {
    color : #FF9F1C;
  }
  input {
    margin : 2vw 0;
    padding-left : 2vw;
    width : 78vw;
    line-height : 5.5vw;
    border : 0px solid black;
    border-radius : 5px;
    background : #EEEEEE;
  }

  .tagOutput {
    border-radius : 5px;
  }
`;

export { StyledTag };

const Tag: React.FC<props> = ({ mode, tags, setTags }) => {
  function tagInputHanlder(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (tags.length === 5) {
      alert('최대 5개');
      e.target.value = '';
    } else if (value === ' ') {
      alert('빈칸 불가능');
      e.target.value = '';
    } else if (value.length > 10) {
      alert('최대 10자');
      e.target.value = '';
    } else if (value[value.length - 1] === ' ') {
      setTags([...tags, new TagType(value.slice(0, value.length - 1))]);
      e.target.value = '';
    }
  }

  return (
    <StyledTag>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && (
        <>
          <p className="tagInfo">#태그 정보(5개 제한, 10자 이내)</p>
          <input className="tagInput" placeholder="맛있는" onChange={tagInputHanlder} />
        </>
      )}
      <div className="tagOutput">{getTagString(tags)}</div>
    </StyledTag>
  );
};

export { Tag };
