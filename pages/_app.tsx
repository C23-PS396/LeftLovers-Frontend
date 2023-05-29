import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { extendTheme } from "@chakra-ui/react";
import Layout from "@/components/layout/Layout";
import { AuthContextProvider } from "@/components/context/AuthContext";
import { MerchantDataContextProvider } from "@/components/context/MerchantDataContext";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

export const theme = extendTheme({ colors });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <MerchantDataContextProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </MerchantDataContextProvider>
    </AuthContextProvider>
  );
}
