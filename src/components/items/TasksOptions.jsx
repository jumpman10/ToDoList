// eslint-disable-next-line no-unused-vars
import React from 'react';
import './taskOptions.css';
import PropTypes from 'prop-types';

export const TasksOptions = ({
  sortByDate,
  sortAlphabetically,
  searchTerm,
  handleSearch,
  filterByTaskState,
  setNewTaskActive,
}) => {
  return (
    <div className="tasks-header">
      <div className="create-button-container">
        <button onClick={() => setNewTaskActive(true)}>Crear</button>
      </div>
      <div className="order-container">
        <h3>Orden por :</h3>
        <button onClick={() => sortAlphabetically()}>A-Z</button>
        <button onClick={() => sortByDate()}>Fecha</button>
        <button onClick={() => filterByTaskState('completed')}>
          Completadas
        </button>
        <button onClick={() => filterByTaskState('pending')}>Pendientes</button>
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
  sortByDate: PropTypes.func.isRequired,
  sortAlphabetically: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  filterByTaskState: PropTypes.func.isRequired,
  setNewTaskActive: PropTypes.func.isRequired,
};
