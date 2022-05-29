import DoneImg from '../doneImg';

import { Container, DayText } from './styles';

interface Props {
  date: number;
  day: Date;
  status: 'prev' | 'this' | 'today';
  elementData: { color: string; name: string; progress: number }[] | undefined;
}
const CalenderDayElement = ({ status, elementData, day }: Props) => {
  return (
    <Container status={status}>
      <DayText status={status}>{day.getDate()}</DayText>
      <DoneImg data={elementData === undefined ? [] : elementData} />
    </Container>
  );
};

export default CalenderDayElement;
