import Link from "next/link";
import styles from "../styles/Header.module.css";
import Image from "next/image";
export default function Navbar() {
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <Link href="/">
          <Image
            src="/images/pokeball.png"
            width="60"
            height="51"
            alt="pokemon`s brand"
          />
        </Link>
        <Link href="/">
          <span className={styles.link}>Lista</span>
        </Link>
      </nav>
    </header>
  );
}
