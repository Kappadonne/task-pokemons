import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTypesInfo } from "../../store/TypesSlice";
import classes from "./TypeChoice.module.scss";

const TypeChoice = (props) => {
  const [chosenTypes, setChosenTypes] = useState([]);
  const dispatch = useDispatch();

  const handleRadioChange = (event) => {
    const radioValue = event.target.value;
    if (chosenTypes.includes(radioValue)) {
      setChosenTypes(chosenTypes.filter((type) => type !== radioValue));
    } else {
      setChosenTypes([...chosenTypes, radioValue]);
    }
  };

  useEffect(() => {
    dispatch(addTypesInfo(chosenTypes));
  }, [chosenTypes]);

  return (
    <div>
      <ul className={classes.container}>
        {props.types.map((type) => (
          <li key={type} className={classes.listElement}>
            <input
              type="radio"
              id={type}
              name="type"
              value={type}
              onChange={handleRadioChange}
              checked={chosenTypes.includes(type)} //
            />
            <label htmlFor={type}>{type}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TypeChoice;
