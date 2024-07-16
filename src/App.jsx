import {useEffect, useState} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import {Home, Login, Users} from './pages';
import './App.css';
import useLocalStorage from 'use-local-storage';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from './slices/loginSlice';
import {Header} from './components/items/Header';

const App = () => {
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector(state => state.login.user);
  const token = useSelector(state => state.login.token);

  useEffect(() => {
    if (!user && !token) {
      setIsLoading(true);
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      if (storedUser && storedToken) {
        dispatch(setUser({user: JSON.parse(storedUser), token: storedToken}));
      }
    } else {
      setIsLoading(false);
    }
  }, [dispatch, user, token]);
  return (
    <BrowserRouter>
      {token && (
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          user={user}
          token={token}
          isLoading={isLoading}
        />
      )}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                <Home
                  user={user}
                  token={token}
                  isLoading={isLoading}
                  isDark={isDark}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/users"
            element={
              token ? (
                <Users user={user} token={token} isDark={isDark} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
};

export default App;
