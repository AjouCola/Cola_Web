import styled from '@emotion/styled';
import type { NextPage } from 'next';

import TodoSection from '@components/organisms/homeSection/todoSection';
import Seo from '@components/Seo';
import BoardSection from '@organisms/homeSection/boardSection';
import { theme } from '@styles/theme';

const SectionWrapper = styled.div`
  /* gap: 2rem; */
  width: 100%;
  row-gap: 1rem;
  display: grid;
  height: 100%;
  padding: 1rem;
  box-sizing: border-box;
  column-gap: 1rem;
  grid-template-columns: 1.5fr 1.5fr 1fr;
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
  padding-top: 5rem;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding-top: 4rem;
  }
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding-top: 3rem;
  }
`;

const Banner = styled.div`
  min-height: 40vh;
  position: relative;
  background: url('/home_banner.svg');
  background-position: center;
  background-size: cover;
  overflow: hidden;
  div:nth-child(1) {
    position: absolute;
    bottom: -6rem;
    left: 4rem;
    img {
      width: 14rem;
      height: 14rem;
    }
    @media (max-width: ${theme.breakpoints.md}) {
      bottom: -4rem;
      left: 4rem;
      img {
        width: 8rem;
        height: 8rem;
      }
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      bottom: -1.6rem;
      left: 2rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  div:nth-child(2) {
    position: absolute;
    top: 4rem;
    left: 20rem;
    img {
      width: 7rem;
      height: 7rem;
    }
    @media (max-width: ${theme.breakpoints.md}) {
      top: 2rem;
      left: 16rem;
      img {
        width: 5rem;
        height: 5rem;
      }
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      top: 2rem;
      left: 8rem;
      img {
        width: 3rem;
        height: 3rem;
      }
    }
  }
  div:nth-child(3) {
    position: absolute;
    bottom: -6rem;
    right: 10rem;
    img {
      width: 20rem;
      height: 20rem;
    }
    @media (max-width: ${theme.breakpoints.md}) {
      right: 2rem;
      bottom: -4rem;
      img {
        width: 12rem;
        height: 12rem;
      }
    }
    @media (max-width: ${theme.breakpoints.sm}) {
      right: 2rem;
      bottom: -2rem;
      img {
        width: 8rem;
        height: 8rem;
      }
    }
  }
  div:nth-child(4) {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    img {
      width: 24rem;
      height: 24rem;
      @media (max-width: ${theme.breakpoints.md}) {
        width: 18rem;
        height: 18rem;
      }
      @media (max-width: ${theme.breakpoints.sm}) {
        width: 10rem;
        height: 10rem;
      }
    }
  }
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Seo title="홈" />
      <Banner>
        <div>
          <img src="/circle_s.svg" />
        </div>
        <div>
          <img src="/circle_s.svg" />
        </div>
        <div>
          <img src="/circle.svg" />
        </div>
        <div>
          <img src="/logo.svg" />
        </div>
      </Banner>
      <SectionWrapper>
        <TodoSection />
      </SectionWrapper>
      <BoardSectionWrapper>
        {/* 인기글 */}
        <BoardSection type="인기글" />
        {/* 최신글 */}
        <BoardSection type="최신글" />
      </BoardSectionWrapper>
    </Container>
  );
};

export default Home;
