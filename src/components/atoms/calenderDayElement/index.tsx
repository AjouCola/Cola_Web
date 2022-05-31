import { Dispatch, SetStateAction } from 'react';

import DoneImg from '../doneImg';

import { Container, DayText } from './styles';

interface Props {
  date: number;
  day: Date;
  status: 'prev' | 'this' | 'today';
  elementData: { color: string; name: string; progress: number }[] | undefined;
  setDate: Dispatch<SetStateAction<Date>>;
}
const CalenderDayElement = ({ status, elementData, day, setDate }: Props) => {
  return (
    <Container
      status={status}
      onClick={() => {
        console.log(status, elementData, day, day.getDay(), day.getDate());
        setDate(day);
      }}
    >
      <DayText status={status}>{day.getDate()}</DayText>
      <DoneImg data={elementData === undefined ? [] : elementData} />
    </Container>
  );
};

export default CalenderDayElement;
