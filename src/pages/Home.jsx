import React, {useState} from 'react';
import useLocalStorage from 'use-local-storage';
import './styles/home.css';
import {TasksOptions} from '../components/items/TasksOptions';
import {CreatTask} from '../components/forms/CreatTask';
const Home = () => {
  const [isDark] = useLocalStorage('isDark', false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newTaskActive, setNewTaskActive] = useState(false);
  const [editTaskActive, setEditTaskActive] = useState(false);
  const [editId, setEditId] = useState('');
  const [data, setData] = useState([
    {
      title: 'Tarea numero 1',
      date: '2024-04-20',
      taskState: 'pendiente',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
    },
    {
      title: 'Examinar casa',
      date: '2023-03-26',
      taskState: 'completada',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
    },
    {
      title: 'Quitar margenes del card',
      date: '2022-03-15',
      taskState: 'pendiente',
      description:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries',
    },
  ]);
  const [filterState, setFilterState] = useState('');
  const handleSearch = event => {
    setSearchTerm(event.target.value);
  };
  const sortAlphabetically = () => {
    const sortedData = [...data].sort((a, b) => a.title.localeCompare(b.title));
    setData(sortedData);
  };
  const sortByDate = () => {
    const sortedData = [...data].sort(
      (a, b) => new Date(b.date) - new Date(a.date),
    );
    setData(sortedData);
  };
  const filterByTaskState = state => {
    setFilterState(state);
  };
  const filteredData = data.filter(item => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesSearchTerm =
      item.title.toLowerCase().startsWith(lowerCaseSearchTerm) ||
      item.date.includes(searchTerm);
    const matchesTaskState = filterState
      ? item.taskState === filterState
      : true;
    return matchesSearchTerm && matchesTaskState;
  });
  const createTask = formData => {
    setNewTaskActive(false);
    data.unshift(formData);
    console.log('hola');
  };
  const edit = e => {
    setEditId(e);
    setEditTaskActive(true);
  };
  return (
    <div className="container" data-theme={isDark ? 'dark' : 'light'}>
      <TasksOptions
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        sortAlphabetically={sortAlphabetically}
        sortByDate={sortByDate}
        filterByTaskState={filterByTaskState}
        setNewTaskActive={setNewTaskActive}
      />
      <div className="tasks-container">
        <div className="tasks">
          {newTaskActive && (
            <CreatTask
              createTask={createTask}
              setNewTaskActive={setNewTaskActive}
            />
          )}
          {filteredData.map((e, i) => (
            <div
              key={i}
              className={
                editTaskActive && editId === e.title
                  ? 'create-container'
                  : 'edit-task'
              }>
              <div
                className="task"
                style={{
                  backgroundColor:
                    e.taskState === 'pendiente'
                      ? 'var(--inprocess-color)'
                      : 'var(--complete-color)',
                  margin: '15px auto',
                }}>
                <div className="task-title">
                  {!editTaskActive && !newTaskActive && (
                    <button onClick={() => edit(e.title)}>&#9998;</button>
                  )}
                  <input
                    className="title"
                    value={e.title}
                    type="text"
                    disabled={
                      editTaskActive && editId === e.title ? false : true
                    }
                  />
                  <input
                    className="date"
                    value={e.date}
                    name="trip-start"
                    type="date"
                    disabled={
                      editTaskActive && editId === e.title ? false : true
                    }
                  />
                </div>
                <div className="task-description">
                  <div className="description">
                    <textarea
                      value={e.description}
                      disabled={
                        editTaskActive && editId === e.title ? false : true
                      }
                    />
                  </div>
                  {editTaskActive && editId === e.title ? (
                    <div className="checks">
                      <div>
                        <h3>Pendiente</h3>
                        <input
                          type="radio"
                          name="taskState"
                          value="pendiente"
                          required
                        />
                      </div>
                      <div>
                        <h3>Completada</h3>
                        <input
                          type="radio"
                          name="taskState"
                          value="completada"
                          required
                        />
                      </div>
                    </div>
                  ) : (
                    <h1 className="taskState">{e.taskState}</h1>
                  )}
                </div>
                {editTaskActive && editId === e.title && (
                  <div className="create-buttons-container">
                    <button className="create-button" type="submit">
                      Crear
                    </button>
                    <button
                      className="exit-create-button"
                      onClick={() => setEditTaskActive(false)}>
                      Salir
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
