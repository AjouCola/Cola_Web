import { useEffect, useState } from 'react';

import { marked } from 'marked';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';

import {
  Container,
  Header,
  Content,
  ContentDetail,
  ContentDetailRow,
  DetailInfoWrapper,
  DetailIconWrapper,
  MenuBtn,
  MenuDropdown,
  Title,
  TextArea,
  HashTagBarStyle,
  HashTagWrapper,
} from './styles';

import Heart from '@assets/icon/heart_primary.svg';
import Logo from '@assets/icon/logo.svg';
import HashtagChip from '@atoms/hashtagChip';
import UserDefault from '@components/atoms/icon/userDefault';
import { editPostData } from '@store/post';
import { IUserInfo, useUserSelector } from '@store/selector/user';
import { Board } from '@utils/api/Board';
import FavorApi from '@utils/api/PostFavor';
import Comment from 'public/comment.svg';
import CommentBig from 'public/comment_Big.svg';
// import Edit from 'public/edit.svg';
import HeartBig from 'public/heart_Big.svg';
import LeftArrow from 'public/left_arrow.svg';
import RightArrow from 'public/right_arrow.svg';
import Visit from 'public/visit.svg';

const PostViewer = dynamic(import('@components/molecules/editor/PostViewer'), { ssr: false });
interface Props {
  postId: number;
  postType: string;
  title: string;
  userId: number;
  userName: string;
  content: string;
  commentsCount: number;
  tags?: string[];
  createdDate: string;
  modifiedDate: string;
  isLike: boolean;
  favorCount: number;
}

const HashTagBar = ({ data }: { data: string[] }) => {
  const PER_PAGE = 6;
  const TOTAL_PAGE = Math.ceil(data.length / PER_PAGE);

  const [page, setPage] = useState(1);
  const [renderChip, setRenderChip] = useState<string[]>([]);

  const onClickNextPage = () => {
    if (page === TOTAL_PAGE) {
      setPage(1);
    } else {
      setPage((prev) => prev + 1);
    }
  };
  const onClickPrevPage = () => {
    if (page === 1) {
      setPage(TOTAL_PAGE);
    } else {
      setPage((prev) => prev - 1);
    }
  };

  useEffect(() => {
    setRenderChip(data.slice(PER_PAGE * (page - 1), PER_PAGE * page));
  }, [page]);

  return (
    <>
      <HashTagBarStyle>
        <LeftArrow onClick={onClickPrevPage} />
        <HashTagWrapper>
          {renderChip.map((tag, idx) => (
            <HashtagChip key={idx} title={tag} size="small" />
          ))}
        </HashTagWrapper>
        <RightArrow onClick={onClickNextPage} />
      </HashTagBarStyle>
      <p style={{ textAlign: 'center', width: '100%' }}> {page}</p>
    </>
  );
};

const BoardContent = ({
  postId,
  postType,
  title,
  userId,
  tags,
  userName,
  content,
  commentsCount,
  createdDate,
  modifiedDate,
  isLike,
  favorCount,
}: Props) => {
  const router = useRouter();

  const [postData, setEditPostData] = useRecoilState(editPostData);
  const { contents: userInfo } = useRecoilValueLoadable(useUserSelector({}));
  const [menu, setMenu] = useState(false);
  const [isLiked, setIsLiked] = useState(isLike);

  const onClickMenu = () => {
    setMenu((prev) => !prev);
  };
  const onClickEdit = () => {
    // alert('준비중입니다');
    if (confirm('게시글을 수정하시겠습니까?')) {
      setEditPostData({
        postId,
        title,
        content,
        tags: tags ?? [],
        thumbnailPath: postData.thumbnailPath,
        preview: postData.preview,
      });
      console.log(postData);
      router.push(`/board/edit/` + postId);
    }
  };
  const onClickDelete = async () => {
    if (confirm('게시글을 삭제하시겠습니까?')) {
      await Board.delete(Number(router.query.id)).finally(() => router.push('/'));
    }
  };

  const onClickSaveLikes = async () => {
    await FavorApi.saveFavor({ postId, status: !isLike }).then(() => setIsLiked(!isLiked));
  };
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Content>
        <div style={{ paddingTop: '3rem' }}>
          <p>{postType === 'common' ? '자유게시판' : postType === 'info' ? '정보게시판' : '질문게시판'}</p>
          <Title>{title}</Title>
          <ContentDetail>
            <ContentDetailRow>
              <span>
                {createdDate.slice(0, 10)}
                {createdDate !== modifiedDate ? '(수정됨)' : ''}
              </span>
              <DetailInfoWrapper>
                <Heart style={{ opacity: isLiked ? 1 : 0.5 }} />
                <span>{favorCount}</span>
                <Comment />
                <span>{commentsCount}</span>
                <Visit />
                <span>100</span>
              </DetailInfoWrapper>
            </ContentDetailRow>
            <ContentDetailRow>
              <DetailInfoWrapper>
                <UserDefault />
                <span>{userName}</span>
              </DetailInfoWrapper>
              <DetailIconWrapper>
                <HeartBig onClick={onClickSaveLikes} />
                <CommentBig />
                {(userInfo?.id ?? null) === userId && (
                  <MenuBtn onClick={onClickMenu}>
                    <span>•••</span>
                    {menu && (
                      <MenuDropdown>
                        <li onClick={onClickDelete}>삭제</li>
                        <li onClick={onClickEdit}>수정</li>
                      </MenuDropdown>
                    )}
                  </MenuBtn>
                )}
              </DetailIconWrapper>
            </ContentDetailRow>
          </ContentDetail>
        </div>
        {/* <TextArea dangerouslySetInnerHTML={{ __html: marked(content) }}></TextArea> */}
        <PostViewer content={content} />
        <HashTagBar data={tags ?? []} />
      </Content>
    </Container>
  );
};

export default BoardContent;
