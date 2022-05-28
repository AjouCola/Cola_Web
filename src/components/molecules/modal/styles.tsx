import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 998;
  left: 0;
  top: 0;
  text-align: center;
  background: rgba(108, 123, 250, 0.23);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
`;

const MajorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: white;
  width: 25rem;
  min-height: 50vh;
  opacity: 1;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0px 0px 10px ${({ theme }) => theme.colors.shadow};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100vw;
    height: 100vh;
  }
`;

const Title = styled.h2`
  font-size: 3rem;
  font-weight: 500;
  color: ${theme.colors.blue[500]};
  border-bottom: 0.3rem solid ${theme.colors.blue[500]};
  margin: 20px 0px 30px 0px;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-height: 30rem;
  min-height: 15rem;
  padding: 1rem 2rem;
  flex: 1;
  overflow: auto;
  row-gap: 1vmin;
  margin: 0 0 35px 0;
  background: white;
  label {
    display: flex;
    align-items: center;
    column-gap: 1vmin;
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    width: 1vmin;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background: ${theme.colors.blue[500]};
  }
`;
const MajorWrapper = styled(ContentWrapper)``;

const FooterWrapper = styled.div`
  display: flex;
  width: 80%;
  justify-content: space-between;
  padding-bottom: 25px;
  p {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.gray[100]};
  }
`;
const CheckBox = styled.div<{ selected: boolean }>`
  border-radius: 100px;
  border: 1px solid ${({ theme }) => theme.colors.shadow};
  height: 1rem;
  width: 1rem;
  background: ${({ theme, selected }) => (selected ? theme.colors.blue[500] : 'none')};
`;

const Span = styled.span<{ selected: boolean }>`
  font-size: 1.2rem;
  color: ${({ selected, theme }) => (selected ? theme.colors.blue[500] : theme.colors.gray[100])};
`;

export { Background, MajorContainer, Content, Title, ContentWrapper, MajorWrapper, FooterWrapper, CheckBox, Span };
