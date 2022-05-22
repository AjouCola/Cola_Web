import styled from '@emotion/styled';

import { theme } from '@styles/theme';

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
`;
const CalenderNav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 1.6rem;
  button {
    border: none;
    background: transparent;
    cursor: pointer;
    margin-top: 1rem;
  }
`;

const DateWrapper = styled(FlexColumn)`
  text-align: center;
`;
const MonthText = styled.h2`
  font-size: 2.4rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.blue[500]};
  margin: 0;
`;
const YearText = styled.h3`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.blue[100]};
  margin: 0;
`;

const DayWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  text-align: center;
`;
const DayText = styled.span`
  justify-self: center;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme: { colors } }) => colors.gray[900]};
  position: relative;
  @media (max-width: ${theme.breakpoints.sm}) {
    font-size: 0.4rem;
  }
`;

interface ICurrentDay {
  isCurrent: boolean;
}
const CurrentDayMarker = styled.div<ICurrentDay>`
  display: ${({ isCurrent }) => (isCurrent ? 'block' : 'none')};
  margin-top: 0.2rem;
  height: 0.3rem;
  border-radius: 0.2rem;
  background-color: ${({ theme: { colors } }) => colors.blue[500]};
`;
export { DateWrapper, CalenderNav, DayWrapper, MonthText, YearText, DayText, CurrentDayMarker };
