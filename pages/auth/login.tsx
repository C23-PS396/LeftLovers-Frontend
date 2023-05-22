import Login from "@/components/pages/auth/Login";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Login</title>
        <link rel="icon" href="/logo.ico" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="The easiest customizable URL shortener, ever."
        />
        <meta
          name="og:title"
          content="The easiest customizable URL shortener, ever."
        />
      </Head>
      <Login />
    </>
  );
}
