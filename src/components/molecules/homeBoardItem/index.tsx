import { useRouter } from 'next/router';

import { Container, Title, InfoWrapper, Profile, DateWrapper, ProfileWrapper } from './styles';

import ProfileImg from '@assets/icon/user_default_small.svg';

const BoardItem = ({
  id,
  title,
  userName,
  date,
  profileThumbnail,
}: {
  id: number;
  title: string;
  userName: string;
  date: string;
  profileThumbnail?: string;
}) => {
  const router = useRouter();
  return (
    <Container onClick={() => router.push(`/board/${id}`)}>
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
