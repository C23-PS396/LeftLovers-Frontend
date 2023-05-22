import {
  AuthContextState,
  useAuthContext,
} from "@/components/context/AuthContext";
import Navbar from "@/components/layout/navbar/Navbar";
import Head from "next/head";

export default function Dashboard() {
  const { user }: AuthContextState = useAuthContext() as AuthContextState;

  return (
    <>
      <Head>
        <title>LeftLovers Apps | Dashboard</title>
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
      <Navbar type="merchant" />
      <main>Hello Dashboard! this is {user?.username}</main>
    </>
  );
}
