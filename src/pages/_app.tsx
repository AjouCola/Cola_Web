import '@styles/globals.css';
import { ThemeProvider } from '@emotion/react';
// import { Provider } from 'next-auth/client';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Layout from '@components/Layout';
import { theme } from '@styles/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <SessionProvider session={pageProps.session}>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </SessionProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default MyApp;
