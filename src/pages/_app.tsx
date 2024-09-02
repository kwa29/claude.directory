import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { TagProvider } from "../components/TagContext";
import { SearchProvider } from "../components/SearchContext";
import { SortProvider } from "../components/SortContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TagProvider>
      <SearchProvider>
        <SortProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SortProvider>
      </SearchProvider>
    </TagProvider>
  );
}