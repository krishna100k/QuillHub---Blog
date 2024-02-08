import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => {
        state.loading = true;
    },
    setUser: (state, action) => {
        state.user = action.payload;
        state.loading = false;
    },
  },
});

export const { setLoading, setUser } = userSlice.actions;

export default userSlice.reducer;