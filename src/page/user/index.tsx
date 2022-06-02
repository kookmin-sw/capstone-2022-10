import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import AWS from 'aws-sdk';

import API from '../../api';

import ThumbnailBox from '../../component/thumbnailBox';
import Header from '../../component/header';
import NavigationBar from '../../component/navigationBar';
import { PageTitle } from '../../component/style';

import { ModalType } from '../../component/modal/type';
import { Container, Title } from '../main/style';
import { SThumbnailSection, StyledBlock, Bookmark } from './style';

import { getNewKey, getNewUrl, parseId } from '../../helper';

import { ReadUserDetailDTO, UpdateUserDTO, BaseUserDTO } from '../../types/user';
import { isModalOpenAtom, modalTypeAtom, triggerAtom, updateUserAtom } from '../../state';
import { useSigninUser } from '../../hook';
import { NotFound } from '../../component/notfound';

const ImagePath = {
  BOOKMAKR: `${process.env.PUBLIC_URL}/image/icon/bookmark/bookblack.png`,
  UNMARK: `${process.env.PUBLIC_URL}/image/icon/bookmark/unBookblack.png`,
  FULL_DEFAULT_THUMBNAIL: `${process.env.PUBLIC_URL}/image/icon/header/defaultProfile.png`,
  PARTIAL_DEFAULT_THUMBNAIL: '/image/icon/header/defaultProfile.png',
};

