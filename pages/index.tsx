import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Oireachtas Viewer</title>
        <meta
          name="description"
          content="View information about the Oireachtas"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Oireachtas Data Viewer</h1>

        <div>
          <a href="/legislation">
            <h2>Legislation &rarr;</h2>
            <p>Find in-depth information about proposed legislation</p>
          </a>

          <a href="/members">
            <h2>Members &rarr;</h2>
            <p>Learn about the members of the Dail and the Seanad</p>
          </a>

          <a href="/houses">
            <h2>Houses &rarr;</h2>
            <p>Discover the houses of the Oireachtas</p>
          </a>

          <a href="/parties">
            <h2>Parties &rarr;</h2>
            <p>Information about the political parties of the government</p>
          </a>
        </div>
      </main>
    </div>
  );
};

export default Home;
