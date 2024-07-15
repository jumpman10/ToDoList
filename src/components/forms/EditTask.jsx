import {useState} from 'react';
import {useEditTaskMutation} from '../../slices/todoApi';
import PropTypes from 'prop-types';

export const EditTask = ({taskbyId, setEditTaskActive, setEditId, idTask}) => {
  const [editTask, {error}] = useEditTaskMutation();
  const [formData, setFormData] = useState({
    title: taskbyId.title,
    createdAt: taskbyId.createdAt,
    status: taskbyId.status,
    description: taskbyId.description,
    expiration_date: taskbyId.expiration_date,
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
      !formData.title ||
      !formData.createdAt ||
      !formData.description ||
      !formData.status
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    try {
      editTask({obj: formData, id: idTask});
      setEditTaskActive(false);
      setEditId('');
    } catch (error) {
      console.error('Error:', error);
    }
  };
  console.log(error);
  const close = () => {
    setEditTaskActive(false);
    setEditId('');
  };
  return (
    <form onSubmit={handleSubmit} className="create-container">
      <div
        className="task"
        style={{
          backgroundColor:
            formData.status === 'pending'
              ? 'var(--inprocess-color)'
              : 'var(--complete-color)',
          margin: '15px auto',
        }}>
        <div className="task-create-title">
          <input
            className="title"
            value={formData.title}
            name="title"
            type="text"
            onChange={handleChange}
          />
        </div>
        <div className="task-create-description">
          <div className="description-create">
            <textarea
              value={formData.description}
              name="description"
              onChange={handleChange}
            />
          </div>
          <input
            className="date-create"
            value={formData.createdAt.slice(0, 10)}
            name="createdAt"
            type="date"
            onChange={handleChange}
          />
        </div>
        <div className="checks">
          <div>
            <h3>Pendiente</h3>
            <input
              type="radio"
              name="status"
              value="pending"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <h3>Completada</h3>
            <input
              type="radio"
              name="status"
              value="completed"
              required
              onChange={handleChange}
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

EditTask.propTypes = {
  taskbyId: PropTypes.shape({
    id: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    expiration_date: PropTypes.string.isRequired,
  }),
  setEditTaskActive: PropTypes.func.isRequired,
  setEditId: PropTypes.func.isRequired,
  idTask: PropTypes.number.isRequired,
};
