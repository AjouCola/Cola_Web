import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  width: 18rem;
  height: 24rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 22px 22px 0px 0px;

  @media screen and(max-width:1025px) {
    width: 22rem;
    height: 28rem;
  }
  @media screen and (max-width: 769px) {
    width: 40vw;
  }
  @media screen and (max-width: 500px) {
    width: 90vw;
    height: 30rem;
  }
`;
const BoardContent = styled.div`
  cursor: pointer;
  flex: 1;
  width: 100%;
  background-color: white;
  border-radius: 22px;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  transform: translateY(0) translateX(0);

  transition: box-shadow 0.2s ease-in 0s, transform 0.2s ease-in 0s;
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  position: relative;
  &:hover {
    transform: translateY(-8px) translateX(2px);
    box-shadow: 1px 6px 10px #00000036;
  }
`;

const BoardImage = styled.div`
  border-radius: 22px;
  background: ${({ theme: { colors } }) => `linear-gradient(to top,${colors.blue[500]}, 50%, #c2d2f7)`};
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  img {
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }
`;
const TextWrapper = styled.div`
  padding: 0.75rem 1rem;
  display: flex;
  flex: 1 1 40%;
  flex-direction: column;
  justify-content: space-between;
  a {
    flex: 1;
    height: 100%;
    color: inherit;
    text-decoration: none;
    position: relative;
  }
`;
const Title = styled.h3`
  font-size: 1rem;
  margin: 0px 0px 0.25rem;
  line-height: 1.5;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  color: ${theme.colors.gray[900]};
`;
const BodyText = styled.p`
  height: 80%;
  margin: 0;
  word-break: break-word;
  overflow-wrap: break-word;
  font-size: 0.875rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${theme.colors.gray[900]};

  @media screen and (max-width: 769px) {
    font-size: 0.75rem;
  }
`;
const SubInfo = styled.div`
  font-size: 0.9rem;
  line-height: 1.5;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  @media screen and (max-width: 769px) {
    font-size: 0.75rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.85rem;
  }
`;

const DescriptionWrapper = styled.div`
  padding: 0 1rem;
  height: 100%;
  width: calc(100% - 50px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f1f3f5;
  border-radius: 22px;
  color: #ffffff;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  font-size: 0.75rem;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  @media screen and (max-width: 769px) {
    font-size: 0.7rem;
    padding: 0 0.8rem;
  }
  @media screen and (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 80%;
  }
  // img {
  //   width: 38px;
  //   height: 38px;
  //   box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  //   object-fit: cover;
  //   border-radius: 100%;
  //   display: block;
  //   background: ${({ theme: { colors } }) => colors.blue[500]};
  // }
`;
const DescriptionContent = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  margin-right: 0.2rem;
  svg {
    margin-right: 0.2rem;
  }
  @media screen and (max-width: 769px) {
    margin-right: 0.15rem;
    svg {
      margin-right: 0.15rem;
    }
  }
  @media screen and (max-width: 500px) {
    margin-right: 0.2rem;
    svg {
      margin-right: 0.2rem;
    }
  }
`;
const Likes = styled(DescriptionContent)``;
const Comments = styled(DescriptionContent)``;
const Views = styled(DescriptionContent)``;

const Divider = styled.div`
  height: 3px;
  width: 26px;
  background: ${({ theme: { colors } }) => colors.blue[500]};
`;
export {
  Container,
  BoardContent,
  BoardImage,
  TextWrapper,
  Title,
  SubInfo,
  BodyText,
  DescriptionWrapper,
  UserInfo,
  Likes,
  Comments,
  Views,
  Divider,
};
