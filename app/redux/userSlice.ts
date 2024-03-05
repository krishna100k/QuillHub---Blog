import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: "",
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },
    loading: (state) => {
      state.loading = true;
    },
    loaded: (state) => {
      state.loading = false;
    }
  },
});

export const { setUser, loaded, loading } = userSlice.actions;

export default userSlice.reducer;