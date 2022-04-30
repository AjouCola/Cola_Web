import { useEffect, useState } from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import LoginBtn from '@components/atoms/button/login';
import Seo from '@components/Seo';
import { Container, Header, AuthContentWrapper, SocialLogin } from '@styles/signIn';
import Auth from '@utils/api/Auth';

const SignIn = () => {
  const { data, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const onClickGithub = () => {
    alert('singIn github');
  };
  const onClickGoogle = () => {
    if (!data)
      signIn('google', {
        // callbackUrl: `/signUp`,
      });
    else signOut();
  };
  async function checkUser() {
    const responseData = await Auth.isUser(data?.user);
    console.log(responseData);
  }
  useEffect(() => {
    if (data) {
      checkUser();
    }
  }, [data]);

  return (
    <Container>
      <Seo title="SignIn" />
      <Header>로그인</Header>
      <AuthContentWrapper>
        <LoginBtn type="google" onClick={onClickGoogle} />
        <LoginBtn type="github" onClick={onClickGithub} />
      </AuthContentWrapper>
    </Container>
  );
};

export default SignIn;
