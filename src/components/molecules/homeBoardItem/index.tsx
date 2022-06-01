import { Container, Title, InfoWrapper, Profile, DateWrapper, ProfileWrapper } from './styles';

import ProfileImg from '@assets/icon/user_default_small.svg';

const BoardItem = ({
  title,
  userName,
  date,
  profileThumbnail,
}: {
  title: string;
  userName: string;
  date: string;
  profileThumbnail?: string;
}) => {
  return (
    <Container>
      <Title>{title}</Title>

      <InfoWrapper>
        <ProfileWrapper>
          <Profile>
            <ProfileImg />
          </Profile>
          <p>{userName}</p>
        </ProfileWrapper>
        <DateWrapper style={{ padding: '0 0.2rem' }}>
          <span>{date}</span>
        </DateWrapper>
      </InfoWrapper>
    </Container>
  );
};
export default BoardItem;
