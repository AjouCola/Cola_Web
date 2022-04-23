import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  border-radius: 24px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
`;

const Header = styled.h2`
  width: 1200px;
  height: 151px;
  padding: calc((151px - 3rem) / 2 - 0.5rem);
  padding-bottom: 0;
  outline: none;
  align-items: center;
  font-size: 3rem;
  color: ${theme.colors.white};
  background-image: url('/header.png');
  background-position: center;
  background-size: cover;
  text-align: center;
`;

const Content = styled.div`
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const ContentDetail = styled.div`
  color: ${({ theme }) => theme.colors.gray[900]};
  font-size: 1.1rem;
  gap: 1rem;
`;
const ContentDetailRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue[400]};
  &:nth-last-of-type(1) {
    border: none;
  }
`;
const DetailInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  font-size: 1.1rem;
  font-weight: medium;
`;
const Title = styled.h3`
  color: ${({ theme }) => theme.colors.blue[500]};
  font-size: 43px;
  letter-spacing: 0;
  margin: 0;
  font-weight: 500;
`;

const TextArea = styled.div`
  border: 10px;
  min-height: 80vh;
  box-shadow: inset 0px 0px 6px ${theme.colors.shadow};
`;

const HashTagBarStyle = styled.div`
  background: ${theme.colors.blue[500]};
  align-items: center;
  min-height: 6vh;
  padding: 1rem;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  overflow-x: scroll;

  div {
    width: 90%;
    column-gap: 2rem;
    /* overflow-x: auto; */
    overflow-y: hidden;
    display: flex;
  }
`;

const HashTagWrapper = styled.div`
  display: flex;
  transition: all 200ms ease-in-out;
  /* 
  &::-webkit-scrollbar {
    height: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.blue['200']};
    border-radius: 5px;
  }
  &::-webkit-scrollbar-track {
    padding: 1px 0;
  } */
`;
export {
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
};
