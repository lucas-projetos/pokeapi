import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { makeStore } from "../store";
import { Provider } from "react-redux";

describe("App Component", function () {
  it("renders the home page with a list of pokemons", async () => {
    const pokemons = [
      { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/", id: 1 },
      { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/", id: 2 },
      { name: "venusaur", url: "https://pokeapi.co/api/v2/pokemon/3/", id: 3 },
      {
        name: "charmander",
        url: "https://pokeapi.co/api/v2/pokemon/4/",
        id: 4,
      },
      {
        name: "charmeleon",
        url: "https://pokeapi.co/api/v2/pokemon/5/",
        id: 5,
      },
      { name: "charizard", url: "https://pokeapi.co/api/v2/pokemon/6/", id: 6 },
      { name: "squirtle", url: "https://pokeapi.co/api/v2/pokemon/7/", id: 7 },
    ];

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: pokemons }),
      })
    );

    const { getByText, getByPlaceholderText, getByTestId } = render(
      <Provider store={makeStore()}>
        <Home />
      </Provider>
    );

    // Wait for the API call to resolve and update the state
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByText("Consultar Pokemons")).toBeInTheDocument;
  });
});
