import { useRouter } from 'next/router';

import { Likes, Views, Comments } from '../boardCard/styles';

import { Container, Title, DescriptionWrapper, UserDescription, SubDescription, ProfileThumb } from './styles';

import CommentIcon from '@assets/icon/comment_small.svg';
import HeartIcon from '@assets/icon/heart_small.svg';
import UserIcon from '@assets/icon/userDefault.svg';
import ViewIcon from '@assets/icon/view_small.svg';
import { IBoardItem } from '~/types/board';

const BoardSimpleItem = ({ id, title, username, createdAt, likes, isLike }: IBoardItem) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/board/${id}`)}>
      <Title>{title}</Title>
      <DescriptionWrapper>
        <a>
          <ProfileThumb>
            <UserIcon />
            <img src="" alt="" />
          </ProfileThumb>
        </a>
        <UserDescription>
          <span>{username}</span>
          <span>{createdAt.slice(0, 10)}</span>
        </UserDescription>

        <SubDescription>
          <Likes style={{ gap: 5, fontSize: 15, opacity: isLike ? 1 : 0.5 }}>
            <HeartIcon />
            <span>{likes}</span>
          </Likes>
          <Comments style={{ gap: 5, fontSize: 15 }}>
            <CommentIcon />
            <span>25</span>
          </Comments>
          <Views style={{ gap: 5, fontSize: 15 }}>
            <ViewIcon />
            <span>18</span>
          </Views>
        </SubDescription>
      </DescriptionWrapper>
    </Container>
  );
};
export default BoardSimpleItem;
