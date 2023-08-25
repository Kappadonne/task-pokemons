import { useEffect, useState, useCallback } from "react";
import "./App.css";
import ItemCard from "./components/ItemCard/ItemCard";
import ItemDetails from "./components/ItemDetails/ItemDetails";
import { useSelector } from "react-redux";
import TypeChoice from "./components/TypeChoice/TypeChoice";

function App() {
  const [pokemonsAmount, setPokemonsAmount] = useState(12);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [isDisabledButton, setDisableButton] = useState(false);
  const [typeNames, setTypeNames] = useState([]);

  const showDetails = useSelector((state) => state.details.showDetails);
  const choosenTypes = useSelector((state) => state.types.choosenTypes);

  const loadPokemonsUrls = useCallback(
    (amount) => {
      if (choosenTypes.length <= 0) {
        setDisableButton(true);
        fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${amount}`)
          .then((response) => response.json())
          .then((data) => {
            const urls = data.results.map((item) => {
              return item.url;
            });

            Promise.allSettled(
              urls.map((url) => fetch(url).then((response) => response.json()))
            )
              .then((pokemonDataArray) => {
                setPokemonsData([...pokemonDataArray]);
              })
              .finally(() => {
                setDisableButton(false);
              });
          });
      } else if (choosenTypes.length >= 1) {
        choosenTypes.map((typeName) =>
          fetch(`https://pokeapi.co/api/v2/type/${typeName}`).then((res) =>
            res.json().then((data) => {
              const urls = data.pokemon.map((object) => object.pokemon.url);
              Promise.allSettled(
                urls.map((url) =>
                  fetch(url).then((response) =>
                    response.json().then((data) => data)
                  )
                )
              ).then((data) => setPokemonsData(data));
            })
          )
        );
      }
    },
    [choosenTypes]
  );

  const loadPokemonTypes = () => {
    fetch(`https://pokeapi.co/api/v2/type`)
      .then((response) => response.json())
      .then((types) => {
        const typesArr = types.results;
        const typeNames = typesArr.map((type) => type.name);
        setTypeNames(typeNames);
      });
  };

  useEffect(() => {
    loadPokemonTypes();
  }, []);

  useEffect(() => {
    loadPokemonsUrls(pokemonsAmount);
  }, [pokemonsAmount, loadPokemonsUrls]);

  const pokemonAmountHandler = () => {
    setPokemonsAmount((prevValue) => prevValue + 6);
  };

  return (
    <div className="wrapper">
      <header className="header">
        <div className="container">
          <h2 className="title">
            <span className="titleName">Pokedex</span>
          </h2>
        </div>
      </header>
      <main className="main">
        <div className="pokemonTest">
          <ul className="pokemonContainer">
            {pokemonsData.map((pokemon) => {
              return (
                <li key={pokemon.value.id}>
                  <ItemCard
                    key={pokemon.value.id}
                    pokemonData={pokemon.value}
                  ></ItemCard>
                </li>
              );
            })}
          </ul>
          <button
            className="button"
            disabled={isDisabledButton}
            onClick={pokemonAmountHandler}
          >
            Load more
          </button>
        </div>
        <TypeChoice types={typeNames}></TypeChoice>
        {showDetails && <ItemDetails></ItemDetails>}
      </main>
    </div>
  );
}

export default App;
