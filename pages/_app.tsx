import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import SiteLayout from "../features/SiteLayout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </div>
  );
}

export default MyApp;
