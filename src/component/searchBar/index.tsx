import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchType } from '../../types/enum';
import { StyledSearchBar } from './style';

const SearchBar: React.FC = () => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const PLACEHOLDER = '(셰프 / 레시피 / 재료 / 태그)';
  const navigate = useNavigate();

  async function searchHandler() {
    const searchType = selectRef.current!.value;
    const input = inputRef.current!.value;
    if (searchType === '') alert('검색 카테고리를 선택해주세요');
    if (input === '') alert('검색어를 입력해주세요');
    switch (searchType) {
      case SearchType.CHEF_NAME:
        navigate(`users/search?name=${input}`);
        break;
      case SearchType.RECIPE_TITLE:
        navigate(`recipes/search?title=${input}`);
        break;
      case SearchType.INGREDIENT:
        navigate(`recipes/search?ingredient=${input}`);
        break;
      case SearchType.TAG:
        navigate(`recipes/search?tag=${input}`);
        break;
      default:
        navigate('/');
        break;
    }
  }

  return (
    <StyledSearchBar>
      <select ref={selectRef} name="SEARCH_CATEGORY" size={1}>
        <option value="">▼</option>
        <option value={SearchType.CHEF_NAME}>👨🏻‍🍳</option>
        <option value={SearchType.RECIPE_TITLE}>🍽️</option>
        <option value={SearchType.INGREDIENT}>🥕</option>
        <option value={SearchType.TAG}>#️⃣</option>
      </select>
      <input id="input" ref={inputRef} type="text" placeholder={PLACEHOLDER} />
      <button type="button" onClick={searchHandler}>
        Search
      </button>
    </StyledSearchBar>
  );
};

export default SearchBar;
