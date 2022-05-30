import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  padding: 4rem;
  display: grid;
  column-gap: 1rem;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  row-gap: 1rem;
  grid-template:
    'title title mode .' 1fr
    'contents contents contents hashtagBar' 10fr
    '. . btn .' 1fr
    / 6fr 2fr 3fr 2fr;
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 2rem;
    grid-template:
      'title mode' 1fr
      'hashtagBar hashtagBar' 1fr
      'contents contents' 7fr
      'btn btn' 1fr
      / 2fr 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
    grid-template:
      '. mode' 0.5fr
      'title title' 1fr
      'hashtagBar hashtagBar' 1fr
      'contents contents' 7fr
      'btn btn' 1fr
      / 1fr 1fr;
  }
`;

const EditorWrapper = styled.div`
  box-shadow: inset 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  grid-area: contents;
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 1024px;
  position: relative;
  & > div {
    height: 100%;
    width: 100%;
  }
`;
const HashtagBar = styled.div`
  grid-area: hashtagBar;
  border-radius: 30px;
  padding: 2rem 1rem;
  width: 100%;
  min-width: 200px;
  max-height: 80vh;
  background: ${theme.colors.blue[300]};
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: inset 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: lightgray;
    border-radius: 5px;
  }
  input {
    width: 100%;
    padding: 0.5rem;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    place-items: center;
    width: 100%;
    padding: 0 2rem;
    input {
      width: 10rem;
    }
    &::-webkit-scrollbar {
      height: 6px;
    }
    &::-webkit-scrollbar-thumb {
      height: 4px;
      border-radius: 5px;
    }
  }
`;

const Wrapper = styled.div`
  grid-area: mode;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 15px;

  height: fit-content;
  padding: 0.5rem;
  align-self: end;
  min-width: 8rem;
  justify-self: end;
  @media (max-width: ${theme.breakpoints.md}) {
    div {
      height: 80%;
    }
  }
`;
const TitleWrapper = styled.div`
  grid-area: title;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid ${({ theme: { colors } }) => colors.blue[300]};
`;
const TitleInput = styled.input`
  border: none;
  background: none;
  width: 100%;
  height: 100%;
  max-height: 3rem;
  padding: 0.2rem 0.5rem;
  outline: none;
  font-size: 1.3rem;
  ::placeholder {
    color: ${theme.colors.blue[500]};
    opacity: 0.7;
    font-size: 1.3rem;
  }
`;

export { Container, HashtagBar, Wrapper, EditorWrapper, TitleWrapper, TitleInput };
