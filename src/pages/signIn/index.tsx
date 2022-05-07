import Link from 'next/link';
import LoginBtn from '@components/atoms/button/login';
import Seo from '@components/Seo';
import { Container, Header, AuthContentWrapper } from '@styles/signIn';
import { GOOGLE_OAUTH_URL, GITHUB_OAUTH_URL } from '@constants/index';

const SignIn = () => {
  return (
    <Container>
      <Seo title="SignIn" />
      <Header>로그인</Header>
      <AuthContentWrapper>
        <Link href={GOOGLE_OAUTH_URL}>
          <LoginBtn type="google" />
        </Link>
        <Link href={GITHUB_OAUTH_URL}>
          <LoginBtn type="github" />
        </Link>
      </AuthContentWrapper>
    </Container>
  );
};

export default SignIn;
