import "src/lib/tailwind.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>折半🐷</title>
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
