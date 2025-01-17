import {useState} from 'react';
import PropTypes from 'prop-types';
import './createUser.css';
import {useCreateUserMutation} from '../../slices/usersApi';

export const CreateUser = ({setNewUserActive}) => {
  const [createUser, {isLoading}] = useCreateUserMutation();
  const [isErrorCreate, setIsErrorCreate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    password: '',
    confirmPassword: '',
  });
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.type ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    if (formData.password === formData.confirmPassword) {
      try {
        createUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          type: formData.type,
        });
        if (!isLoading) {
          alert('Creaste un nuevo usuario!');
          setNewUserActive(false);
        }
      } catch (error) {
        alert('Algo falló intentalo nuevamente', error);
      }
    } else {
      setIsErrorCreate(true);
    }
  };
  const close = () => {
    setNewUserActive(false);
  };
  return (
    <form onSubmit={handleSubmit} className="user-create-container">
      <div
        className="user-create-modal"
        style={{
          margin: '15px auto',
        }}>
        {isLoading && <div className="loading">Loading...</div>}
        <div className="create-input">
          <h3>Nombre</h3>
          <input
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
            placeholder="Nombre"
          />
        </div>
        <div className="create-input">
          <h3>Email</h3>
          <input
            type="text"
            placeholder="Email"
            name="email"
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="create-input">
          <h3>Contraseña</h3>
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            required
            onChange={handleChange}
          />
        </div>
        <div className="create-input">
          <h3> Confirmar Contraseña</h3>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirma contraseña"
            required
            onChange={handleChange}
          />
        </div>
        {isErrorCreate && (
          <span
            style={{
              color: 'red',
              width: '90%',
              fontSize: '0.8em',
              textAlign: 'center',
              paddingBlock: 13,
            }}>
            Las contraseñas no coinciden
          </span>
        )}
        <div className="create-type">
          <h3>Tipo de cuenta</h3>
          <div className="types">
            <div>
              <h3>Administrador</h3>
              <input
                type="radio"
                name="type"
                value="admin"
                required
                onChange={handleChange}
                checked={formData.type === 'admin'}
              />
            </div>
            <div>
              <h3>Regular</h3>
              <input
                type="radio"
                name="type"
                value="regular"
                required
                onChange={handleChange}
                checked={formData.type === 'regular'}
              />
            </div>
          </div>
        </div>
        <div className="modal-buttons">
          <button name="confirm" type="submit">
            Aceptar
          </button>
          <button name="cancel" onClick={() => close()}>
            Cerrar
          </button>
        </div>
      </div>
    </form>
  );
};

CreateUser.propTypes = {
  setNewUserActive: PropTypes.func.isRequired,
};
