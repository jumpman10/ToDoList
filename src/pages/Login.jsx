import {useEffect, useState} from 'react';
import './styles/login.css';
import useLocalStorage from 'use-local-storage';
import {useLoginMutation} from '../slices/loginApi';
import {useNavigate} from 'react-router-dom';
import {Toggle} from '../components/buttons/Toggle';
const Login = () => {
  const navigate = useNavigate();
  const [login, {isLoading, isSuccess}] = useLoginMutation();
  const [isDark, setIsDark] = useLocalStorage('isDark', false);
  const [loginError, setLoginError] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = e => {
    setLoginError(false);
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      await login(formData).unwrap();
    } catch (error) {
      setLoginError(true);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);
  return (
    <>
      <header data-theme={isDark ? 'dark' : 'light'}>
        <div className="logo-img"></div>
        <Toggle isChecked={isDark} handleChange={() => setIsDark(!isDark)} />
      </header>
      <form
        data-theme={isDark ? 'dark' : 'light'}
        onSubmit={handleSubmit}
        className="login-container">
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          <div className="login">
            <img
              src="todoLogorb.png"
              alt="logo-todo"
              style={{width: 90, height: 90}}></img>
            <h3>Email</h3>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
            />
            <h3>Contraseña</h3>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type="password"
            />
            {loginError && (
              <span
                style={{
                  color: 'red',
                  width: '90%',
                  fontSize: '0.8em',
                  textAlign: 'center',
                  paddingBlock: 13,
                }}>
                La constraseña o el email son incorrectos*
              </span>
            )}
            <button type="submit" disabled={isLoading}>
              Ingresar
            </button>
          </div>
        )}
      </form>
    </>
  );
};

export default Login;
