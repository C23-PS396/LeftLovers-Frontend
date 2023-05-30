import Navbar from "@/components/layout/navbar/Navbar";
import Review from "@/components/pages/review/Review";
import Head from "next/head";

export default function DashboardReview() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Dashboard - ReVIEW</title>
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
      <Review />
    </>
  );
}
