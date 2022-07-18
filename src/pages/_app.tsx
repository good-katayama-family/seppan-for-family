import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import { AppShell, Header, MantineProvider, Navbar } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import Link from "next/link";
import { Home, Login, ReportMoney, Table, WritingSign } from "tabler-icons-react";

type LinkType = {
  url: string,
  name: string,
  icon: JSX.Element
}
const LINK: LinkType[] = [
  { url: "/", name: "家計簿", icon: <Home color={'#7950f2'} /> },
  { url: "/subscription", name: "サブスク管理", icon: <Table color={'#7950f2'} /> },
  // { url: "/subscriptionAdd", name: "サブスク登録" , icon: <ReportMoney/>},
  { url: "/signin", name: "サインイン", icon: <Login color={'#7950f2'} /> },
  { url: "/signup", name: "サインアップ", icon: <WritingSign color={'#7950f2'} /> },
]

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>折半🐷</title>
      </Head>

      <AppShell
        padding="md"
        navbar={<Navbar width={{ base: 200 }} height={500} p="xs">
          <div className="text-left">
            {LINK.map((link) => {
              return (
                <Link href={link.url} key={link.url}>
                  <div className="my-1 flex cursor-pointer  rounded-lg py-2 pl-2  text-lg text-inherit hover:bg-[#edecec]">
                    <span className="mt-[2px] pr-2">{link.icon}</span>
                    <a className="no-underline">
                      {link.name}
                    </a>
                  </div>
                </Link>
              )
            })}
          </div>

        </Navbar>}
        header={<Header height={68} p="xs">
          <div className="flex justify-start">
            <span className="text-center font-bold text-[28px] mt-[0px]">Money Half</span>
            <ReportMoney
              size={36}
              strokeWidth={2}
              color={'#7950f2'}
              className="mt-[2px]"
            />
          </div>
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
        {/* Your application here */}

      </AppShell>


    </>
  );
}

export default MyApp;
