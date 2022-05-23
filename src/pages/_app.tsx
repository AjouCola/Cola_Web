import '@styles/globals.css';
import { useCallback, useEffect } from 'react';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { RecoilRoot, useRecoilState } from 'recoil';

import Layout from '@components/Layout';
import { userState } from '@store/user';
import { theme } from '@styles/theme';
import User from '@utils/api/User';
import { getCookies } from '@utils/cookie';

function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useRecoilState(userState);
  useCallback(async () => {
    const session = getCookies('SESSION');

    console.log(session);
    if (session && user?.id === undefined) {
      const data = (await User.getUserInfo()) as unknown as any;
      setUser(data);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
