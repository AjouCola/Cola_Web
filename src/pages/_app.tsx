import '@styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';

import Layout from '@components/Layout';
import { theme } from '@styles/theme';
import { getCookies } from '@utils/cookie';

function MyApp({ Component, pageProps }: AppProps) {
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
