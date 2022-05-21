import styled from '@emotion/styled';
import type { NextPage } from 'next';

import TodoSection from '@components/organisms/homeSection/todoSection';
import BoardSection from '@organisms/homeSection/boardSection';
import { theme } from '@styles/theme';

const SectionWrapper = styled.div`
  width: 100%;
  gap: 2rem;
  padding: 2rem 1rem;
  display: grid;
  height: 100%;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
const BoardSectionWrapper = styled.div`
  width: 100%;
  gap: 2rem;
  padding: 2rem 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Container = styled.div`
  height: 100%;
  width: 100%;
`;

const Banner = styled.div`
  min-height: 40vh;
  background: url('/home_banner.svg');
  background-position: center;
  background-size: cover;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Banner></Banner>
      <SectionWrapper>
        <TodoSection />
      </SectionWrapper>
      <BoardSectionWrapper>
        <BoardSection />
        <BoardSection />
      </BoardSectionWrapper>
    </Container>
  );
};

export default Home;
