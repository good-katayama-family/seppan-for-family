import "src/lib/tailwind.css";
import Head from "next/head";
import type { AppProps } from "next/app";
import { AppShell, Header, MantineProvider, Navbar } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { HeaderComp } from "src/component/global/HeaderComp";
//navbar
import { NavbarNested } from "@component/global/Navbar1.tsx/Navbar";
import { NavbarMinimal } from "@component/global/Navbar2.tsx/Navbar";
import { Sidebar } from "@component/global/Navbar3.tsx/Sidebar";


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>折半🐷</title>
      </Head>

      <AppShell
        padding="md"
        navbar={
          < Sidebar />
        }
        header={
          <Header height={68} p="xs">
            <HeaderComp />
          </Header>}
        styles={(theme) => ({
          main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
        })}
      >

        <MantineProvider withGlobalStyles withNormalizeCSS>
          <NotificationsProvider position="top-center" zIndex={2077}>
            <Component {...pageProps} />
          </NotificationsProvider>
        </MantineProvider>
      </AppShell>
    </>
  );
}

export default MyApp;
