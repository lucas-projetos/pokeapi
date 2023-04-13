import Card from "@/components/Card";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";

export default function Home() {
  const numberOfPokemons = 1008;
  const [pokemonsList, setPokemonsList] = useState([]);
  const [filteredPokemonList, setFilteredPokemonList] = useState([]);
  const [pokemonsByPage, setPokemonsByPage] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [filter, setFilter] = useState("");

  async function getFilteredList() {
    if (!filter) {
      getPokemonsList();
    }

    const filteredList = pokemonsList.filter((pokemon) => {
      return pokemon.name.substring(0, filter.length) === filter.toLowerCase();
    });

    setFilteredPokemonList(filteredList);
    const numberOfPages = Math.ceil(filteredList.length / 20);

    setPaginationData({
      currentPage: 1,
      numberOfPages: numberOfPages,
    });
    setPokemonsByPage(filteredList.slice(0, 20));
  }

  async function getPokemonsList() {
    const numberOfPages = Math.ceil(numberOfPokemons / 20);
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${numberOfPokemons}
      `
    ).then((res) => res.json().then((json) => json));

    const pokemons = response.results;
    await pokemons.forEach((pokemon, index) => {
      pokemon.id = index + 1;
    });
    setPokemonsList(pokemons);
    setPaginationData({ numberOfPages: numberOfPages, currentPage: 1 });
    setPokemonsByPage(pokemons.slice(0, 20));
  }

  function setCurrentPage(action) {
    const chooseAction = {
      back: () => {
        const initialItem = (paginationData.currentPage - 2) * 20;
        const finalItem = initialItem + 20;
        setPaginationData({
          ...paginationData,
          currentPage: paginationData.currentPage - 1,
        });
        setPokemonsByPage(
          filteredPokemonList.length
            ? filteredPokemonList.slice(initialItem, finalItem)
            : pokemonsList.slice(initialItem, finalItem)
        );
      },
      advance: () => {
        const initialItem = paginationData.currentPage * 20;
        const finalItem = initialItem + 20;
        setPaginationData({
          ...paginationData,
          currentPage: paginationData.currentPage + 1,
        });
        setPokemonsByPage(
          filteredPokemonList.length
            ? filteredPokemonList.slice(initialItem, finalItem)
            : pokemonsList.slice(initialItem, finalItem)
        );
      },
      goToLastPage: () => {
        const initialItem = (paginationData.numberOfPages - 1) * 20;
        const finalItem = initialItem + 20;
        setPaginationData({
          ...paginationData,
          currentPage: paginationData.numberOfPages,
        });
        setPokemonsByPage(
          filteredPokemonList.length
            ? filteredPokemonList.slice(initialItem, finalItem)
            : pokemonsList.slice(initialItem, finalItem)
        );
      },
    };
    chooseAction[action]();
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
          placeholder="Filtre por nome"
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
        {pokemonsByPage?.map((pokemon) => (
          <Card key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {paginationData.numberOfPages > 1 && (
        <div className={styles.pagination}>
          <button
            disabled={paginationData.currentPage === 1}
            onClick={() => setCurrentPage("back")}
            className={styles.paginationButton}
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
              onClick={() => setCurrentPage("goToLastPage")}
            >
              {paginationData.numberOfPages}
            </button>
          </div>
          <button
            disabled={
              paginationData.currentPage === paginationData.numberOfPages
            }
            onClick={() => setCurrentPage("advance")}
            className={styles.paginationButton}
          >
            Próximo &gt;
          </button>
        </div>
      )}
    </div>
  );
}
