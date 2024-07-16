import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {setUser} from '../../slices/loginSlice';
import {Toggle} from '../buttons/Toggle';
import PropTypes from 'prop-types';
import './header.css';

export const Header = ({isDark, setIsDark, user, token, isLoading}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('type');
    setIsAuthenticated(false);
    dispatch(setUser({user: null, token: null}));
    navigate('/login');
  };
  return (
    <header data-theme={isDark ? 'dark' : 'light'}>
      <div className="logo-img">
        <img
          src="todoLogorb.png"
          alt="logo-todo"
          style={{width: 50, height: 50, marginLeft: '60%'}}></img>
      </div>
      <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      {!isLoading && (
        <>
          {isAuthenticated && user.type === 'admin' && (
            <div className="auth">
              <h1>Hola {user.name}!</h1>
              {location.pathname === '/' && (
                <button onClick={() => navigate('/users')}>Usuarios</button>
              )}
              {location.pathname === '/users' && (
                <button onClick={() => navigate('/')}>Tareas</button>
              )}
              <button onClick={handleLogout}>Salir</button>
            </div>
          )}
          {isAuthenticated && user.type === 'regular' && (
            <div className="auth">
              <h1>Hola {user.name}!</h1>
              <button onClick={handleLogout}>Salir</button>
            </div>
          )}
        </>
      )}
    </header>
  );
};
Header.propTypes = {
  user: PropTypes.shape({
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  token: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  isDark: PropTypes.bool.isRequired,
  setIsDark: PropTypes.func.isRequired,
};
