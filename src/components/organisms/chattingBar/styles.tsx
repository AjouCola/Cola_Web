import styled from '@emotion/styled';

const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
  overflow: auto;
`;

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 60vh;
  overflow: auto;
`;

const Footer = styled.div`
  display: flex;
  column-gap: 1rem;
  height: 4vh;
  select {
    width: 5vw;
    border-radius: 4px;
  }
  input {
    width: 100%;
    border-radius: 4px;
  }
`;

const OpponentChat = styled.p`
  text-align: start;
`;

const SelfChat = styled.p`
  text-align: end;
`;

export { UserContainer, ChatContainer, Footer, OpponentChat, SelfChat };
