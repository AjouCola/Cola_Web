import { ReactChild, ReactChildren } from 'react';

import { Background, Content } from './styles';

import Portal from '@pages/portal';
const Modal = ({
  children,
  onClick,
}: {
  children: ReactChild | ReactChildren;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}) => {
  return (
    <Portal>
      <>
        <Background onClick={onClick}></Background>
        <Content>{children}</Content>
      </>
    </Portal>
  );
};

export default Modal;
