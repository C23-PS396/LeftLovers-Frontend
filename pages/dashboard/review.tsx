import Navbar from "@/components/layout/navbar/Navbar";
import Review from "@/components/pages/review/Review";
import Head from "next/head";

export default function DashboardReview() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Dashboard - ReVIEW</title>
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
      <Navbar type="merchant" />
      <Review />
    </>
  );
}
