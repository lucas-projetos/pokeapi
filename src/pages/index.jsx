import Card from "@/components/Card";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const [pokemonsList, setPokemonsList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [filter, setFilter] = useState("");

  async function getFilteredList() {
    if (!filter) {
      return;
    }
    const initalPage = 1;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${paginationData.count}
      `
    ).then((res) => res.json().then((json) => json));
    const pokemons = response.results;

    if (paginationData.currentPage) {
      pokemons.forEach((pokemon, index) => {
        const factor = 20 * (initalPage - 1);
        return (pokemon.id = index + 1 + factor);
      });
    } else {
      pokemons.forEach((pokemon, index) => {
        pokemon.id = index + 1;
      });
    }

    const filteredList = pokemons.filter((pokemon) => {
      return pokemon.name.substring(0, filter.length) === filter.toLowerCase();
    });

    setPaginationData({
      numberOfPages: Math.ceil(filteredList.length / 20),
      currentPage: initalPage,
      count: response.count,
    });
    setPokemonsList(filteredList);
  }

  async function getPokemonsList(action, page) {
    const currentPage = setCurrentPage(action, page);
    const apiAddress = `https://pokeapi.co/api/v2/pokemon/?limit=20&offset=${
      20 * (currentPage - 1)
    }`;

    const response = await fetch(apiAddress).then((res) =>
      res.json().then((json) => json)
    );

    const pokemons = response.results;
    setPaginationData({
      numberOfPages: Math.ceil(response.count / 20),
      currentPage: currentPage,
      count: response.count,
    });

    if (paginationData.currentPage && action) {
      pokemons.forEach((pokemon, index) => {
        const factor = 20 * (currentPage - 1);
        return (pokemon.id = index + 1 + factor);
      });
    } else {
      pokemons.forEach((pokemon, index) => {
        pokemon.id = index + 1;
      });
    }

    setPokemonsList(pokemons);
  }

  function setCurrentPage(action, page) {
    if (page) {
      return page;
    }

    const initalPage = 1;

    switch (action) {
      case "back":
        return paginationData.currentPage - 1;
      case "advance":
        return paginationData.currentPage + 1;
      default:
        return initalPage;
    }
  }

  useEffect(() => {
    getPokemonsList();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Consultar Pokemons</h1>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Filtre os pokemons por nome ou tipo..."
          className={styles.input}
          value={filter}
          onChange={(event) => {
            setFilter(event.target.value);
          }}
        />
        <input
          type="button"
          className={styles.button}
          value="Filtrar"
          onClick={() => getFilteredList()}
        />
      </form>
      <div className={styles.cardContainer}>
        {pokemonsList?.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      <div className={styles.pagination}>
        <button
          disabled={paginationData.currentPage === 1}
          onClick={() => getPokemonsList("back")}
        >
          &lt; Anterior
        </button>
        <div className={styles.paginationPanel}>
          <span className={styles.currentPage}>
            {paginationData.currentPage}
          </span>
          &nbsp; de &nbsp;
          <button
            disabled={
              paginationData.currentPage === paginationData.numberOfPages
            }
            onClick={() =>
              getPokemonsList("goToLastPage", paginationData.numberOfPages)
            }
          >
            {paginationData?.numberOfPages}
          </button>
        </div>
        <button
          disabled={paginationData.currentPage === paginationData.numberOfPages}
          onClick={() => getPokemonsList("advance")}
        >
          Próximo &gt;
        </button>
      </div>
    </div>
  );
}
