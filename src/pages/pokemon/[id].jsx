import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styles from "../../styles/PokemonById.module.css";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function PokemonDetails() {
  const { query } = useRouter();
  const pokemonId = query.id;
  const [pokemon, setPokemon] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const urlImage = pokemon?.sprites?.front_default;
  const pokemons = useSelector((state) => state.pokemons);

  async function getPokemon() {
    const apiAddress = "https://pokeapi.co/api/v2/pokemon";

    if (pokemonId) {
      const pokemonData = await fetch(`${apiAddress}/${pokemonId}`)
        .then((res) => res.json().then((json) => json))
        .catch((error) =>
          setErrorMessage(
            "Não foi possível encontrar informações específicas sobre esse pokemon em nossa base de dados..."
          )
        );
      if (pokemons && pokemonData) {
        pokemons.forEach((currentPokemon) => {
          if (
            currentPokemon.id === Number(pokemonId) &&
            currentPokemon.name !== pokemonData.name
          ) {
            setErrorMessage(
              "Esse pokemon possui informações incorretas em nossa base de dados. Ao recarregar a página você verá as informações erradas."
            );
          }
        });
      }

      setPokemon(pokemonData);
    }
  }

  useEffect(() => {
    getPokemon();
  }, [pokemonId]);

  return (
    <>
      {pokemon?.species && !errorMessage ? (
        <div className={styles.container}>
          {pokemons.length !== 0 && (
            <Link href="/">
              <span className={styles.link}>
                Ver outros {pokemons.length - 1} pokemons
              </span>
            </Link>
          )}
          {urlImage && (
            <Image
              src={urlImage}
              width="200"
              height="200"
              alt="pokemon`s brand"
              priority
            />
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
      ) : (
        errorMessage && (
          <div className={styles.container}>
            <h1 className={styles.title}>{errorMessage}</h1>
          </div>
        )
      )}
    </>
  );
}
