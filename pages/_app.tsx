import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Head>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
