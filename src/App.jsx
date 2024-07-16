import {useEffect, useState} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
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
      <Header
        isDark={isDark}
        setIsDark={setIsDark}
        user={user}
        token={token}
        isLoading={isLoading}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                user={user}
                token={token}
                isLoading={isLoading}
                isDark={isDark}
              />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/users"
            element={<Users user={user} token={token} isDark={isDark} />}
          />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
};

export default App;
