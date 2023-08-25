import { createSlice } from "@reduxjs/toolkit";

const initialSlice = {
  pokemonInfo: {},
  showDetails: false,
};

export const detailsSlice = createSlice({
  name: "details",
  initialState: initialSlice,
  reducers: {
    addPokemonInfo: (state, action) => {
      const data = action.payload;
      state.pokemonInfo = data;
      state.showDetails = true;
    },
  },
});

export const { addPokemonInfo } = detailsSlice.actions;
export default detailsSlice.reducer;
