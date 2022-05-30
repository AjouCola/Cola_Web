import { useEffect, useState } from 'react';

import styled from '@emotion/styled';

const BarWrapper = styled.div`
  background-color: #c3cdf9;
  border-radius: 0.5rem;
  width: 100%;
  height: 10px;
`;

const Bar = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}%`};
  transition: width 0.5s linear;
  border-radius: 1rem;
  background-color: #6c7bfa;
  height: 10px;
`;

const ProgressBar = ({ percent }: { percent: number }) => {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    setWidth(percent);
  }, []);

  return (
    <BarWrapper>
      <Bar width={width} />
    </BarWrapper>
  );
};

export default ProgressBar;
