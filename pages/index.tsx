import type { NextPage } from "next";
import Head from "next/head";
import { TierNFT } from "../components/tiernft";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <TierNFT />
      </main>
    </div>
  );
};

export default Home;
