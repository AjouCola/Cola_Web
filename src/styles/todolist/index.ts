import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 1440px;
  height: 100%;
  margin: auto 0;
  box-shadow: 0px 0px 6px ${({ theme: { colors } }) => colors.shadow};
  position: relative;
  border-radius: 5px;
  background: white;
  z-index: 3;
`;
const BackgroundView = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  max-width: 1440px;
  max-height: 786px;
  bottom: -0.5rem;
  right: -0.5rem;
  background: none;
  border: none;
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 6px ${({ theme: { colors } }) => colors.shadow};
  z-index: 2;
`;
const BackgroundSecondView = styled(BackgroundView)`
  bottom: -1rem;
  right: -1rem;
  z-index: 1;
`;
const CalendarContainer = styled.div`
  width: 700px;
  height: 100%;
  padding: 5rem 1rem;
  z-index: 3;
  background: white;
  border-radius: 5px 0px 0px 5px;
`;

const TodoContainer = styled.div`
  position: relative;

  border-radius: 0px 5px 5px 0px;
  z-index: 10;
  max-width: 600px;
  height: 100%;
  min-height: 786px;
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
`;
const TodoInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  height: 10rem;
  margin-bottom: 1rem;
  padding: 1rem 0;
  border-bottom: 2px solid white;
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
const TodoUtils = styled(TodoInfo)`
  /* button {
    height: 2rem;
    width: 3rem;
    background: white;
    border: none;
    cursor: pointer;
  } */
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

const MenuBtn = styled.button`
  position: absolute;
  z-index: 999;
  top: 4rem;
  right: 4rem;
`;

export {
  Container,
  BackgroundView,
  BackgroundSecondView,
  CalendarContainer,
  TodoContainer,
  MenuBtn,
  TodoInfoWrapper,
  TodoDate,
  TodoUtils,
  DeleteBtn,
};
