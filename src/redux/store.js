import {configureStore} from '@reduxjs/toolkit';
import {loginApi} from '../slices/loginApi';
import {todoApi} from '../slices/todoApi';
import loginReducer from '../slices/loginSlice';
import todoReducer from '../slices/todoSlice';

const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    login: loginReducer,
    todo: todoReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(loginApi.middleware, todoApi.middleware),
});

export default store;
