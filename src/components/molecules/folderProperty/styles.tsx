import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const FolderPropertyContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 1rem;
  p {
    color: white;
  }
`;

const ColorContainer = styled.div`
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  row-gap: 1rem;
  background: white;
  padding: 2rem;
  box-sizing: border-box;
`;

const ColorBtn = styled.button<{ color: string; status: boolean }>`
  outline: ${({ status }) => (status ? '1px solid' + theme.colors.blue[500] : 'none')};
  border: none;
  outline-offset: 2px;
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 100vw;
  background: ${({ color }) => color};
  cursor: pointer;
  :hover {
    opacity: 50%;
  }
`;
const Line = styled.div`
  margin: 1rem 0px;
  width: 100%;
  border: 0.1px solid white;
`;
const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: absolute;
  left: 0px;
  bottom: 2rem;
  padding: 0px 2rem;
  button {
    border: none;
    border-radius: 15px;
    padding: 0.4rem 1rem;
    background: white;
    color: ${theme.colors.blue[500]};
  }
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background: none;
    color: white;
  }
`;

export { FolderPropertyContainer, ButtonWrapper, ColorContainer, ColorBtn, Line, Wrapper };
