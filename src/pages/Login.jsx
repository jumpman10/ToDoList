// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './styles/login.css';
import useLocalStorage from 'use-local-storage';
import {useLoginMutation} from '../slices/loginApi';
const Login = () => {
  const [login, {isLoading}] = useLoginMutation();
  const [isDark] = useLocalStorage('isDark', false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      await login(formData).unwrap();
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(formData)
  return (
    <form
      data-theme={isDark ? 'dark' : 'light'}
      onSubmit={handleSubmit}
      className="login-container">
      <div className="login">
        <h3>Email</h3>
        <input
          name='username'
          value={formData.username}
          onChange={handleChange}
          type="text"
        />
        <h3>Contraseña</h3>
        <input
          name='password'
          value={formData.password}
          onChange={handleChange}
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
