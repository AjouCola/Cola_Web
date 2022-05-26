import styled from '@emotion/styled';

import { Likes, Views, Comments } from '../boardCard/styles';

import { theme } from '@styles/theme';

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  height: 270px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  transform: translateY(0) translateX(0);
  transition: all 200ms ease-in-out;
  &:hover {
    transform: translateY(-0.4rem) translateX(0.1rem);
    transition: all 200ms ease-in-out;
  }
`;
const TextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 1.8rem 1.6rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 1rem 1.2rem;
  }
`;
const Thumbnail = styled.div`
  height: 100%;
  width: 320px;
  background: ${({ theme: { colors } }) => `linear-gradient(to top,${colors.blue[500]}, 50%, #c2d2f7)`};
  border-radius: 10px;
  transition: width 20ms ease;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 14rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
const TopContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.div`
  margin: 0;
  padding: 0.3rem 0;
  font-weight: 700;
  font-size: 1.6rem;
  color: #4f4f53;
`;
const Divider = styled.div`
  width: 85px;

  border-bottom: 2px solid ${({ theme }) => theme.colors.blue[500]};
`;
const BodyText = styled.p`
  flex: 1;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0px;
  color: #4f4f53;
  padding-top: 0.3rem;
`;
const BottomContent = styled.div`
  display: flex;
  align-items: center;
  height: 47px;
  background: ${({ theme }) => theme.colors.blue[100]};
  border-radius: 25px;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-wrap: wrap;
    height: 2rem;
    margin-bottom: 0.5rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-wrap: nowrap;
    flex-direction: column;
    margin-bottom: 1rem;
    gap: 0.1rem;
    height: 2rem;
  }
`;
const ProfileThumb = styled.div`
  width: 47px;
  height: 47px;
  border-radius: 100%;
  background: ${({ theme }) => theme.colors.blue[500]};
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  svg {
    height: 100%;
    width: 70%;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 2rem;
    width: 2rem;
  }
`;
const WriterDescription = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  flex: 1;
  color: ${theme.colors.gray[900]};
  font-size: 17px;
  font-weight: 500;
  p {
    width: fit-content;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 0.9rem;
    white-space: nowrap;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 0.5rem;
    width: 100%;
    p {
      width: fit-content;
    }
    span {
      width: fit-content;
    }
  }
`;
const BoardDescription = styled.div`
  display: flex;
  flex-basis: 24%;
  height: 100%;
  border-radius: 25px;
  align-items: center;
  justify-content: space-evenly;
  color: white;
  background: ${({ theme }) => theme.colors.blue[500]};
  font-weight: 500;
  padding: 0 1rem;
  gap: 0.4rem;
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 0.6rem;
    font-size: 0.8rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 2rem;
    width: 100%;
  }
`;

const LikeWrapper = styled(Likes)`
  gap: 0.2rem;
  font-size: 1.1rem;
  span {
    padding-right: 0.2rem;
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 1rem;
  }
`;
export {
  Container,
  TextWrapper,
  TopContent,
  BodyText,
  BottomContent,
  WriterDescription,
  Thumbnail,
  Title,
  Divider,
  ProfileThumb,
  BoardDescription,
  LikeWrapper,
};
