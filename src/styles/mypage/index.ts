import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  display: grid;

  box-sizing: border-box;
  grid-template:
    'title .' 1fr
    'info content' 10fr
    / 7fr 4fr;
  column-gap: 4rem;
  @media (max-width: ${theme.breakpoints.md}) {
    width: 60%;
    grid-template:
      'title' 2rem
      'info ' 2fr
      'content' 4fr
      / 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    width: 100%;
    grid-template:
      'title' 2rem
      'info ' 2fr
      'content' 4fr
      / 1fr;
  }
`;

const Title = styled.h2`
  grid-area: title;
  color: ${theme.colors.blue[500]};
`;

const CardContainer = styled.div`
  grid-area: info;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

const ContentContainer = styled.div`
  grid-area: content;
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
`;

const BackgroundImage = styled.div`
  z-index: 2;
  position: absolute;
  left: -5rem;
  width: 8rem;
  height: 8rem;
  border-radius: 100vw;
  background: ${theme.colors.white};
  border: 1px solid ${theme.colors.gray[600]};
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  @media (max-width: ${theme.breakpoints.md}) {
    /* display: none; */
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  border-radius: 10px;
  box-shadow: 0px 0px 10px ${theme.colors.shadow};
  padding: 1.5rem 2.5rem;
  box-sizing: border-box;
  flex-direction: column;
  text-align: center;
  min-width: 20vw;
  row-gap: 1rem;
  background: ${theme.colors.white};
  h3 {
    color: ${({ theme: { colors } }) => colors.gray[900]};
    border-bottom: 1px solid black;
    white-space: nowrap;
    font-weight: 600;
    font-size: 1.3rem;
    padding-bottom: 1rem;
  }
  button {
    border: none;
    background: none;
    color: ${theme.colors.blue[500]};
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.2rem;
    :hover {
      border-radius: 18px;
      background-color: ${theme.colors.blue[100]};
    }
  }
`;

export { Container, Title, CardContainer, ContentContainer, BackgroundImage, ModalContainer };
