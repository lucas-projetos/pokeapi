import Footer from "./Footer";
import Navbar from "./Header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <title>Pokeapi</title>
      </Head>
      <Navbar />
      <main className="main">{children}</main>
      <Footer />
    </>
  );
}
