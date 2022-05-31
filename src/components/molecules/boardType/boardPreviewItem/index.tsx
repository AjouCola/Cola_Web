import { useRouter } from 'next/router';

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
  LikeWrapper,
} from './styles';

import CommentIcon from '@assets/icon/comment_small.svg';
import HeartIcon from '@assets/icon/heart_small.svg';
import UserIcon from '@assets/icon/userDefault.svg';
import ViewIcon from '@assets/icon/view_small.svg';
import { IBoardItem } from '~/types/board';

const BoardPreviewItem = ({
  id,
  title,
  username,
  createdAt,
  thumbnailPath,
  preview,
  isLike,
  favorCount,
}: IBoardItem) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/board/${id}`)}>
      <Thumbnail>{thumbnailPath && <img src={thumbnailPath} alt={thumbnailPath + ' 이미지'} />}</Thumbnail>
      <TextWrapper>
        <TopContent>
          <Title>{title}</Title>
        </TopContent>
        <Divider />
        <BodyText>{preview}</BodyText>
        <BottomContent>
          <WriterDescription>
            <a style={{ display: 'inline-block' }}>
              <ProfileThumb>
                <UserIcon />
                {/* <img src="" alt="" /> */}
              </ProfileThumb>
            </a>
            <span>{username}</span>
            <p>{createdAt.slice(0, 10)}</p>
          </WriterDescription>
          <BoardDescription>
            <LikeWrapper>
              <HeartIcon style={{ opacity: isLike ? 1 : 0.5 }} />
              <span>{favorCount}</span>
            </LikeWrapper>
            <LikeWrapper>
              <CommentIcon />
              <span>25</span>
            </LikeWrapper>
            <LikeWrapper>
              <ViewIcon />
              <span>18</span>
            </LikeWrapper>
          </BoardDescription>
        </BottomContent>
      </TextWrapper>
    </Container>
  );
};
export default BoardPreviewItem;
