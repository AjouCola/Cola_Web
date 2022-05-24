import { useRouter } from 'next/router';

import { Likes, Views, Comments } from '../boardCard/styles';
import { ProfileThumb } from '../boardPreviewItem/styles';

import { Container, Title, DescriptionWrapper, SubDescription } from './styles';

import CommentIcon from '@assets/icon/comment_small.svg';
import HeartIcon from '@assets/icon/heart_small.svg';
import ViewIcon from '@assets/icon/view_small.svg';
import { IBoardItem } from '~/types/board';

const BoardSimpleItem = ({ id, title, username, createdAt }: IBoardItem) => {
  const router = useRouter();

  return (
    <Container onClick={() => router.push(`/board/${id}`)}>
      <Title>{title}</Title>
      <DescriptionWrapper>
        <a>
          <ProfileThumb>
            <img src="" alt="" />
          </ProfileThumb>
        </a>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'space-between',
            whiteSpace: 'nowrap',
            gap: 10,
          }}
        >
          <span>{username}</span>
          <span>{createdAt}</span>
        </div>

        <SubDescription>
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
        </SubDescription>
      </DescriptionWrapper>
    </Container>
  );
};
export default BoardSimpleItem;
