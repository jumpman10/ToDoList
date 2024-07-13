import React, {useState} from 'react';
import './createTask.css';
export const CreatTask = ({createTask, setNewTaskActive}) => {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    taskState: 'pendiente',
    description: '',
  });
  const handleChange = e => {
    const {name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handletaskStateChange = e => {
    setFormData({
      ...formData,
      taskState: e.target.value,
    });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.date ||
      !formData.description ||
      !formData.taskState
    ) {
      alert('Todos los campos son obligatorios');
      return;
    }
    createTask(formData);
    setNewTaskActive(false);
  };
  return (
    <div className="create-container">
      <form
        onSubmit={handleSubmit}
        className="task"
        style={{
          backgroundColor:
            formData.taskState === 'pendiente'
              ? 'var(--inprocess-color)'
              : 'var(--complete-color)',
          margin: '15px auto',
        }}>
        <div className="task-title">
          <input
            className="title"
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa el título"
            required
          />
          <input
            className="date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="task-description">
          <div className="description">
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              placeholder="Ingresa una descripción"
            />
          </div>
          <div className="checks">
            <div>
              <h3>Pendiente</h3>
              <input
                type="radio"
                name="taskState"
                value="pendiente"
                checked={formData.taskState === 'pendiente'}
                onChange={handletaskStateChange}
                required
              />
            </div>
            <div>
              <h3>Completada</h3>
              <input
                type="radio"
                name="taskState"
                value="completada"
                checked={formData.taskState === 'completada'}
                onChange={handletaskStateChange}
                required
              />
            </div>
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
