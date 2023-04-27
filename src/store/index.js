import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./reducers/pokemons";

export const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  },
  devTools: true,
});
