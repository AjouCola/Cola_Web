import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  border-radius: 24px;
  box-shadow: 0px 0px 6px ${theme.colors.shadow};
`;

const Header = styled.h2`
  width:100%;
  height: 8rem;
  padding: height: 8rem;
  padding: 2.2rem;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  outline: none;
  align-items: center;
  font-size: 3rem;
  color: ${theme.colors.white};
  background-image: url('/header.png');
  background-position: center;
  background-size: cover;
  text-align: center;

  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}){
    height: 6rem;
    padding: 1.5rem;
  }
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
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 2px solid ${({ theme }) => theme.colors.blue[400]};
  span {
    font-size: 1rem;
  }
  &:nth-last-of-type(1) {
    border: none;
  }
`;
const DetailInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  font-size: 1rem;
  font-weight: medium;
  padding: 0.5rem;
  border-radius: 12px;
  svg {
    cursor: pointer;
  }
  svg:hover {
    opacity: 0.8;
  }
`;
const DetailIconWrapper = styled(DetailInfoWrapper)`
  background: white;
  box-shadow: inset 0px 0px 6px #00000029;
`;
const Title = styled.h3`
  color: ${({ theme }) => theme.colors.blue[500]};
  font-size: 2rem;
  letter-spacing: 0;
  margin: 0;
  font-weight: 500;
`;

const TextArea = styled.div`
  overflow: hidden;
  border: 10px;
  padding: 2rem;
  min-height: 30vh;
  box-shadow: inset 0px 0px 6px ${theme.colors.shadow};

  white-space: pre-wrap;
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

const MenuBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  cursor: pointer;
  font-size: 1.2rem;
  position: relative;
  &:hover {
    opacity: 0.8;
  }
`;
const MenuDropdown = styled.ul`
  position: absolute;
  top: 2.5rem;
  right: -0.3rem;
  border-radius: 14px;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 6px;
  width: 8rem;
  background: white;

  padding: 0rem 1rem;
  li {
    text-align: center;
    width: 100%;
    font-size: 1rem;
    padding: 0.5rem 0;
    &:hover {
      opacity: 0.8;
    }
    &:nth-of-type(1) {
      border-top-right-radius: 14px;
      border-top-left-radius: 14px;
      border-bottom: 1px solid;
    }
    &:nth-last-of-type(1) {
      border-bottom-right-radius: 14px;
      border-bottom-left-radius: 14px;
    }
  }
`;

export {
  Container,
  Header,
  Content,
  ContentDetail,
  ContentDetailRow,
  DetailInfoWrapper,
  MenuBtn,
  MenuDropdown,
  DetailIconWrapper,
  Title,
  TextArea,
  HashTagBarStyle,
  HashTagWrapper,
};
