import {createSlice} from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'login',
  initialState: {
    users: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload.user;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {setUsers, setLoading, setError} = usersSlice.actions;
export default usersSlice.reducer;
