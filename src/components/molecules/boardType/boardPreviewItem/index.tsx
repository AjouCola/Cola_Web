import { useRouter } from 'next/router';

import { Likes, Views, Comments } from '../boardCard/styles';

import {
  Container,
  TextWrapper,
  TopContent,
  WriterDescription,
  Thumbnail,
  Title,
  BodyText,
  BottomContent,
  Divider,
  ProfileThumb,
  BoardDescription,
} from './styles';

import CommentIcon from '@assets/icon/comment_small.svg';
import HeartIcon from '@assets/icon/heart_small.svg';
import ViewIcon from '@assets/icon/view_small.svg';
import { IBoardItem } from '~/types/board';

const BoardPreviewItem = ({ id, title, username, createdAt }: IBoardItem) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/board/${id}`)}>
      <Thumbnail />
      <TextWrapper>
        <TopContent>
          <Title>{title}</Title>
        </TopContent>
        <Divider />
        <BodyText>글 내용</BodyText>
        <BottomContent>
          <WriterDescription>
            <a style={{ display: 'inline-block' }}>
              <ProfileThumb>
                <img src="" alt="" />
              </ProfileThumb>
            </a>
            <span style={{ flexBasis: '100%' }}>{username}</span>
            <p style={{ width: '200px' }}>{createdAt.slice(0, 10)}</p>
          </WriterDescription>
          <BoardDescription>
            <Likes style={{ gap: 5, fontSize: 15 }}>
              <HeartIcon />
              <span>13</span>
            </Likes>
            <Comments style={{ gap: 5, fontSize: 15 }}>
              <CommentIcon />
              <span>25</span>
            </Comments>
            <Views style={{ gap: 5, fontSize: 15 }}>
              <ViewIcon />
              <span>18</span>
            </Views>
          </BoardDescription>
        </BottomContent>
      </TextWrapper>
    </Container>
  );
};
export default BoardPreviewItem;
