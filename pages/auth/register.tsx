import Register from "@/components/pages/auth/Register";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Register</title>
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
      <Register />
    </>
  );
}
