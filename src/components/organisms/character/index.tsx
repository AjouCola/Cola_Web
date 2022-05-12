import { IUser, IMargin } from '~/types/gather';
import { Container, CharacterImage, CharacterDiv } from './styles';
import motion from '@utils/libs/characterMotion';
import characterList from '@utils/libs/characterList';

interface Props {
  user: IUser;
  margin: IMargin | undefined;
}

const Character = ({ user, margin = { top: 0, left: 0 } }: Props) => {
  const changeMotion = (direction: keyof typeof motion.direction, state: keyof typeof motion.run) =>
    -(motion.dance[state as keyof typeof motion.dance] ?? motion.direction[direction] + motion.run[state]);

  return (
    <Container>
      <CharacterDiv
        style={{
          top: user.y + margin?.top,
          left: user.x + margin?.left,
        }}
      >
        <CharacterImage
          src={characterList[user.cId]}
          style={{
            marginLeft: changeMotion(user.direction, user.state),
          }}
        />
      </CharacterDiv>
    </Container>
  );
};

export default Character;
