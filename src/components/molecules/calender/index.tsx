import { useMemo } from 'react';

import { DateWrapper, CalenderNav, DayWrapper, MonthText, YearText, DayText, CurrentDayMarker } from './styles';

import LeftArrow from '@assets/icon/left_arrow_primary.svg';
import RightArrow from '@assets/icon/right_arrow_primary.svg';
import CalenderDayElement from '@atoms/calenderDayElement';

interface Props {
  date: Date;
  handleChangeMonth: (condition: number) => void;
}

// const Day = ['월', '화', '수', '목', '금', '토', '일'];
const Day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const getDate = (date: Date) => {
  const start = new Date(date.getFullYear(), date.getMonth(), 0);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  const startDate = start.getDate();
  const startDay = start.getDay();
  const endDate = end.getDate();
  const thisDates = [...Array(endDate + 1).keys()].slice(1);
  const prevDates =
    startDay !== 6
      ? Array(startDay + 1)
          .fill('')
          .map((element, i) => startDate - i)
          .reverse()
      : [];
  return { thisDates, prevDates };
};

const Calender = ({ date, handleChangeMonth }: Props) => {
  const today = new Date();
  const title = date.getFullYear() + '년' + ' ' + (date.getMonth() + 1) + '월';
  const currentMonth = useMemo(() => {
    const month = date.getMonth() + 1;
    switch (month) {
      case 1:
        return 'JANUARY';
      case 2:
        return 'FABURARY';
      case 3:
        return 'MARCH';
      case 4:
        return 'APRIL';
      case 5:
        return 'MAY';
      case 6:
        return 'JUNE';
      case 7:
        return 'JULY';
      case 8:
        return 'AUGUST';
      case 9:
        return 'SEPTEMBER';
      case 10:
        return 'OCTOBER';
      case 11:
        return 'NOVEMBER';
      case 12:
        return 'DECEMBER';
    }
  }, [date]);

  const handleCheckToday = (element: number) =>
    !!(
      today.getFullYear() === date.getFullYear() &&
      today.getMonth() === date.getMonth() &&
      today.getDate() === element
    );
  const { thisDates, prevDates } = getDate(date);
  const handleUp = () => handleChangeMonth(1);
  const handleDown = () => handleChangeMonth(-1);

  const getCurrentDate = (): string => {
    const todayArr = today.toDateString().split(' ');
    const upperCaseDate = todayArr[0].toUpperCase();
    return upperCaseDate;
  };
  return (
    <>
      <CalenderNav>
        <button onClick={handleDown}>
          <LeftArrow />
        </button>

        <DateWrapper>
          <MonthText>{currentMonth}</MonthText>
          <YearText>{date.getFullYear()}</YearText>
        </DateWrapper>

        <button onClick={handleUp}>
          <RightArrow />
        </button>
      </CalenderNav>
      <DayWrapper>
        {Day.map((element) => (
          <DayText key={element}>
            {element}
            <CurrentDayMarker isCurrent={element === getCurrentDate()} />
          </DayText>
        ))}
        {prevDates.map((element, index) => (
          <CalenderDayElement status="prev" key={index} day={element} date={(index + 1) % 7} />
        ))}
        {thisDates.map((element, index) => (
          <CalenderDayElement
            status={handleCheckToday(element) ? 'today' : 'this'}
            key={index}
            day={element}
            date={(index + 1) % 7}
          />
        ))}
      </DayWrapper>
    </>
  );
};
export default Calender;
