import Register from "@/components/pages/auth/Register";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Register</title>
        <link rel="icon" href="icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="description"
          content="Saving Food, Saving Money, Saving The Plane"
        />
        <meta
          name="og:title"
          content="Saving Food, Saving Money, Saving The Plane"
        />
      </Head>
      <Register />
    </>
  );
}
