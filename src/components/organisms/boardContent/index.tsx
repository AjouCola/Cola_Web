import { useEffect, useState } from 'react';

import {
  Container,
  Header,
  Content,
  ContentDetail,
  ContentDetailRow,
  DetailInfoWrapper,
  Title,
  TextArea,
  HashTagBarStyle,
  HashTagWrapper,
} from './styles';

import Logo from '@assets/icon/logo.svg';
import HashtagChip from '@atoms/hashtagChip';
import UserDefault from '@components/atoms/icon/userDefault';
import Comment from 'public/comment.svg';
import CommentBig from 'public/comment_Big.svg';
import Heart from 'public/heart.svg';
import HeartBig from 'public/heart_Big.svg';
import LeftArrow from 'public/left_arrow.svg';
import RightArrow from 'public/right_arrow.svg';
import Visit from 'public/visit.svg';

interface Props {
  title: string;
  userName: string;
  content: string;
  createdDate: string;
  modifiedDate: string;
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

const BoardContent = ({ title, userName, content, createdDate, modifiedDate }: Props) => {
  return (
    <Container>
      <Header>
        <Logo />
      </Header>
      <Content>
        <div style={{ paddingTop: '3rem' }}>
          <Title>{title}</Title>
          <ContentDetail>
            <ContentDetailRow>
              <span>
                {createdDate.slice(0, 10)}
                {createdDate !== modifiedDate ? '(수정됨)' : ''}
              </span>
              <DetailInfoWrapper>
                <Heart />
                <span>100</span>
                <Comment />
                <span>100</span>
                <Visit />
                <span>100</span>
              </DetailInfoWrapper>
            </ContentDetailRow>
            <ContentDetailRow>
              <DetailInfoWrapper>
                <UserDefault />
                <span>{userName}</span>
              </DetailInfoWrapper>
              <DetailInfoWrapper>
                <HeartBig />
                <CommentBig />
                <span style={{ fontSize: '1.2rem', cursor: 'pointer' }}>...</span>
              </DetailInfoWrapper>
            </ContentDetailRow>
          </ContentDetail>
        </div>
        <TextArea>
          <pre>{content}</pre>
        </TextArea>
        <HashTagBar
          data={[
            'java',
            'javascript',
            'python',
            'C',
            'C#',
            'C++',
            'Go',
            'ruby',
            'javascript',
            'python',
            'C',
            'C#',
            'C++',
            'Go',
            'ruby',
          ]}
        />
      </Content>
    </Container>
  );
};

export default BoardContent;
