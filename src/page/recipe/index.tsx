import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import AWS from 'aws-sdk';

import { CreateRecipeDTO, ReadRecipeDetailDTO } from '../../types/recipe';

import API from '../../api';
import { parseId } from '../../helper';
import { useSigninUser } from '../../hook';
import { RecipeDescription } from '../../types/recipeDescription';
import { Mode } from './type';
import { BaseUserDTO } from '../../types/user';
import { RecipeIngredient } from '../../types/recipeIngredient';

import Header from '../../component/header';
import NavigationBar from '../../component/navigationBar';
import { RecipeContainer, StyledCancelButton } from './component/style';

import { RecipeHeader } from './component/header';
import { Tag } from './component/tag';
import { Description } from './component/description';
import { ThumbnailImage } from './component/thumbnail';
import { ReferenceUrl } from './component/reference';
import { Serving } from './component/serving';
import { RecipeIngredientList } from './component/recipeIngredient/list';
import { RecipeDescriptionList } from './component/recipeDescription/list';
import { Button } from './component/button';
import { TagType } from '../../types/tag';
import { isModalOpenAtom, modalTypeAtom } from '../../state';
import { ModalType } from '../../component/modal/type';
import Modal from '../../component/modal';

type props = {
  initMode: Mode;
};

const UNMAKR_IMAGE_URL = `${process.env.PUBLIC_URL}/image/icon/subscribe/unSubs.png`;
const BOOKMAKR_IMAGE_URL = `${process.env.PUBLIC_URL}/image/icon/subscribe/subs.png`;

