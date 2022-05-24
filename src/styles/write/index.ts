import styled from '@emotion/styled';
import { theme } from '@styles/theme';

const Container = styled.div`
  padding: 5rem;
  display: grid;
  column-gap: 1rem;
  width: 100%;
  row-gap: 1rem;
  grid-template:
    'title . mode .' 1fr
    'contents contents contents hashtagBar' 10fr
    '. . btn .' 1fr
    / 6fr 4fr 2fr 2fr;
  @media (max-width: ${theme.breakpoints.md}) {
    grid-template:
      'title' 1fr
      'hashtagBar' 1fr
      'contents' 10fr
      'btn' 1fr
      / 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
    grid-template:
      'title' 1fr
      'hashtagBar' 1fr
      'contents' 10fr
      'btn' 1fr
      / 1fr;
  }
`;

const HashtagBar = styled.div`
  grid-area: hashtagBar;
  border-radius: 30px;
  padding: 2rem 1rem;
  width: 100%;
  background: ${theme.colors.blue[300]};
  display: flex;
  overflow: auto;
  overflow-x: hidden;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: inset 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  input {
    width: 100%;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    place-items: center;
    max-width: 100%;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 15px;
  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const TitleInput = styled.input`
  grid-area: title;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  border: none;
  background: none;
  ::placeholder {
    color: ${theme.colors.blue[500]};
  }
`;

export { Container, HashtagBar, Wrapper, TitleInput };
