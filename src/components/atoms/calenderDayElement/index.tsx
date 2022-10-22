import DoneImg from '../doneImg';

import { Container, DayText } from './styles';

interface Props {
  day: Date;
  status: 'prev' | 'this' | 'today';
  elementData: { color: string; name: string; progress: number }[] | undefined;
  setDay: () => void;
}
const CalenderDayElement = ({ status, elementData, day, setDay }: Props) => {
  return (
    <Container status={status} onClick={setDay}>
      <DayText status={status}>{day.getDate()}</DayText>
      <DoneImg data={elementData ?? []} />
    </Container>
  );
};

export default CalenderDayElement;
