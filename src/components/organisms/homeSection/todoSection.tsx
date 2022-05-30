import styled from '@emotion/styled';

import ProgressBar from '../../molecules/todoProgress/index';

import Calender from '@components/molecules/calender';
import { progressDummy } from '@constants/homeDummy';
import { useCalendar } from '@pages/todolist';
import { theme } from '@styles/theme';

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 0px 6px #00000029;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 100%;
  * {
    margin: 0px;
  }
  h2 {
    font-size: 1.6rem;
    margin: 0;
    padding: 0;
  }
  h3 {
    font-size: 1.2rem;
    margin: 0;
    padding: 0;
  }
`;

const ProgressWrapper = styled.div`
  height: 100%;
  box-shadow: 0px 0px 6px #00000029;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 30rem;
`;
const ProgressDateWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  div {
    display: flex;
    flex-direction: column;
  }
  span {
    font-size: 1.5rem;
  }
`;
const ProgressItemWrapper = styled.div`
  background: #c3cdf9;
  width: 100%;
  height: 85%;
  padding: 1.5rem 2rem;
  background: #ffffff 0% 0% no-repeat padding-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProgressItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;
const ProgressText = styled.span`
  min-width: 15%;
  flex-basis: 15%;
  color: #6c7bfa;
  font-size: 1.2rem;
`;

const TodoWrapper = styled.div`
  box-shadow: 0px 0px 6px #00000029;
  background: ${({ theme: { colors } }) => colors.blue[500]};
  display: grid;
  max-height: 65vh;
  grid-template:
    'date content' 1fr
    '. content' 4fr
    'title content' 1fr
    /1fr 2fr;
  @media (max-width: ${theme.breakpoints.md}) {
    padding: 1rem;
    grid-template:
      'date . title' 1fr
      'content content content' 4fr
      /1fr 4fr 1fr;
  }
  @media (max-width: ${theme.breakpoints.sm}) {
    padding: 1rem;
    grid-template:
      'date . title' 1fr
      'content content content' 4fr
      /1fr 4fr 1fr;
  }
`;
const DateTitle = styled.div`
  grid-area: date;
  justify-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem 0px;
  color: white;
  h2 {
    margin: 0;
    font-size: 2.4rem;
  }
  h3 {
    margin: 0;
    font-size: 1.8rem;
  }
`;

const Title = styled.div`
  grid-area: title;
  padding: 2rem 0px;
  white-space: nowrap;
  justify-self: center;
  color: white;
`;
const RightSection = styled.div`
  grid-area: content;
  background: white;
`;

const DAY = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

const TodoSection = () => {
  const [today, date, handleChangeMonth] = useCalendar();

  return (
    <>
      <CalendarWrapper>
        <Calender date={date} handleChangeMonth={handleChangeMonth} />
      </CalendarWrapper>
      <TodoWrapper>
        <DateTitle>
          <h2>{today.getDate()}</h2>
          <h3>{DAY[today.getDay()]}</h3>
        </DateTitle>
        <Title>
          <p>오늘의 할 일</p>
          <span>0 / 8</span>
        </Title>
        <RightSection></RightSection>
      </TodoWrapper>
      <ProgressWrapper>
        <ProgressDateWrapper>
          <div>
            <span>JULY</span>
            <span>WEEK</span>
          </div>
          <div>
            <span>1</span>
          </div>
        </ProgressDateWrapper>
        <ProgressItemWrapper>
          {progressDummy.map((data, index) => (
            <ProgressItem key={index}>
              <ProgressText>{data.day}</ProgressText>
              <ProgressBar color={data.color} percent={data.progress} idx={index + 1}></ProgressBar>
              <ProgressText>{Math.round(data.progress / 10)}/10</ProgressText>
            </ProgressItem>
          ))}
        </ProgressItemWrapper>
      </ProgressWrapper>
    </>
  );
};

export default TodoSection;
