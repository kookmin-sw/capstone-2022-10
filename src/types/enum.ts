enum DataType {
  USER = 'users',
  RECIPE = 'recipes',
}

enum SearchType {
  CHEF_NAME = 'name',
  RECIPE_TITLE = 'title',
  INGREDIENT = 'ingredient',
  TAG = 'tag',
}

enum ImageType {
  RECEIPT = 'RECEIPT',
  INGREDIENT = 'INGREDIENT',
}

export { DataType, SearchType, ImageType };
