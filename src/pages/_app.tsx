import '@styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Layout from '@components/Layout';
import { theme } from '@styles/theme';
import { getCookies } from '@utils/cookie';
import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '@store/user';
import User from '@utils/api/User';
function MyApp({ Component, pageProps }: AppProps) {
  useCallback(async () => {
    const session = getCookies('SESSION');
    const [user, setUser] = useRecoilState(userState);
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
