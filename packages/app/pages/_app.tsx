import '@/assets/css/global.css';
import theme from '@/services/SystemTheme';
import { ErrorBoundary } from '@/stories/atom/ErrorBoundary';
import { Header } from '@/stories/atom/Header';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { SessionProvider } from 'next-auth/react';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <ErrorBoundary>
            <Header title='Sample' />
            <Component {...pageProps} />
          </ErrorBoundary>
        </ThemeProvider>
      </SessionProvider>
    </>
  );
}
