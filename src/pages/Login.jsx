// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './styles/login.css';
import useLocalStorage from 'use-local-storage';
import {useLoginMutation} from '../slices/loginApi';
const Login = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [isDark] = useLocalStorage('isDark', false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const handletaskStateChange = e => {
    setFormData({
      ...formData,
      taskState: e.target.value,
    });
  };
  const handleSubmit = async e => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    await login(formData);
  };
  return (
    <form
      data-theme={isDark ? 'dark' : 'light'}
      onSubmit={handleSubmit}
      className="login-container">
      <div className="login">
        <h3>Email</h3>
        <input
          value={formData.email}
          onChange={handletaskStateChange}
          type="text"
        />
        <h3>Contraseña</h3>
        <input
          value={formData.password}
          onChange={handletaskStateChange}
          type="password"
        />
        <button type="submit" disabled={isLoading}>
          Ingresar
        </button>
      </div>
    </form>
  );
};

export default Login;
