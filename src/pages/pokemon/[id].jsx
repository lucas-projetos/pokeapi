import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/PokemonById.module.css";

export default function PokemonDetails() {
  const { query } = useRouter();
  const pokemonId = query.id;
  const [pokemon, setPokemon] = useState({});
  const urlImage = pokemon.sprites?.front_default;

  async function getPokemon() {
    const apiAddress = "https://pokeapi.co/api/v2/pokemon";

    if (pokemonId) {
      const pokemonData = await fetch(`${apiAddress}/${pokemonId}`).then(
        (res) => res.json().then((json) => json)
      );
      setPokemon(pokemonData);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [pokemonId]);

  return (
    <div className={styles.container}>
      {urlImage && (
        <Image src={urlImage} width="200" height="200" alt="pokemon`s brand" />
      )}
      <h1 className={styles.title}>{pokemon.species?.name}</h1>
      <section className={styles.details}>
        <h2>Habilidade(s):</h2>
        <ul>
          {pokemon.abilities?.map((ability, index) => (
            <li key={index} className={styles.dataItem}>
              {ability["ability"].name}
            </li>
          ))}
        </ul>
        <h2>Tipo(s):</h2>
        <ul>
          {pokemon.types?.map((type, index) => (
            <li key={index} className={styles.dataItem}>
              {type["type"].name}
            </li>
          ))}
        </ul>
        <h2>Estatística(s):</h2>
        <ul className={styles.statisticsContainer}>
          {pokemon.stats?.map((stat, index) => (
            <li key={index}>
              <h3>
                {++index}-&nbsp; {stat["stat"].name}
              </h3>
              <ul className={styles.statisticData}>
                <li>
                  <span>Estatística básica:</span>
                  {stat.base_stat}
                </li>
                <li>
                  <span>Esforço:</span>
                  {stat.effort}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
