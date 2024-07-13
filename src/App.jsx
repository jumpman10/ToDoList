import React, {useContext} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Home} from './pages';
import './App.css';
import {AppContext} from './context/AppProvider';
import {Toggle} from './components/buttons/Toggle';
import useLocalStorage from 'use-local-storage';
const App = () => {
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  return (
    <BrowserRouter>
      <header data-theme={isDark ? 'dark' : 'light'}>
        <div className="logo-img"></div>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
        <div className="auth">
          <div className="user">
            <h2>En Línea</h2>
            <div className="activeUser" />
          </div>
          <button>Salir</button>
        </div>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
};

export default App;
