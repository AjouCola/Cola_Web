import { useState, useEffect, Dispatch, SetStateAction, useRef, MutableRefObject } from 'react';

import { Socket } from 'socket.io-client';

import useInput, { UseInputProps } from './useInput';

import { IUser, IChat } from '~/types/gather';

type UseChatProps = [
  ...UseInputProps,
  (e: React.KeyboardEvent<HTMLInputElement>) => void,
  IChat[],
  Dispatch<SetStateAction<IChat[]>>,
  MutableRefObject<HTMLSelectElement | undefined>,
];
export default function useChat(socket: Socket, user: IUser): UseChatProps {
  const selectRef = useRef<HTMLSelectElement>();
  const [chatInput, setChatInput, onChangeChatInput] = useInput('');
  const [chatList, setChatList] = useState<IChat[]>([]);

  useEffect(() => {
    socket.on('RECEIVE_MESSAGE', (chat: IChat) => {
      setChatList((prev) => [...prev, chat]);
    });
  }, []);

  const onKeyPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      const newChat: IChat = {
        status: selectRef.current?.value as string,
        text: chatInput,
        name: user.name,
        cId: user.cId,
        date: Date.now(),
        id: socket.id,
      };
      socket.emit('SEND_MESSAGE', newChat);
      setChatList((prev) => [...prev, newChat]);
      setChatInput('');
    }
  };

  return [chatInput, setChatInput, onChangeChatInput, onKeyPressEnter, chatList, setChatList, selectRef];
}
