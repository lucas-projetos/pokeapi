import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storeWrapper } from "../store";

function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default storeWrapper.withRedux(App);
