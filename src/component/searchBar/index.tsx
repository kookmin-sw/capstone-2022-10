import React, { useRef, useState } from 'react';

enum SearchType {
  CHEF_NAME = 'CHEF_NAME',
  RECIPE_NAME = 'RECIPE_NAME',
  INGREDIENT = 'INGREDIENT',
  TAG = 'TAG',
}

const SearchBar: React.FC = () => {
  const searchType = useRef<HTMLSelectElement>(null);
  const PLACEHOLDER = '(레시피 / 태그 / 유저 / 재료)';

  async function searchHandler() {
    const type = searchType.current!.value;
    if (type === '') alert('검색 카테고리를 선택해주세요');
    switch (type) {
      case SearchType.CHEF_NAME:
        // 검색 결과 페이지로 redirect
        break;
      case SearchType.RECIPE_NAME:
        // 검색 결과 페이지로 redirect
        break;
      case SearchType.INGREDIENT:
        // 검색 결과 페이지로 redirect
        break;
      case SearchType.TAG:
        // 검색 결과 페이지로 redirect
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <select ref={searchType} name="SEARCH_CATEGORY" size={4}>
        <option value={SearchType.CHEF_NAME}>{SearchType.CHEF_NAME}</option>
        <option value={SearchType.RECIPE_NAME}>{SearchType.RECIPE_NAME}</option>
        <option value={SearchType.INGREDIENT}>{SearchType.INGREDIENT}</option>
        <option value={SearchType.TAG}>{SearchType.TAG}</option>
      </select>
      <input type="text" placeholder={PLACEHOLDER} />
      <button type="button" onClick={searchHandler}>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
