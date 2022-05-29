import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  position: relative;
  display: flex;
  border-radius: 10px;
  // padding: 4rem;
  width: 100%;
  height: 20rem;
  box-sizing: border-box;
  border: 1px solid ${theme.colors.blue[500]};
  box-shadow: 10px 10px 6px ${theme.colors.blue[300]};
  background: ${theme.colors.white};
`;

const UserProfileWarpper = styled.div`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  img {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
  }
`;

const UserProfile = styled.p`
  border-radius: 50%;
  background: green;
  width: 8rem;
  height: 8rem;
  @media (max-width: ${theme.breakpoints.md}) {
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    display: none;
  }
`;

const CardWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;

  justify-content: space-evenly;
`;

const TextWrapper = styled.div`
  h2 {
    color: ${theme.colors.blue[500]};
  }
  p {
    color: ${theme.colors.gray[600]};
  }
  label {
    background: ${theme.colors.blue[500]};
    color: ${theme.colors.gray[600]};
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  align-items: flex-end;
  right: 0px;
  top: 0px;
  justify-content: space-between;
  svg:nth-of-type(1) {
    cursor: pointer;
  }
  svg:nth-of-type(1):hover {
    opacity: 0.7;
  }
`;

const ModalContainer = styled.div`
  background: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding: 1rem;
  border-radius: 10px;
  width: 60vmin;
  height: 60vmin;
  img {
    width: 30vmin;
    height: 30vmin;
  }
  button {
    border: none;
    place-self: center;
    width: 50%;
    border-radius: 10px;
    color: white;
    background: ${theme.colors.blue[500]};
    font-size: 2rem;
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;

export { Container, ModalContainer, UserProfileWarpper, UserProfile, CardWrapper, TextWrapper, IconWrapper };
