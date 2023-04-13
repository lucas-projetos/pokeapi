export default function reducer(state = [], action) {
  if (action?.type === "SET_POKEMONS") {
    return [...action.payload];
  } else {
    return state;
  }
}
