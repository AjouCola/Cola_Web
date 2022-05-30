import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

const BarWrapper = styled.div`
  background-color: #c3cdf9;
  border-radius: 0.5rem;
  width: 100%;
  height: 10px;
`;

const Bar = styled.div<{ width: number; color: string; delay?: number }>`
  width: ${({ width }) => `${width}%`};
  border-radius: 1rem;
  background-color: ${({ color }) => color};
  height: 10px;
  transition: width 1s cubic-bezier(0, 0.37, 0, 0.76);
  transition-delay: ${({ delay }) => (delay ? delay * 0.25 : 0)}s;
`;

const ProgressBar = ({ percent, color, idx }: { percent: number; color: string; idx?: number }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(percent);
  }, []);

  return (
    <BarWrapper>
      <Bar width={width} color={color} delay={idx} />
    </BarWrapper>
  );
};

export default ProgressBar;
