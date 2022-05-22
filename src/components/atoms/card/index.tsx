import { Container, CardWrapper, TextWrapper, UserProfile, IconWrapper } from './styles';

import Logo from 'public/logo.svg';
import Setting from 'public/setting.svg';
interface Props {
  name: string;
  department: string;
  ajouEmail: string;
  githubEmail: string;
  handleModalOnOff: () => void;
}

const Card = ({ name, department, ajouEmail, githubEmail, handleModalOnOff }: Props) => {
  return (
    <Container>
      <CardWrapper>
        <UserProfile />
        <TextWrapper>
          <h2>{name}</h2>
          <p>{department}</p>
          <div />
          <label>아주대학교 이메일</label>
          <p>{ajouEmail}</p>
          <label>Github</label>
          <p>{githubEmail}</p>
        </TextWrapper>
      </CardWrapper>
      <IconWrapper>
        <Setting onClick={handleModalOnOff} />
        <Logo />
      </IconWrapper>
    </Container>
  );
};

export default Card;
