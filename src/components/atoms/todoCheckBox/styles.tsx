import styled from '@emotion/styled';

const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 1rem;
  align-items: center;
`;
const CheckBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  padding: 0.8rem 1rem;
  border: 1px solid lightgray;
  border-radius: 0.8rem;
  cursor: pointer;
`;

const CheckBox = styled.div<{ typeColor: string }>`
  width: 1rem;
  height: 1rem;
  border-radius: 0.6vmin;
  border: 1px solid;
  background-color: ${({ typeColor }) => typeColor};
`;

const MenuWrapper = styled(FlexRow)`
  font-weight: 700;

  position: relative;
  height: 1.5rem;
  width: 1.5rem;
  border-radius: 100%;
  transition: all 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    position: absolute;
    top: -0.3rem;
    left: 0.3rem;
    line-height: 1.5rem;
  }
  &:hover {
    background: ${({ theme: { colors } }) => colors.blue[400]};
  }
`;

const DeleteCheckBox = styled.div<{ checked: boolean }>`
  width: 1rem;
  height: 1rem;
  border: 0.1rem solid white;
  border-radius: 100%;
  background: ${({ checked, theme: { colors } }) => (checked ? colors.blue[500] : 'white')};
`;
export { FlexRow, CheckBoxWrapper, CheckBox, MenuWrapper, DeleteCheckBox };
