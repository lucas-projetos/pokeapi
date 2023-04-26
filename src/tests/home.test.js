import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/index";
import { useDispatch } from "react-redux";
import { setPokemons } from "../store/actions/pokemons";

jest.mock("../store/actions/pokemons");
jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

describe("App Component", function () {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
  });

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

  it("renders the home page with a list of pokemons", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: pokemons }),
      })
    );

    render(<Home />);

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByText("Consultar Pokemons")).toBeInTheDocument;
  });
  it("displays the list of pokemons correctly", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: pokemons }),
      })
    );
    render(<Home />);
    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(7);
    });
  });
  it("sets the pokemons list in the Redux store correctly", async () => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: pokemons }),
      })
    );
    render(<Home />);
    await waitFor(() => {
      expect(setPokemons).toHaveBeenCalledWith(pokemons);
    });
  });
});
