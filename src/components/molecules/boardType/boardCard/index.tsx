import { useState } from 'react';

import { useRouter } from 'next/router';

import {
  Container,
  BoardImage,
  BoardContent,
  TextWrapper,
  Title,
  BodyText,
  SubInfo,
  DescriptionWrapper,
  UserInfo,
  Likes,
  Comments,
  Views,
  Divider,
} from './styles';

import CommentIcon from '@assets/icon/comment_small.svg';
import HeartIcon from '@assets/icon/heart_small.svg';
import ViewIcon from '@assets/icon/view_small.svg';
import UserDefault from '@components/atoms/icon/userDefault';
import { theme } from '@styles/theme';
import FavorApi from '@utils/api/PostFavor';
import { IBoardItem } from '~/types/board';

const BoardCard = ({ id, username, createdAt, title, preview, thumbnailPath, isLike, likes }: IBoardItem) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(isLike);

  const saveLikes = async () => {
    await FavorApi.saveFavor({ postId: id, status: !isLike }).then(() => setIsLiked(!isLiked));
  };
  return (
    <Container>
      <BoardContent onClick={() => router.push(`/board/${id}`)}>
        <a href="#" style={{ height: '70%', display: 'block', color: 'inherit', textDecoration: 'none' }}>
          <BoardImage>{thumbnailPath && <img src={thumbnailPath} alt={title + ' 이미지'} />}</BoardImage>
        </a>
        <TextWrapper>
          <a href="#">
            <Title>{title}</Title>
            <BodyText>{preview}</BodyText>
          </a>
          <SubInfo>
            <span>{createdAt.slice(0, 10)}</span>
          </SubInfo>
        </TextWrapper>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '100vw',
            justifyContent: 'space-between',
            backgroundColor: `${theme.colors.blue[100]}`,
          }}
        >
          <UserInfo>
            <UserDefault />
          </UserInfo>
          <DescriptionWrapper>
            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
              <b>{username}</b>
            </p>
            <div style={{ display: 'flex', gap: '5px' }}>
              <Likes onClick={saveLikes}>
                <HeartIcon style={{ opacity: isLiked ? 1 : 0.5 }} />
                <span>{likes}</span>
              </Likes>
              <Comments>
                <CommentIcon />
                <span>11</span>
              </Comments>
              <Views>
                <ViewIcon />
                <span>18</span>
              </Views>
            </div>
          </DescriptionWrapper>
        </div>
      </BoardContent>
    </Container>
  );
};
export default BoardCard;
