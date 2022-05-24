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
import { IBoardItem } from '~/types/board';

const BoardCard = ({ id, username, createdAt, title }: IBoardItem) => {
  const router = useRouter();

  return (
    <Container>
      <BoardContent onClick={() => router.push(`/board/${id}`)}>
        <a href="#" style={{ height: '70%', display: 'block', color: 'inherit', textDecoration: 'none' }}>
          <BoardImage>{/* <img src={} alt="" /> */}</BoardImage>
        </a>
        <div style={{ padding: '5px 0', display: 'flex', justifyContent: 'center' }}>
          <Divider />
        </div>
        <TextWrapper>
          <a href="#">
            <Title>{title}</Title>
            <BodyText>본문 내용 일부</BodyText>
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
              <Likes>
                <HeartIcon />
                <span>13</span>
              </Likes>
              <Comments>
                <CommentIcon />
                <span>25</span>
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
