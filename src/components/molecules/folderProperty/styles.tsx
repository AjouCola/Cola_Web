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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  button {
    border: none;
    background: none;
    color: white;
  }
`;

export { FolderPropertyContainer, ColorContainer, ColorBtn, Line, Wrapper };
