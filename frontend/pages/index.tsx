import HomePage from "@/components/Dashboard/HomePage";
import Layout from "@/components/Dashboard/Layout";
import Head from "next/head";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Portfolio Joy</title>
        <meta name="description" content="Portfolio Joy - An interactive website builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
    </Layout>
  )
}
