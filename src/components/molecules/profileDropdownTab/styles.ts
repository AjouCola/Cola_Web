import styled from '@emotion/styled';

export const TabContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  padding: 0 1rem;
`;
export const TabItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  flex: 1;
  padding-bottom: 0.6rem;
  text-align: center;
  border-bottom: 0.2rem solid ${({ theme: { colors }, selected }) => (selected ? colors.blue[500] : colors.blue[300])};
  span {
    vertical-align: middle;
    color: ${({ theme: { colors }, selected }) => (selected ? colors.blue[500] : colors.blue[300])};
    font-weight: 600;
    font-size: 1.2rem;
  }
`;
