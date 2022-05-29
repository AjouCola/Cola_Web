import styled from '@emotion/styled';
import { number } from 'yup';

const WholeBar = styled.div`
  max-width: 100%;
  height: 14px;
  font-family: monospace;
  display: flex;
  font-size: 0.8rem;
  transform: translate(0, 2px);
  justify-content: space-around;
  flex-flow: row wrap;
  align-items: stretch;
`;

const BarDone = styled.div`
  background: #6c7bfa 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  transition: all 0.2s;
  position: relative;
  border-radius: 5px;
  height: 10px;
`;

const BarProgress = styled.div`
  background: #6c7bfa 0% 0% no-repeat padding-box;
  border-radius: 5px;
  opacity: 1;
  transition: all 0.2s;
  position: relative;
  border-radius: 5px;
  opacity: 0;
`;

const RenderBar = ({ type = '', num = 1 }: { type?: string; num?: number }) => {
  return type === 'done' ? (
    <BarDone style={{ flexGrow: num }}></BarDone>
  ) : (
    <BarProgress style={{ flexGrow: num }}></BarProgress>
  );
};

const ProgressBar = () => {
  return (
    <WholeBar>
      <RenderBar type="done" num={2} />
      <RenderBar type="progress" num={1} />
    </WholeBar>
  );
};

export default ProgressBar;
