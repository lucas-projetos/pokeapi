import Link from "next/link";
import styles from "../styles/Card.module.css";
import Image from "next/image";

export default function Card({ pokemon }) {
  return (
    <div className={styles.card}>
      <Image
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
        width="130"
        height="130"
        alt="pokemon`s brand"
      />
      <h2 className={styles.title}>{pokemon.name}</h2>
      <Link href={`/pokemon/${pokemon.id}`}>
        <span className={styles.button}>Descrição</span>
      </Link>
    </div>
  );
}
