import classes from "./ItemCard.module.scss";
import { useDispatch } from "react-redux";
import { addPokemonInfo } from "../../store/detailsSlice";
const ItemCard = (props) => {
  const pokemonData = props.pokemonData;
  const dispatch = useDispatch();

  const abilitiesArr = [];
  const abilitiesRawData = pokemonData.abilities.forEach((item) =>
    abilitiesArr.push(item.ability.name)
  );
  const imageFront = pokemonData.sprites.front_default;

  const pokemonDetails = {
    image: imageFront,
    name: pokemonData.name,
    typesArr: pokemonData.types,
    statsArr: pokemonData.stats,
  };

  return (
    <div
      className={classes.itemCard}
      onClick={() => dispatch(addPokemonInfo(pokemonDetails))}
    >
      <img className={classes.images} src={imageFront}></img>
      <h3>{pokemonData.name}</h3>
      <ul className={classes.abilitys}>
        {abilitiesArr.map((ability, i) => (
          <li className={classes.abilityColor} key={i}>
            {ability}{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ItemCard;
