import {createSlice} from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todo',
  initialState: {
    tasks: [],
    loading: false,
    error: null,
  },
  reducers: {
    setTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks.push(action.payload);
    },
    updateTask(state, action) {
      const index = state.tasks.findIndex(
        task => task.id === action.payload.id,
      );
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const {setTasks, addTask, updateTask, setLoading, setError} =
  todoSlice.actions;
export default todoSlice.reducer;
