import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import pokemonsReducer from "./reducers/pokemons";

const makeStore = () =>
  configureStore({
    reducer: {
      pokemons: pokemonsReducer,
    },
    devTools: true,
  });

export const storeWrapper = createWrapper(makeStore);
