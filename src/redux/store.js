import {configureStore} from '@reduxjs/toolkit';
import {loginApi} from '../slices/loginApi';
import {todoApi} from '../slices/todoApi';
import loginReducer from '../slices/loginSlice';
import todoReducer from '../slices/todoSlice';
import usersReducer from '../slices/usersSlice';
import {usersApi} from '../slices/usersApi';

const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    login: loginReducer,
    todo: todoReducer,
    users: usersReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      loginApi.middleware,
      todoApi.middleware,
      usersApi.middleware,
    ),
});

export default store;
