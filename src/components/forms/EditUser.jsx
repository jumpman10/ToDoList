import {useState} from 'react';
import PropTypes from 'prop-types';
import {useEditUserMutation} from '../../slices/usersApi';
import './editUser.css';
export const EditUser = ({userbyId, setEditUserActive, setEditId, idUser}) => {
  const [editUser, {isLoading}] = useEditUserMutation();
  const [formData, setFormData] = useState({
    name: userbyId.name,
    email: userbyId.email,
    type: userbyId.type,
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
    if (!formData.name || !formData.email || !formData.type) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      editUser({obj: formData, id: idUser});
      if (!isLoading) {
        alert('Editaste el usuario con éxito!');
        setEditUserActive(false);
        setEditId('');
      }
    } catch (error) {
      alert('Algo falló intentalo nuevamente', error);
    }
  };
  const close = () => {
    setEditUserActive(false);
    setEditId('');
  };
  return (
    <form onSubmit={handleSubmit} className="create-container">
      <div
        className="user"
        style={{
          margin: '15px auto',
        }}>
        {isLoading && <div className="loading">Loading...</div>}
        <div className="user-edit-title">
          <input
            className="title"
            type="text"
            name="name"
            value={formData.name}
            required
            onChange={handleChange}
          />
        </div>
        <div className="user-edit-description">
          <input
            className="title"
            type="text"
            name="email"
            style={{backgroundColor: 'transparent'}}
            value={formData.email}
            required
            onChange={handleChange}
          />
        </div>
        <div className="checks">
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
        <div className="create-buttons-container">
          <button className="create-button" type="submit">
            Editar
          </button>
          <button className="exit-create-button" onClick={() => close()}>
            Salir
          </button>
        </div>
      </div>
    </form>
  );
};

EditUser.propTypes = {
  userbyId: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  setEditUserActive: PropTypes.func.isRequired,
  setEditId: PropTypes.func.isRequired,
  idUser: PropTypes.number.isRequired,
};
