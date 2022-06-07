import Link from 'next/link';

import LoginBtn from '@components/atoms/button/login';
import Seo from '@components/Seo';
import { GOOGLE_OAUTH_URL, GITHUB_OAUTH_URL } from '@constants/index';
import { Container, Header, AuthContentWrapper } from '@styles/signIn';

const SignIn = () => {
  return (
    <Container>
      <Seo title="로그인" />
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
