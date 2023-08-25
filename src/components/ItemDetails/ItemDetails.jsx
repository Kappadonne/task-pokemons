import { useSelector } from "react-redux/es/hooks/useSelector";
import classes from "./ItemDetails.module.scss";
const ItemDetails = () => {
  const details = useSelector((state) => state.details.pokemonInfo);
  const types = [];
  details.typesArr.forEach((type) => types.push(type.type.name));

  return (
    <div className={classes.container}>
      <img className={classes.image} src={details.image}></img>
      <h3>{details.name}</h3>
      <table className={classes.table}>
        <tbody>
          <tr className={classes.typeContainer}>
            <td className={classes.typeField}>Type</td>
            <td>
              <div className={classes.typeNames}>
                {types.map((type) => (
                  <div key={type}>{type}</div>
                ))}
              </div>
            </td>
          </tr>

          {details.statsArr.map((detail) => (
            <tr key={detail.stat.name} className={classes.statField}>
              <td className={classes.statName}>{detail.stat.name}</td>
              <td className={classes.baseNumber}>{detail.base_stat}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ItemDetails;
