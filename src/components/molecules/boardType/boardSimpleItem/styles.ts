import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Container = styled.div`
  cursor: pointer;
  width: 100%;
  max-width: 1200px;
  height: 47px;
  // background-color: white;
  border-radius: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: flex-end;
    box-shadow: none;
    height: fit-content;
    gap: 0.3rem;
  }
`;
const Title = styled.h3`
  padding: 0 40px;
  color: ${theme.colors.gray[900]};
  font-size: 22px;
  flex: 1;
  background-color: white;
  border-radius: 25px;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: 0.4rem 1rem;
    font-size: 1.2rem;
    width: 100%;
    box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  }
`;
const DescriptionWrapper = styled.div`
  gap: 1rem;
  display: flex;
  align-items: center;
  flex: 1;
  height: 47px;
  background: ${({ theme }) => theme.colors.blue[100]};
  box-shadow: 0px 0px 6px ${({ theme }) => theme.colors.shadow};
  border-radius: 25px;
  color: ${theme.colors.gray[900]};
  font-size: 17px;
  font-weight: 500;
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    height: 2rem;
    padding-right: 0.5rem;

    span:nth-of-type(2) {
      padding-right: 0.5rem;
    }
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
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: 1rem;
    height: 2.1rem;
    width: 2.1rem;
    span:nth-of-type(2) {
      padding-right: 0.5rem;
    }
  }
`;

const UserDescription = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
  gap: 1rem;
`;
const SubDescription = styled.div`
  display: flex;
  padding: 0 20px;
  background: ${({ theme }) => theme.colors.blue[500]};
  height: 47px;
  border-radius: 25px;
  align-items: center;
  gap: 10px;
  color: white;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export { Container, Title, DescriptionWrapper, ProfileThumb, UserDescription, SubDescription };
