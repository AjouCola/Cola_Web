import { useRef, useEffect } from 'react';

import { BackgroundDiv, BackgroundImg } from './styles';

import { IMargin } from '~/types/gather';

interface Props {
  marginBackground: IMargin;
}

const Background = ({ marginBackground }: Props) => {
  const canvasBackgroundRef = useRef<HTMLCanvasElement>(null);
  const background = new Image();

  useEffect(() => {
    const context = (canvasBackgroundRef.current as HTMLCanvasElement)?.getContext('2d');
    background.src = '/testMap.png';
    background.onload = () => {
      context?.drawImage(
        background,
        -marginBackground.left / 2,
        -marginBackground.top / 2,
        window.innerWidth,
        window.innerHeight,
        0,
        0,
        window.innerWidth * 2,
        window.innerHeight * 2,
      );
    };
  });

  useEffect(() => {
    const context = (canvasBackgroundRef.current as HTMLCanvasElement)?.getContext('2d');
    context !== null && context.clearRect(0, 0, window.screen.width, window.screen.height);
    context?.drawImage(
      background,
      -marginBackground.left / 2,
      -marginBackground.top / 2,
      window.innerWidth,
      window.innerHeight,
      0,
      0,
      window.innerWidth * 2,
      window.innerHeight * 2,
    );
  }, [marginBackground]);

  return (
    <BackgroundDiv>
      <BackgroundImg width={window.innerWidth} height={window.innerHeight} ref={canvasBackgroundRef} />
    </BackgroundDiv>
  );
};

export default Background;
