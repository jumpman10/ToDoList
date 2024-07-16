import './taskOptions.css';
import PropTypes from 'prop-types';

export const TasksOptions = ({
  searchTerm,
  handleSearch,
  filterByTaskState,
  setNewTaskActive,
  type,
}) => {
  return (
    <div className="tasks-header">
      <div className="create-button-container">
        <button onClick={() => setNewTaskActive(true)}>Crear</button>
      </div>
      <div className="order-container">
        <h3>Orden por :</h3>
        {type === 'users' ? (
          <button onClick={() => filterByTaskState('admin')}>
            Administradores
          </button>
        ) : (
          <button onClick={() => filterByTaskState('completed')}>
            Completadas
          </button>
        )}
        {type === 'users' ? (
          <button onClick={() => filterByTaskState('regular')}>
            Regulares
          </button>
        ) : (
          <button onClick={() => filterByTaskState('pending')}>
            Pendientes
          </button>
        )}
        <button onClick={() => filterByTaskState('')}>Todas</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Busca por título o fecha..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  );
};

TasksOptions.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  filterByTaskState: PropTypes.func.isRequired,
  setNewTaskActive: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
