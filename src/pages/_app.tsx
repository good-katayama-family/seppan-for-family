import "src/lib/tailwind.css";
import type { AppProps } from "next/app";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import Head from "next/head";
import Link from "next/link";

const LINK = [
  { url: "/", name: "ホーム" },
  { url: "/subscription", name: "サブスク管理" },
  // { url: "/subscriptionAdd", name: "サブスク登録" },
  { url: "/signin", name: "サインイン" },
  { url: "/signup", name: "サインアップ" },
]

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>折半🐷</title>
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider position="top-center" zIndex={2077}>
          <div className="text-left">
            {LINK.map((link) => {
              return (
                <div key={link.url}>
                  <Link href={link.url}>
                    <a>
                      {link.name} /
                    </a>
                  </Link>
                </div>

              )
            })}
          </div>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </>
  );
}

export default MyApp;
