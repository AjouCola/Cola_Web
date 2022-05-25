import '@styles/globals.css';

import { ThemeProvider } from '@emotion/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

import Layout from '@components/Layout';
import { theme } from '@styles/theme';

const queryClient = new QueryClient();
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <Layout>
            <Component {...pageProps}></Component>
          </Layout>
        </RecoilRoot>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
