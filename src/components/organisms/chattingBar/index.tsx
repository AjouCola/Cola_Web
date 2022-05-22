import { UserContainer, ChatContainer, Footer, OpponentChat, SelfChat } from './styles';

import Input from '@components/atoms/input';
import socket from '@store/gatherSocket';
import useChat from '@utils/libs/useChat';
import { IUser, IUsers } from '~/types/gather';

interface Props {
  user: IUser;
  users: IUsers;
}

const ChattingBar = ({ user, users }: Props) => {
  const [chatInput, setChatInput, onChangeChatInput, onKeyPressEnter, chatList, setChatList, selectRef] = useChat(
    socket,
    user as IUser,
  );
  return (
    <>
      <h3>유저 목록</h3>
      <UserContainer>
        {Object.entries(users).map(([keys, roomUser]) => (
          <span style={{ padding: '1rem', color: keys === socket.id ? 'green' : 'black' }} key={keys}>
            {roomUser.name}
          </span>
        ))}
      </UserContainer>
      <h3>채팅</h3>
      <ChatContainer>
        <div>
          {chatList.map((chat) =>
            chat.id === socket.id ? (
              <SelfChat key={chat.id}>
                {chat.text} - by {chat.name}
              </SelfChat>
            ) : (
              <OpponentChat key={chat.id}>
                {chat.text} - by {chat.name}
              </OpponentChat>
            ),
          )}
        </div>
      </ChatContainer>
      <Footer>
        <select ref={(el) => (selectRef.current = el as HTMLSelectElement)}>
          <option value="Everyone">Everyone</option>
          <option value="Nearby">Nearby</option>
          {Object.entries(users).map(
            ([keys, roomUser]) => keys !== socket.id && <option value={keys}>{roomUser.name}</option>,
          )}
        </select>
        <Input type="text" value={chatInput} onKeyPress={onKeyPressEnter} onChange={onChangeChatInput} />
      </Footer>
    </>
  );
};
export default ChattingBar;
