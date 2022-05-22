import { Container, Title, InfoWrapper, Profile, DateWrapper, ProfileWrapper } from './styles';

import ProfileImg from '@assets/icon/user_default_small.svg';

const BoardItem = () => {
  return (
    <Container>
      <Title>글 제목입니다.</Title>

      <InfoWrapper>
        <ProfileWrapper>
          <Profile>
            <ProfileImg />
          </Profile>
          <p>이름</p>
        </ProfileWrapper>
        <DateWrapper style={{ padding: '0 0.2rem' }}>
          <span>05/14 20:12</span>
        </DateWrapper>
      </InfoWrapper>
    </Container>
  );
};
export default BoardItem;