const RecipePage: React.FC<props> = ({ initMode }) => {
  const { getSigninUser } = useSigninUser();
  const location = useLocation();
  const navigate = useNavigate();
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);

  const [id, setId] = useState<number>(-1);
  const [title, setTitle] = useState<string>('');
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const [tags, setTags] = useState<TagType[]>([]);
  const [user, setUser] = useState<BaseUserDTO>();
  const [referenceUrl, setReferenceUrl] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [serving, setServing] = useState<number>(1);
  const [recipeIngredients, setRecipeIngredients] = useState<RecipeIngredient[]>([]);
  const [recipeDescriptions, setRecipeDescriptions] = useState<RecipeDescription[]>([]);
  const [bookmark, setBookmark] = useState<boolean>(false);

  const [isMyRecipe, setIsMyRecipe] = useState(false);
  const [bookMarkImageUrl, setBookMarkImageUrl] = useState<string>('');
  const [mode, setMode] = useState<Mode>(initMode);

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  function updateHandler(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setMode(mode === Mode.READ ? Mode.UPDATE : Mode.READ);
  }

  async function deleteHandler(e: React.MouseEvent<HTMLImageElement, MouseEvent>) {
    setIsModalOpen(true);
    setModalType(ModalType.CONFIRM_DELETE);
  }

  async function bookmarkHandler() {
    await API.Bookmark.create.bookmark(id!);
    if (bookmark) setBookMarkImageUrl(UNMAKR_IMAGE_URL);
    else setBookMarkImageUrl(BOOKMAKR_IMAGE_URL);
    setBookmark(!bookmark);
  }

  function titleHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setTitle(e.currentTarget.value);
  }

  async function requestHandler() {
    if (title.length === 0) {
      alert('제목을 입력해주세요');
    } else if (thumbnailUrl.length === 0) {
      alert('썸네일을 입력해주세요');
    } else if (description.length === 0) {
      alert('설명을 입력해주세요');
    } else if (recipeIngredients.length === 0) {
      alert('재료를 최소 1개 이상 입력해주세요');
    } else if (recipeDescriptions.length === 0) {
      alert('설명을 최소 1개 이상 입력해주세요');
    } else {
      setRecipeIngredients(
        recipeIngredients.filter((recipeIngredient) => recipeIngredient.ingredient.name !== '' && recipeIngredient.amount !== ''),
      );
      setRecipeDescriptions(recipeDescriptions.filter((recipeDescription) => recipeDescription.imageDescription !== ''));
      const recipe = new CreateRecipeDTO(
        recipeIngredients,
        recipeDescriptions,
        tags,
        thumbnailUrl,
        title,
        description,
        referenceUrl,
        serving,
      );
      if (mode === Mode.CREATE) {
        const recipeId = await API.Recipe.create.newRecipe(recipe);
        navigate('../');
        navigate(`../../recipes/${recipeId}`);
      } else if (mode === Mode.UPDATE) {
        await API.Recipe.update(parseId(location.pathname), recipe);
        setMode(Mode.READ);
      }
    }
  }
  function quitHandler() {
    setMode(Mode.READ);
  }

  useEffect(() => {
    async function getRecipeDetail() {
      const findRecipe: ReadRecipeDetailDTO = await API.Recipe.read.byId(parseId(location.pathname));
      const hasBookmarked = await API.Bookmark.read.checkBookmark(parseId(location.pathname));
      setId(findRecipe?.id);
      setTitle(findRecipe?.title);
      setThumbnailUrl(findRecipe?.thumbnailUrl);
      setTags(findRecipe?.tags);
      setUser(findRecipe?.user);
      setReferenceUrl(findRecipe?.referenceUrl);
      setDescription(findRecipe?.description);
      setServing(findRecipe?.serving);
      setRecipeIngredients(findRecipe?.recipeIngredients);
      setRecipeDescriptions(
        findRecipe?.recipeDescriptions.map(
          (recipeDescription, index) => new RecipeDescription(index, recipeDescription.imageDescription, recipeDescription.imageUrl, index),
        ),
      );
      setBookmark(getSigninUser().id === -1 ? false : hasBookmarked);
      if (getSigninUser().id === -1) {
        setBookMarkImageUrl(UNMAKR_IMAGE_URL);
      } else if (hasBookmarked) {
        setBookMarkImageUrl(BOOKMAKR_IMAGE_URL);
      } else {
        setBookMarkImageUrl(UNMAKR_IMAGE_URL);
      }
      if (Number(findRecipe.user.id) === getSigninUser().id) {
        setIsMyRecipe(true);
      }
    }
    if (initMode === Mode.READ) {
      getRecipeDetail();
    }
  }, []);

  return (
    <>
      <Header />
      <RecipeContainer>
        <RecipeHeader
          mode={mode}
          user={user!}
          isMyRecipe={isMyRecipe}
          bookMarkImageUrl={bookMarkImageUrl}
          updateHandler={updateHandler}
          deleteHandler={deleteHandler}
          bookmarkHandler={bookmarkHandler}
          title={title}
          titleHandler={titleHandler}
        />
        <Tag mode={mode} tags={tags!} setTags={setTags!} />
        <Description mode={mode} description={description} setDescription={setDescription} />
        <ThumbnailImage mode={mode} s3={s3} thumbnailUrl={thumbnailUrl} setThumbnailUrl={setThumbnailUrl} />
        <ReferenceUrl mode={mode} referenceUrl={referenceUrl} setReferenceUrl={setReferenceUrl} />
        <Serving mode={mode} serving={serving} setServing={setServing} />
        <RecipeIngredientList mode={mode} recipeIngredients={recipeIngredients} setRecipeIngredients={setRecipeIngredients} />
        <RecipeDescriptionList mode={mode} s3={s3} recipeDescriptions={recipeDescriptions} setRecipeDescriptions={setRecipeDescriptions} />
        {mode === Mode.UPDATE && (
          <StyledCancelButton>
            <button type="button" onClick={quitHandler}>
              변경 취소
            </button>
            <span>변경 취소</span>
          </StyledCancelButton>
        )}
        <Modal />
      </RecipeContainer>
      {(mode === Mode.CREATE || mode === Mode.UPDATE) && <Button mode={mode} clickHandler={requestHandler} />}
      {mode === Mode.READ && <NavigationBar />}
    </>
  );
};

export default RecipePage;
