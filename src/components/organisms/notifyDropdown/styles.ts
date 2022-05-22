import styled from '@emotion/styled';

export const Container = styled.div`
  width: 28rem;
  max-height: 35rem;
  padding: 2rem;
  box-shadow: 0px 0px 6px #00000029;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    padding: 2rem 1rem;
    width: 24rem;
  }
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.sm}) {
    padding: 2rem 1rem;
    width: 100vw;
  }
`;
export const DropdownWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
  gap: 0.6rem;
  padding: 0 1rem;
  &::-webkit-scrollbar {
    width: 5px;
    padding: 1px 0;
  }
  &::-webkit-scrollbar-thumb {
    width: 4px;
    border-radius: 4px;
    background: ${({ theme: { colors } }) => colors.blue[200]};
  }
`;
