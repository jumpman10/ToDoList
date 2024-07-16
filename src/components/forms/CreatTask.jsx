// eslint-disable-next-line no-unused-vars
import React, {useState} from 'react';
import './createTask.css';
import PropTypes from 'prop-types';
import {useCreateTaskMutation} from '../../slices/todoApi';
export const CreatTask = ({createTask, setNewTaskActive}) => {
  const [createNewTask, {isLoading, isError}] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    title: '',
    expiration_date: '',
    status: 'pending',
    description: '',
  });
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handlestatusChange = e => {
    setFormData({
      ...formData,
      status: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.expiration_date ||
      !formData.description ||
      !formData.status
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    createTask();
    createNewTask(formData);
    if (!isLoading) {
      alert('Creaste una nueva tarea!');
      setNewTaskActive(false);
    } else if (isError) {
      alert('Algo falló intentalo nuevamente');
    }
  };
  return (
    <div className="create-container">
      <form
        onSubmit={handleSubmit}
        className="task"
        style={{
          backgroundColor:
            formData.status === 'pending'
              ? 'var(--inprocess-color)'
              : 'var(--complete-color)',
          margin: '15px auto',
        }}>
        {isLoading && <div className="loading">Loading...</div>}
        <div className="task-create-title">
          <input
            className="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa el título"
            required
          />
        </div>
        <div className="task-create-description">
          <div className="description-create">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Ingresa una descripción"
              maxLength={80}
            />
          </div>
          <input
            className="date-create"
            type="date"
            name="expiration_date"
            value={formData.expiration_date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="checks">
          <div>
            <h3>Pendiente</h3>
            <input
              type="radio"
              name="status"
              value="pending"
              checked={formData.status === 'pending'}
              onChange={handlestatusChange}
              required
            />
          </div>
          <div>
            <h3>Completada</h3>
            <input
              type="radio"
              name="status"
              value="completed"
              checked={formData.status === 'completed'}
              onChange={handlestatusChange}
              required
            />
          </div>
        </div>
        <div className="create-buttons-container">
          <button className="create-button" type="submit">
            Crear
          </button>
          <button
            className="exit-create-button"
            onClick={() => setNewTaskActive(false)}>
            Salir
          </button>
        </div>
      </form>
    </div>
  );
};

CreatTask.propTypes = {
  createTask: PropTypes.func.isRequired,
  setNewTaskActive: PropTypes.func.isRequired,
};
