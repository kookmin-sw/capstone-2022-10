import { BaseRecipeDTO } from './recipe';

class BaseUserDTO {
  id: number;
  nickname: string;
  thumbnailUrl: string;

  constructor(id: number = -1, nickname: string = '', thumbnailUrl: string = '') {
    this.id = id;
    this.nickname = nickname;
    this.thumbnailUrl = thumbnailUrl;
  }
}

class ReadUserDetailDTO extends BaseUserDTO {
  description: string;
  grade: number;
  numberOfSubscribers: number;
  numberOfLikes: number;
  myRecipe: BaseRecipeDTO[];
  likeRecipe: BaseRecipeDTO[];
  subscribingUser: BaseUserDTO[];

  static getEmptyReadUserDetail() {
    return new ReadUserDetailDTO();
  }
  static getUpdatedReadUserDetail(updatedUser: ReadUserDetailDTO | any) {
    return new ReadUserDetailDTO(updatedUser);
  }

  private constructor(updatedUser?: ReadUserDetailDTO) {
    if (updatedUser) {
      super(updatedUser.id, updatedUser.nickname, updatedUser.thumbnailUrl);
      this.description = updatedUser.description;
      this.grade = updatedUser.grade;
      this.numberOfSubscribers = updatedUser.numberOfSubscribers;
      this.numberOfLikes = updatedUser.numberOfLikes;
      this.myRecipe = updatedUser.myRecipe;
      this.likeRecipe = updatedUser.likeRecipe;
      this.subscribingUser = updatedUser.subscribingUser;
    } else {
      super();
      this.description = '';
      this.grade = -1;
      this.numberOfSubscribers = -1;
      this.numberOfLikes = -1;
      this.myRecipe = [];
      this.likeRecipe = [];
      this.subscribingUser = [];
    }
  }
}

class UpdateUserDTO {
  nickname: string;
  loginPassword: string;
  confirmPassword: string;
  description: string;

  constructor(nickname: string, loginPassword: string, confirmPassword: string, description: string) {
    this.nickname = nickname;
    this.loginPassword = loginPassword;
    this.confirmPassword = confirmPassword;
    this.description = description;
  }
}

export { BaseUserDTO, ReadUserDetailDTO, UpdateUserDTO };
