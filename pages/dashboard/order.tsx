import Navbar from "@/components/layout/navbar/Navbar";
import Order from "@/components/pages/order/Order";
import Head from "next/head";

export default function DashboardOrder() {
  return (
    <>
      <Head>
        <title>LeftLovers Apps | Dashboard - Order</title>
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
      <Order />
    </>
  );
}