const UserDetail: React.FC = () => {
  const { getSigninUser, setSigninUser } = useSigninUser();
  const [pageOwner, setPageOwner] = useState<ReadUserDetailDTO>();
  const [thumbnailUrl, setThumbnailUrl] = useState<string>('');
  const setGlobalPageOwner = useSetRecoilState<UpdateUserDTO>(updateUserAtom);
  const trigger = useRecoilValue(triggerAtom);
  const [isMyPage, setIsMyPage] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenAtom);
  const setModalType = useSetRecoilState(modalTypeAtom);
  const location = useLocation();

  const myRecipeBoxes =
    pageOwner?.myRecipe.length !== 0 ? (
      pageOwner?.myRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />)
    ) : (
      <NotFound>올린 레시피가 존재하지 않습니다</NotFound>
    );
  const likeRecipeBoxes =
    pageOwner?.likeRecipe.length !== 0 ? (
      pageOwner?.likeRecipe.map((recipe) => <ThumbnailBox baseInfo={recipe} />)
    ) : (
      <NotFound>좋아요 한 레시피가 존재하지 않습니다</NotFound>
    );
  const subscribingChefBoxes =
    pageOwner?.subscribingUser.length !== 0 ? (
      pageOwner?.subscribingUser.map((user) => <ThumbnailBox baseInfo={user} />)
    ) : (
      <NotFound>구독한 쉐프가 존재하지 않습니다</NotFound>
    );

  const s3 = new AWS.S3({
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_KEY,
    region: process.env.REACT_APP_AWS_BUCKET_REGION,
  });

  function clickModalHandler(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    setGlobalPageOwner(new UpdateUserDTO(pageOwner!.nickname, '', '', pageOwner!.description));
    setIsModalOpen(!isModalOpen);
    setModalType(event.currentTarget.id);
  }

  async function subscribeHanlder() {
    pageOwner!.numberOfFan += hasSubscribed ? -1 : 1;
    setPageOwner(pageOwner);
    setHasSubscribed(await API.Subscribe.update.subscribe(parseId(location.pathname)));
  }

  async function deleteThumbnailHandler() {
    setThumbnailUrl(ImagePath.FULL_DEFAULT_THUMBNAIL);
    await API.User.update.thumbnail(ImagePath.PARTIAL_DEFAULT_THUMBNAIL);
    setSigninUser(new BaseUserDTO(getSigninUser().id, getSigninUser().nickname, ImagePath.PARTIAL_DEFAULT_THUMBNAIL));
  }

  function updateThumbnailHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const reader = new FileReader();
    const file = e.target.files![0];
    reader.readAsDataURL(file);

    const key = getNewKey(file);
    const url = getNewUrl(key);

    const obj = {
      Bucket: process.env.REACT_APP_AWS_BUCKET_NAME!,
      Body: file,
      Key: key,
      ContentType: file.type,
      ACL: 'public-read-write',
    };

    s3.putObject(obj, async (err) => {
      if (err) {
        alert('업로드에 실패했습니다');
      } else {
        await API.User.update.thumbnail(url);
        setThumbnailUrl(url);
        setSigninUser(new BaseUserDTO(getSigninUser().id, getSigninUser().nickname, url));
      }
    });
  }

  useEffect(() => {
    async function getPageOwner() {
      const findUser: ReadUserDetailDTO = await API.User.read.byId(parseId(location.pathname));
      setThumbnailUrl(findUser.thumbnailUrl);
      setPageOwner(findUser);
      setIsMyPage(Number(findUser.id) === getSigninUser().id);
    }

    async function checkSubscription() {
      setHasSubscribed(await API.Subscribe.read.hasSubscribed(parseId(location.pathname)));
    }

    getPageOwner();
    if (getSigninUser().id !== -1) {
      checkSubscription();
    }
  }, [trigger]);

  return (
    <>
      <Header />
      <Container>
        <PageTitle>{isMyPage ? '마이페이지' : `${pageOwner?.nickname}`}</PageTitle>
        {!isMyPage && getSigninUser().id !== -1 && (
          <Bookmark
            className="bookmark"
            src={hasSubscribed ? ImagePath.BOOKMAKR : ImagePath.UNMARK}
            alt="bookmark"
            onClick={subscribeHanlder}
          />
        )}
        <StyledBlock>
          <Title className="chefname">쉐프 정보</Title>
          <div className="thumbnailBlock">
            <img
              className="thumbnail"
              src={thumbnailUrl !== '' ? thumbnailUrl : `${process.env.PUBLIC_URL}/image/icon/header/defaultProfile.png`}
              alt="으악 유저 썸네일이 없어요"
            />
            {isMyPage && (
              <>
                <label className="pencil button" htmlFor="input-button">
                  label
                </label>
                <input id="input-button" onChange={updateThumbnailHandler} type="file" />
                <button className="delete button" type="button" onClick={deleteThumbnailHandler}>
                  썸네일 제거
                </button>
              </>
            )}
          </div>

          <div className="chefDataBlock">
            <div className="th grade">쉐프 등급</div>
            <div> {pageOwner?.grade} 등급</div>
            <div className="th fans">구독자 수</div>
            <div> {pageOwner?.numberOfFan} 명</div>
            <div className="th totalLikes">총 좋아요 수</div>
            <div> {pageOwner?.numberOfLike} 개</div>
          </div>

          <div className="accountInfo">
            <div className="th nickname">닉네임</div>
            <div className="td"> {pageOwner?.nickname}</div>
            <div className="th description">소개글</div>
            <div className="td"> {pageOwner?.description}</div>
          </div>
          <div className="buttonbox">
            {isMyPage && (
              <>
                <button id={ModalType.CHANGE_INFOMATION} className="changeInfo" type="button" onClick={clickModalHandler}>
                  회원정보 변경
                </button>
                <button id={ModalType.CONFIRM_EXIT} className="withdraw" type="button" onClick={clickModalHandler}>
                  회원탈퇴
                </button>
              </>
            )}
          </div>
        </StyledBlock>
        <div className="레시피 목록">
          <Title>{isMyPage ? '내' : `${pageOwner?.nickname}`}가 올린 레시피</Title>
          <SThumbnailSection> {myRecipeBoxes} </SThumbnailSection>
          <Title>{isMyPage ? '내' : `${pageOwner?.nickname}`}가 좋아하는 레시피</Title>
          <SThumbnailSection> {likeRecipeBoxes} </SThumbnailSection>
          <Title>{isMyPage ? '내' : `${pageOwner?.nickname}`}가 구독한 쉐프</Title>
          <SThumbnailSection> {subscribingChefBoxes} </SThumbnailSection>
        </div>
      </Container>
      <NavigationBar />
    </>
  );
};

export default UserDetail;
