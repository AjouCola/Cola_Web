import { ReactElement } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/router';

import { Container, Section, ListWrapper, ListItem, MenuWrapper } from './styles';

import FreeBoardIcon from '@assets/icon/free_board.svg';
import HomeIcon from '@assets/icon/home.svg';
import InfoBoardIcon from '@assets/icon/info.svg';
import QuestionBoardIcon from '@assets/icon/question.svg';
import TodoIcon from '@assets/icon/todo.svg';
import HashtagChip from '@components/atoms/hashtagChip';

const categories = [
  {
    id: 1,
    title: '자유게시판',
    link: '/board',
    icon: <FreeBoardIcon />,
  },
  {
    id: 2,
    title: '질문게시판',
    link: '/board',
    icon: <QuestionBoardIcon />,
  },
  {
    id: 3,
    title: '정보게시판',
    link: '/board',
    icon: <InfoBoardIcon />,
  },
  {
    id: 4,
    title: 'TodoList',
    link: '/todolist',
    icon: <TodoIcon />,
  },
  { id: 5, title: 'AjouGather', link: '/gather', icon: <TodoIcon /> },
];

const hashtags = [
  {
    id: 11,
    title: 'Front-end',
  },
  {
    id: 12,
    title: 'Back-end',
  },
  {
    id: 13,
    title: 'React',
  },
  {
    id: 14,
    title: 'C',
  },
];

interface ICategoryItem {
  content: string;
  link: string;
  children?: ReactElement;
}

const SideBar = () => {
  const router = useRouter();

  // const onClickClose = () => {};

  const CategoryCrossLine = () => (
    <div className="cross-line">
      <div className="circle-wrapper">
        <div className="half-circle"></div>
      </div>
    </div>
  );
  const CategoryItem = ({ content, link, children }: ICategoryItem) => (
    <ListItem>
      <a href="#" onClick={() => router.push(link)}>
        {children}
        <span className="nav-text">{content}</span>
      </a>
      <CategoryCrossLine />
    </ListItem>
  );

  return (
    <Container>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', padding: '0 55px' }}>
        <Link href="/">
          <a style={{ display: 'flex', gap: '1rem', justifyContent: 'center', alignItems: 'center' }}>
            <HomeIcon />
            <span style={{ color: 'white', fontSize: '1.6rem' }}>HOME</span>
          </a>
        </Link>
        {/* <CloseSidebar onClick={onClickClose} /> */}
      </div>
      <Section>
        <MenuWrapper>
          <h3>카테고리</h3>
        </MenuWrapper>
        <ListWrapper>
          {categories.map((category) => (
            <CategoryItem key={category.id} content={category.title} link={category.link}>
              {category.icon}
            </CategoryItem>
          ))}
        </ListWrapper>
      </Section>

      <Section>
        <MenuWrapper>
          <h3>관심목록</h3>
        </MenuWrapper>
        <ListWrapper className="logout">
          {hashtags.map((hashtag) => (
            <HashtagChip
              key={hashtag.id}
              title={hashtag.title}
              onClick={() => {
                console.log('onClick Category chip');
              }}
              onRemoveChip={() => {
                console.log('onRemove Chip');
              }}
              size={'sidebar'}
            />
          ))}
        </ListWrapper>
      </Section>
    </Container>
  );
};
export default SideBar;
