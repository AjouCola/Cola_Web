import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const TodoContainer = styled.div`
  position: relative;
  border-radius: 0px 5px 5px 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  padding: 2rem 4rem;
  overflow: hidden;

  background-color: ${({ theme: { colors } }) => colors.blue[500]};
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background-color: ${({ theme: { colors } }) => colors.blue[100]};
    border-radius: 4px;
  }
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
  }
`;
const TodoInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
  min-height: 6rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 2px solid white;
  span {
    font-size: 2.4rem;
  }
`;

const Title = styled.span`
  font-size: 4rem;
  font-weight: 600;
`;

const TodoUtils = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  span {
    font-size: 1.5rem;
  }
`;
const DeleteBtn = styled.div<{ deleteMode: boolean }>`
  cursor: pointer;
  position: relative;
  width: 3rem;
  height: 2rem;
  box-shadow: inset 0px 0px 6px #00000029;
  border-radius: 3px;
  font-weight: 600;
  text-align: center;
  line-height: 2rem;
  transition: all 200ms linear;
`;
const DeleteBlock = styled.div<{ deleteMode: boolean }>`
  position: absolute;
  display: block;
  top: 0;
  left: ${({ deleteMode }) => (deleteMode ? '-3rem' : '0')};
  width: 3rem;
  height: 2rem;
  border-radius: 3px;
  background: white;
  transition: all 200ms linear;
`;
const TodoWrapper = styled.div`
  overflow-y: scroll;
  height: 35em;
  padding: 0.4rem;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: #eee;
    border-radius: 4px;
  }
`;

const FolderConrtainer = styled.div`
  display: flex;
  flex-direction: column;

  p {
    color: ${theme.colors.white};
    font-weight: 400;
  }
`;

const FolderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  p {
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
    margin: 0px;
    right: 0px;
    font-size: 2rem;
  }
`;

const FolderItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  max-height: 20vh;
  overflow-y: scroll;
  padding: 0px 0.4rem;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-thumb {
    width: 6px;
    background: #eee;
    border-radius: 4px;
  }
`;

const Line = styled.div`
  margin: 1rem 0px;
  width: 100%;
  border: 0.1px solid white;
`;

const TodoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;
const TodoDate = styled(TodoInfo)`
  & span:nth-of-type(1) {
    font-size: 4rem;
    font-weight: 600;
  }
  & span:nth-of-type(2) {
    font-size: 1.5rem;
  }
`;

const Warpper = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
  width: 100%;
  padding: 0px 0.4rem;
  button {
    background: none;
    color: white;
    border: none;
    height: 100%;
    white-space: nowrap;
    cursor: pointer;
    :hover {
      opacity: 50%;
    }
  }
`;
const Input = styled.input`
  border: none;
  height: 100%;
  width: 100%;
`;

export {
  TodoContainer,
  TodoInfoWrapper,
  Title,
  TodoUtils,
  DeleteBtn,
  DeleteBlock,
  TodoWrapper,
  FolderWrapper,
  FolderItemContainer,
  FolderConrtainer,
  TodoDate,
  Warpper,
  Line,
  Input,
};
