import {createSlice} from '@reduxjs/toolkit';

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    names: [],
  },
  reducers: {
    starItem: (state, action) => {
      state.names.push(action.payload);
    },
    removeItem: (state, action) => {
      state.names.splice(state.names.indexOf(action.payload.name), 1);
    },
  },
});

export const starItem = favouritesSlice.actions.starItem;
export const removeItem = favouritesSlice.actions.removeItem;
export default favouritesSlice.reducer;
