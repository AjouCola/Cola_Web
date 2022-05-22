import styled from '@emotion/styled';

const Container = styled.div<{ focus: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 36rem;
  height: 53px;
  margin-right: 2rem;
  border-radius: ${({ focus }) => (focus ? '0px' : '28px')};
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  box-shadow: ${({ focus, theme: { colors } }) =>
    focus ? `2px -2px 4px ${colors.shadow}` : `0px 1px 4px 2px ${colors.shadow}`};
  background: transparent;
  transition: all 200ms linear;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.lg}) {
    width: 20rem;
  }
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    display: none;
  }
`;

const InputWrapper = styled.div<{ focus: boolean }>`
  background: ${(props) => props.theme.colors.white};
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: ${({ focus }) => (focus ? '0px' : '28px')};
  border-top-left-radius: 28px;
  border-top-right-radius: 28px;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    display: none;
  }
`;
const MSearchIconWrapper = styled.div`
  display: none;
  position: relative;
  height: 53px;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;
const HeaderBtn = styled.button`
  background: none;
  border: none;
  font-size: 14px;
  color: whitesmoke;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 5px;
  @media (max-width: ${({ theme: { breakpoints } }) => breakpoints.md}) {
    top: 0.5rem;
  }
`;

const InputModal = styled.div`
  position: absolute;
  border: none;
  box-shadow: 2px 2px 4px ${({ theme }) => theme.colors.shadow};
  width: calc(100%);
  left: 0;
  top: 51px;
  z-index: 1;
  background-color: white;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  display: flex;
  flex-direction: column;
`;

const HashtagWrapper = styled.div`
  display: flex;
  overflow: auto;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
`;

const HistoryWrapper = styled.div`
  max-height: 20rem;
  overflow-y: scroll;
  padding: 0.5rem 0;
  &::-webkit-scrollbar {
    width: 9px;
  }
  &::-webkit-scrollbar-thumb {
    width: 8px;
    background-color: lightgray;
    border-radius: 5px;
  }
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2rem;
  cursor: pointer;

  transition: background 80ms linear;
  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[100]};
    button {
      display: block;
    }
  }
  .icon {
    width: 1.2rem;
    height: 1.2em;
    border-radius: 100%;
    margin-right: 1rem;
    background: ${({ theme: { colors } }) => colors.blue[200]};
  }
  span {
    flex: 1;
  }
  button {
    display: none;
    cursor: pointer;
    border: none;
    background: none;
    font-size: 0.9rem;
    font-weight: bold;
    color: ${({ theme: { colors } }) => colors.blue[500]};
    transition: color 100ms linear;
    &:hover {
      color: white;
    }
  }
`;
const HistoryControlWrapper = styled.div`
  height: 2.2rem;
  width: 100%;
  background: ${({ theme: { colors } }) => colors.blue[100]};
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.8rem;
  div {
    display: flex;
    gap: 1rem;
  }
  span {
    cursor: pointer;
  }
`;

const Divider = styled.div`
  border-top: 0.15rem solid ${({ theme }) => theme.colors.blue[500]};
  width: calc(100% - 2rem);
  margin: 0 auto;
  height: 0.1rem;
`;
export {
  Container,
  InputWrapper,
  HeaderBtn,
  InputModal,
  HashtagWrapper,
  HistoryWrapper,
  HistoryItem,
  HistoryControlWrapper,
  MSearchIconWrapper,
  Divider,
};
