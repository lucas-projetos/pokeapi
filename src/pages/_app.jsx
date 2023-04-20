import "@/styles/globals.css";
import Layout from "@/components/Layout";
import { storeWrapper } from "../store";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  const { store } = storeWrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
